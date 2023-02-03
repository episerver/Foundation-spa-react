using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace Foundation.Settings.Models
{
    public class SettingsApiResponse<T> {
        public bool Error { get; set; } = false;

        public T? Data { get; set; } = default(T?);

        public string? Message { get; set; } = default(string?);
    }
}