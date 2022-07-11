using EPiServer.Shell.Security;
using Microsoft.AspNetCore.Mvc;
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

        public InitializeInstanceController(UIUserProvider uIUserProvider, UIRoleProvider uIRoleProvider)
        {
            _uIUserProvider = uIUserProvider;
            _uIRoleProvider = uIRoleProvider;
        }

        /// <summary>
        /// Perform the needed initialization steps for a freshly provisioned instance of the Headless Foundation 
        /// CMS. This method will execute once to completion and return an unauthorized error on any invokation
        /// thereafter.
        /// </summary>
        /// <returns>Result</returns>
        [HttpPost]
        [Route("")]
        [ProducesResponseType(200, Type = typeof(object))]
        [ProducesResponseType(401)]
        public async Task<ActionResult<object>> Index()
        {
            var hasUsers = await _uIUserProvider.GetAllUsersAsync(0, 1).AnyAsync();
            if (!hasUsers)
            {
                var username = "admin";
                var email = "admin@example.com";
                var pass = "Episerver123!";
                var roles = new string[] { "Administrators", "WebAdmins", "WebEditors" };

                var result = await _uIUserProvider.CreateUserAsync(username, pass, email, null, null, true);
                if (result.Status == UIUserCreateStatus.Success)
                {
                    foreach (var role in roles)
                    {
                        var exists = await _uIRoleProvider.RoleExistsAsync(role);
                        if (!exists)
                        {
                            await _uIRoleProvider.CreateRoleAsync(role);
                        }
                    }

                    await _uIRoleProvider.AddUserToRolesAsync(result.User.Username, roles);
                }
                return Ok(new { Success = true });
            } else
            {
                return Unauthorized();
            }
        }
    }
}