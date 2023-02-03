$stopwatch = [system.diagnostics.stopwatch]::StartNew()

# Set environment to ensure proper builds
$env:OPTI_BUILD_ENV = "production"

# Advanced configuration
$pubDir = "pub"             # Relative to main directory
$srcDir = "src"             # Relative to main directoty
$frontendDir = "frontend"   # Within the srcDir

# Context
Write-Progress -Activity "Preparing" -Status "Building Context"
$cwd         = Get-Location
$toolsPath   = Split-Path -Parent -Path $Script:MyInvocation.MyCommand.Path 
$basePath    = Join-Path -Path $toolsPath -ChildPath ".." -Resolve
$pubPath     = Join-Path -Path $basePath -ChildPath $pubDir -Resolve
$srcPath     = Join-Path -Path $basePath -ChildPath $srcDir -Resolve
$projectName = Split-Path -Leaf -Path $basePath

Write-Output "Publishing $projectName frontend"
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
$frontendCodePath = Join-Path -Path $srcPath -ChildPath $frontendDir -Resolve
$frontendPubPath = Join-Path -Path $pubPath -ChildPath "$frontendDir"
Write-Output ""
Write-Output "Application folders"
Write-Output " - Frontend Code path:    $frontendCodePath" 
Write-Output " - Frontend Publish path: $frontendPubPath"
if ($frontendCodePath.Length -eq 0) {
    throw "Frontend Code directory not found, check script configuration"
}

Set-Location $frontendCodePath
Write-Progress -Activity "Publishing" -Status "Building Frontend"
Write-Output ""
Write-Output "Installing Next.JS Frontend"
yarn install --immutable
Write-Output "Building Next.JS Frontend"
yarn prebuild
yarn build
Write-Progress -Activity "Publishing" -Status "Copying Frontend - Preparing"
If(Test-Path $frontendPubPath) {
    Remove-Item -Path "$frontendPubPath" -Recurse -Force
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

Write-Progress -Activity "Cleaning" -Status "Reverting development environment"
$env:OPTI_BUILD_ENV = "development"
Set-Location $frontendCodePath
yarn prebuild

$stopwatch.Stop()
$duration = $stopwatch.Elapsed.TotalMinutes
Write-Output ""
Write-Output "Publising took $duration minutes to complete"