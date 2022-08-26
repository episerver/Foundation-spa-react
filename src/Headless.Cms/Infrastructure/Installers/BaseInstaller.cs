using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace HeadlessCms.Infrastructure.Installers
{
    public abstract class BaseInstaller : IInstaller
    {
        private Injected<IWebHostEnvironment> WebHostEnvironment;
        private IList<string> _messages;

        protected readonly string DataPath = "App_Data";

        public virtual string DefaultFileName => "default.txt";
        public virtual IList<string> InstallMessages { 
            get
            {
                if (_messages is null)
                    _messages = new List<string>();
                return _messages;
            }
        }

        public abstract int Order { get; }
        public abstract bool Install(HttpContext context);

        public IFileInfo GetDefaultFile() => TryGetSourceFile(DefaultFileName, out var fileInfo) ? fileInfo : default;
        public string GetDefaultFilePath() => Path.Combine(DataPath, DefaultFileName);

        protected virtual IFileInfo GetSourceFile(string filename)
        {
            var filePath = Path.Combine(DataPath, filename);
            var fileInfo = WebHostEnvironment.Service.ContentRootFileProvider.GetFileInfo(filePath);
                  if (fileInfo is null || !fileInfo.Exists)
                throw new FileNotFoundException($"The file { filePath } is not found within the ContentRootFileProvider.");
            if (fileInfo.IsDirectory)
                throw new FileFormatException($"The path { filePath } was expected to be a file, found a directory.");

            return fileInfo;
        }

        protected virtual bool TryGetSourceFile(string filename, out IFileInfo fileInfo)
        {
            fileInfo = default;
            try
            {
                fileInfo = GetSourceFile(filename);
                return true;
            } catch (Exception)
            {
                return false;
            }
        }
    }
}
