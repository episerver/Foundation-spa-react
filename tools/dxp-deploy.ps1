# Deploy into DXP
# Utility script to deploy the application into DXP, be sure to copy the provided
# deploy.template.config.xml into deploy.local.config.xml and enter the appropriate
# configuration values.

$stopwatch = [system.diagnostics.stopwatch]::StartNew()

# Advanced configuration
$pubDir = "pub"             # Relative to main directory
$srcDir = "src"             # Relative to main directoty
$cmsDir = "Headless.CMS"    # Within the srcDir
$frontendDir = "frontend"   # Within the srcDir
$dxpDir = "Dxp"

# Script defaults
$csproj = "$cmsDir.csproj"  # Change if you're using a different file name
$version = ""               # Provide a value here, if it's not/incorrect listed in the .csproj file

# Context
Write-Progress -Activity "Preparing" -Status "Building Context"
$cwd         = Get-Location
$toolsPath   = Split-Path -Parent -Path $Script:MyInvocation.MyCommand.Path 
$basePath    = Join-Path -Path $toolsPath -ChildPath ".." -Resolve
$pubPath     = Join-Path -Path $basePath -ChildPath $pubDir -Resolve
$srcPath     = Join-Path -Path $basePath -ChildPath $srcDir -Resolve
$projectName = Split-Path -Leaf -Path $basePath

Write-Output "Deploying $projectName into Optimizely DXP"
Write-Output " - Project path: $basePath"
Write-Output " - Tools path:   $toolsPath"
Write-Output " - Source path:  $srcPath"
Write-Output " - Publish path: $pubPath"
if ($srcPath.Length -eq 0) {
    throw "Source directory not found, check script configuration"
}
if ($pubPath.Length -eq 0) {
    throw "Publish directory not found, check script configuration"
}
$cmsCodePath = Join-Path -Path $srcPath -ChildPath $cmsDir -Resolve
$cmsPubPath = Join-Path -Path $pubPath -ChildPath "$cmsDir.$dxpDir"
$frontendCodePath = Join-Path -Path $srcPath -ChildPath $frontendDir -Resolve
$frontendPubPath = Join-Path -Path $cmsPubPath -ChildPath "$frontendDir"
$artefactsPath = Join-Path -Path $pubPath -ChildPath $dxpDir
$cmsProjectFile = Join-Path -Path $cmsCodePath -ChildPath $csproj
$settingsFile = Join-Path -Path $toolsPath -ChildPath "deploy.local.config.xml"
Write-Output ""
Write-Output "Application folders"
Write-Output " - CMS Code path:         $cmsCodePath"
Write-Output " - CMS Publish path:      $cmsPubPath" 
Write-Output " - CMS Project file:      $cmsProjectFile"
Write-Output " - Frontend Code path:    $frontendCodePath" 
Write-Output " - Frontend Publish path: $frontendPubPath"
Write-Output " - Artefacts path:        $artefactsPath"
if ($cmsCodePath.Length -eq 0) {
    throw "CMS Code directory not found, check script configuration"
}
if ($frontendCodePath.Length -eq 0) {
    throw "Frontend Code directory not found, check script configuration"
}
if ($cmsProjectFile.Length -eq 0) {
    throw "Project file not found, check script configuration"
}

# Read context
$settings = [Xml](Get-Content $settingsFile)
if ($settings.Deployment.EpiCloudApiEndpointUri.Length -gt 0) {
    $global:EpiCloudApiEndpointUri = $settings.Deployment.EpiCloudApiEndpointUri
}
$projectId = $settings.Deployment.ProjectId
$key = $settings.Deployment.Key
$secret = $settings.Deployment.Secret
$environment = $settings.Deployment.Environment

# Determining Version
if ($version.Length -eq 0) {
    $xml = [Xml](Get-Content $cmsProjectFile)
    $version = $xml.Project.PropertyGroup.Version
}
if ($version.Length -eq 0) {
    Write-Output "Defaulting to version 0.0.0.1"
    $version = '0.0.0.1'
}

$nuGetName = "$cmsDir.cms.app.$version.nupkg"
$dxpAsset = "$artefactsPath\$nuGetName"
Write-Output ""
Write-Output "Version to deploy: $version"
Write-Output "Package file name: $nuGetName"
Write-Output "Asset file: $dxpAsset"
Write-Output "DXP Project: $projectId"
Write-Output "DXP Environment: $environment"

$env:OPTI_BUILD_ENV = "production"

If(Test-Path dxpAsset) {
    throw "An asset for version $version has previously been generated, DXP requires unique assets names. Please increment your .Net project version"
}

# Enabling TLS1.2
Write-Progress -Activity "Preparing" -Status "Configuring Network Security"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Installing & enabling modules
if (Get-Module -ListAvailable -Name "PowershellGet")
{
    Write-Progress -Activity "Installing" -Status "Already installed: PowerShell Get"
} else {
    Write-Progress -Activity "Installing" -Status "PowerShell Get"
    Install-Module -Name PowershellGet -Force
}
if (Get-Module -ListAvailable -Name "EpiCloud")
{
    Write-Progress -Activity "Installing" -Status "Already installed: EpiCloud"
} else {
    Write-Progress -Activity "Installing" -Status "EpiCloud"
    Install-Module -Name EpiCloud -Scope CurrentUser -Force
}
if (Get-Module -ListAvailable -Name "Azure.Storage")
{
    Write-Progress -Activity "Installing" -Status "Already installed: Azure.Storage"
} else {
    Write-Progress -Activity "Installing" -Status "Azure.Storage"
    Install-Module -Name Azure.Storage -Scope CurrentUser -Repository PSGallery -Force -AllowClobber
}

# Making modules available within the current shell
Write-Progress -Activity "Importing" -Status "Azure.Storage"
Import-Module Azure.Storage
Write-Progress -Activity "Importing" -Status "EpiCloud"
Import-Module EpiCloud

# Publishing
If(Test-Path $cmsPubPath) {
    Remove-Item -Path "$cmsPubPath" -Recurse -Force
}
Write-Progress -Activity "Publishing" -Status "Publishing Optimizely CMS"
Write-Output ""
Write-Output "Publishing .Net Application"
dotnet publish --nologo --configuration Release --no-self-contained --output $cmsPubPath $cmsProjectFile

Set-Location $frontendCodePath
Write-Progress -Activity "Publishing" -Status "Building Frontend"
Write-Output ""
Write-Output "Installing Next.JS Frontend"
yarn install --immutable
Write-Output "Building Next.JS Frontend"
yarn prebuild
yarn build
yarn postbuild
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Preparing"
If(Test-Path $frontendPubPath) {
    throw "Your .Net build already includes a $frontendDir folder, blocking the publishing process"
}
New-Item -ItemType Directory -Path $frontendPubPath
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Next.JS Build"
Copy-Item -Path "$frontendCodePath\.next" -Destination "$frontendPubPath\.next" -Recurse
If(Test-Path "$frontendPubPath\.next\cache") {
    Write-Progress -Activity "Publishing" -Status "Copying Frontend - Next.JS Build - Stripping cache folder"
    Remove-Item -Path "$frontendPubPath\.next\cache" -Recurse -Force
}
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Bundled packages"
Get-Item -Path "$frontendCodePath\packages\*\*\node_modules" | Remove-Item -Recurse -Force
Copy-Item -Path "$frontendCodePath\packages" -Destination "$frontendPubPath\packages" -Recurse -Exclude "*\node_modules\**\*.*"
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Public assets"
Copy-Item -Path "$frontendCodePath\public" -Destination "$frontendPubPath\public" -Recurse
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Dependencies"
Copy-Item -Path "$frontendCodePath\.yarn" -Destination "$frontendPubPath\.yarn" -Recurse
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Individual files"
Copy-Item -Path "$frontendCodePath\package.json" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\yarn.lock" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\.yarnrc" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\.yarnrc.yml" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\*.cjs" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\*.mjs" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\*.js" -Destination "$frontendPubPath\"
Copy-Item -Path "$frontendCodePath\.env" -Destination "$frontendPubPath\"
if (Test-Path "$frontendCodePath\.env.production") {
    Copy-Item -Path "$frontendCodePath\.env.production" -Destination "$frontendPubPath\"
} else {
    if(Test-Path "$frontendCodePath\.env.production.local") {
        Write-Output "Using local production file to generate production configuration"
        Copy-Item -Path "$frontendCodePath\.env.production.local" -Destination "$frontendPubPath\.env.production"
    }
}

Write-Progress -Activity "Publishing" -Status "Installing Frontend - Packages"
Set-Location $frontendPubPath
yarn install --immutable

$duration = $stopwatch.Elapsed.TotalMinutes
Write-Output ""
Write-Output "Building took $duration minutes to complete"

If(!(Test-Path $artefactsPath)) {
    New-Item -ItemType Directory -Force -Path $artefactsPath
}
Write-Progress -Activity "Packaging" -Status "Creating NuGet file for DXP"
Write-Output "Creating NuGet file for DXP"
Compress-Archive -Path "$cmsPubPath\*" -DestinationPath "$dxpAsset.zip" -Force -CompressionLevel Optimal
Move-Item -Path "$dxpAsset.zip" -Destination $dxpAsset -Force

$duration = $stopwatch.Elapsed.TotalMinutes
Write-Output ""
Write-Output "Building & Packaging took $duration minutes to complete"

# Connect EpiCloud using credentials from portal
Write-Progress -Activity "Deploying" -Status "Connecting to project $projectId"
Connect-EpiCloud -ProjectId $projectId -ClientKey $key -ClientSecret $secret

# Upload .NET Core Alloy to blob storage
Write-Progress -Activity "Deploying" -Status "Uploading NuPkg file $nuGetName"
$sasUrl = Get-EpiDeploymentPackageLocation
Write-Output "Uploading to: $sasUrl"
Add-EpiDeploymentPackage -SasUrl $sasUrl -Path $dxpAsset
 
# Deploy package to environment. This will first build a docker image out of the package and then deploy it to the target environment.
Write-Progress -Activity "Deploying" -Status "Deploying to $environment environment"
Write-Output "Deploying to $environment environment"
Start-EpiDeployment -DeploymentPackage $nuGetName -TargetEnvironment $environment -DirectDeploy -Wait

$duration = $stopwatch.Elapsed.TotalMinutes
Write-Output ""
Write-Output "Building, Packaging & Deploying took $duration minutes to complete"

Set-Location $artefactsPath

Write-Progress -Activity "Cleaning" -Status "Removing frontend build dir"
Write-Output "Removing frontend build dir"
If(Test-Path $frontendPubPath) {
    Remove-Item -Path "$frontendPubPath" -Recurse -Force
}
Write-Progress -Activity "Cleaning" -Status "Removing CMS build dir"
Write-Output "Removing CMS build dir"
If(Test-Path $cmsPubPath) {
    Remove-Item -Path "$cmsPubPath" -Recurse -Force
}

Write-Progress -Activity "Cleaning" -Status "Restoring Current Working Directory"
Write-Output "Restoring Current Working Directory"
Set-Location $cwd

Write-Progress -Activity "Cleaning" -Status "Incrementing CMS Project Version"
Write-Output "Incrementing CMS Project Version"
$v = [version]$version
$nv = [version]::New($v.Major,$v.Minor,$v.Build,$v.Revision+1)
Write-output "- Old Version: $v"
Write-Output "- New Version: $nv"
$xml.Project.PropertyGroup.Version = "$nv"
$xml.Save($cmsProjectFile)

Remove-Item Env:\OPTI_BUILD_ENV

$stopwatch.Stop()
$duration = $stopwatch.Elapsed.TotalMinutes
Write-Output ""
Write-Output "Building, Packaging, Deploying & Cleaning took $duration minutes to complete"