using EPiServer.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Services
{
    public class ApiPrincipalAccessor : IPrincipalAccessor
    {
        private IPrincipal? _principal;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string? _authSchema = string.Empty;
        private readonly IAuthenticationService _authenticationService;
        private readonly IPrincipalAccessor _principalAccessor;

        public ApiPrincipalAccessor(IHttpContextAccessor httpContextAccessor, IAuthenticationService authenticationService, IPrincipalAccessor baseAccessor, string? authSchema)
        {
            _httpContextAccessor = httpContextAccessor;
            _authenticationService = authenticationService;
            _authSchema = authSchema;
            _principalAccessor = baseAccessor;
        }

        public string? Schema => _authSchema;

        public IPrincipal? Principal { 
            get
            {
                try
                {
                    if (_principalAccessor.Principal.Identity?.IsAuthenticated == true)
                        return _principalAccessor.Principal;

                    if (_authSchema is not null && _httpContextAccessor.HttpContext is not null)
                    {
                        var authTask = _authenticationService.AuthenticateAsync(_httpContextAccessor.HttpContext, _authSchema);
                        authTask.Wait();
                        _principal = authTask.Result.Principal;
                        if (_principal?.Identity?.IsAuthenticated == true)
                            _principalAccessor.Principal = _principal;
                    }
                    return _principalAccessor.Principal;
                } catch
                {
                    return null;
                }
            }
            set {
                _principalAccessor.Principal = value;
            }
        }
    }
}
