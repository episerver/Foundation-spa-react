using EPiServer.ServiceLocation;
using EPiServer.Shell.Security;
using HeadlessCms.Infrastructure.Installers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeadlessCms.Features.InitializeInstance
{
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    [Route("/api/foundation/v1.0/init")]
    public class InitializeInstanceController : Controller
    {
        private readonly UIUserProvider _uIUserProvider;
        private readonly UIRoleProvider _uIRoleProvider;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Injected<SchemaInstaller> _schemaInstaller;
        private readonly Injected<DataInstaller> _dataInstaller;

        public InitializeInstanceController(UIUserProvider uIUserProvider, UIRoleProvider uIRoleProvider, IWebHostEnvironment webHostEnvironment)
        {
            _uIUserProvider = uIUserProvider;
            _uIRoleProvider = uIRoleProvider;
            _webHostEnvironment = webHostEnvironment;
        }

        /// <summary>
        /// Perform the needed initialization steps for a freshly provisioned instance of the Headless Foundation 
        /// CMS. This method will execute once to completion and return an unauthorized error on any invokation
        /// thereafter.
        /// </summary>
        /// <returns>Result</returns>
        [HttpPost]
        [Route("")]
        [ProducesResponseType(200, Type = typeof(InitializeInstanceResponse))]
        [ProducesResponseType(500, Type = typeof(InitializeInstanceResponse))]
        public async Task<ActionResult<InitializeInstanceResponse>> Index([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] InitializeInstanceRequest options)
        {
            if (options is null) options = new();
            InitializeInstanceResponse response = new();

            if (_webHostEnvironment.IsProduction())
            {
                response.Success = false;
                response.Messages.Add("Webservice disabled");
                return StatusCode(500, response);
            }

            response.Success = true;
            if (options.CreateFirstUser)
            {
                response.FirstUserRequested = true;
                try
                {
                    response.FirstUserCreated = await CreateInitialUser(options.FirstUser);
                } catch (Exception ex)
                {
                    response.Success = false;
                    response.Messages.Add(ex.Message);
                }
            }

            if (options.ImportSchema)
            {
                response.SchemaImportRequested = true;
                try
                {
                    response.SchemaImported = _schemaInstaller.Service.Install(HttpContext);
                } catch (Exception ex) {
                    response.Success = false;
                    response.Messages.Add(ex.Message);
                } finally {
                    _schemaInstaller.Service.InstallMessages.ForEach(msg => response.Messages.Add(msg));
                }
            }

            if (options.ImportData)
            {
                response.DataImportRequested = true;
                try
                {
                    response.DataImported = _dataInstaller.Service.Install(HttpContext);
                }
                catch (Exception ex)
                {
                    response.Success = false;
                    response.Messages.Add(ex.Message);
                }
                finally
                {
                    _dataInstaller.Service.InstallMessages.ForEach(msg => response.Messages.Add(msg));
                }
            }

            return response.Success ? 
                Ok(response) : 
                StatusCode(500, response);
        }

        protected async Task<bool> CreateInitialUser(InitializeInstanceRequestUserData data)
        {
            var hasUsers = await _uIUserProvider.GetAllUsersAsync(0, 1).AnyAsync();
            if (!hasUsers)
            {
                var result = await _uIUserProvider.CreateUserAsync(data.Username, data.Password, data.Email, null, null, true);
                if (result.Status == UIUserCreateStatus.Success)
                {
                    foreach (var role in data.Roles)
                    {
                        var exists = await _uIRoleProvider.RoleExistsAsync(role);
                        if (!exists)
                        {
                            await _uIRoleProvider.CreateRoleAsync(role);
                        }
                    }

                    await _uIRoleProvider.AddUserToRolesAsync(result.User.Username, data.Roles);
                    return true;
                }
                throw new Exception("Security incident: Initial user creation failed (" + String.Join("; ", result.Errors) + ")");
            }
            throw new Exception("Security incident: Initial user creation blocked");
        }
    }

    public class InitializeInstanceResponse
    {
        public bool Success { get; set; } = false;
        public bool FirstUserRequested { get; set; } = false;
        public bool FirstUserCreated { get; set; } = false;
        public bool SchemaImportRequested { get; set; } = false;
        public bool SchemaImported { get; set; } = false;
        public bool DataImportRequested { get; set; } = false;
        public bool DataImported { get; set; } = false;
        public IList<string> Messages { get; set; } = new List<string>();
    }

    public class InitializeInstanceRequest
    {
        public bool CreateFirstUser { get; set; } = false;
        public InitializeInstanceRequestUserData FirstUser { get; set; } = new();
        public bool ImportSchema { get; set; } = false;
        public bool ImportData { get; set; } = false;
    }

    public class InitializeInstanceRequestUserData
    {
        public string Username { get; set; } = "admin";
        public string Email { get; set; } = "admin@example.com";
        public string Password  { get; set; } = "Episerver123!";
        public string[] Roles { get; set; } = new string[] { "Administrators", "WebAdmins", "WebEditors" };

    }
}