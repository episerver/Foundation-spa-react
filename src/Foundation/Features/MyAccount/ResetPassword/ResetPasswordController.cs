using EPiServer;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.Core;
using EPiServer.Framework.Localization;
using EPiServer.Web.Mvc;
using Foundation.Cms.Attributes;
using Foundation.Cms.Extensions;
using Foundation.Cms.Identity;
using Foundation.Features.Home;
using Foundation.Features.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Foundation.Features.MyAccount.ResetPassword
{
    public class ResetPasswordController : PageController<ResetPasswordPage>
    {
        private readonly IContentLoader _contentLoader;
        private readonly IMailService _mailService;
        private readonly LocalizationService _localizationService;
        private readonly ApplicationSignInManager<SiteUser> _signinManager;
        private readonly ApplicationUserManager<SiteUser> _userManager;

        public ResetPasswordController(ApplicationSignInManager<SiteUser> signinManager,
            ApplicationUserManager<SiteUser> userManager,
            IContentLoader contentLoader,
            IMailService mailService,
            LocalizationService localizationService)
        {
            _contentLoader = contentLoader;
            _mailService = mailService;
            _localizationService = localizationService;
            _signinManager = signinManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        public ActionResult Index(ResetPasswordPage currentPage)
        {
            var viewModel = new ForgotPasswordViewModel(currentPage);
            return View("ForgotPassword", viewModel);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model, string language)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist or is not confirmed
                return RedirectToAction("ForgotPasswordConfirmation");
            }

            var startPage = _contentLoader.Get<HomePage>(ContentReference.StartPage);
            //var body = _mailService.GetHtmlBodyForMail(startPage.ResetPasswordMail, new NameValueCollection(), language);
            var mailPage = _contentLoader.Get<MailBasePage>(startPage.ResetPasswordMail);
            var body = mailPage.MainBody.ToHtmlString();
            var code = await _userManager.GeneratePasswordResetTokenAsync(user.Id);
            var url = Url.Action("ResetPassword", "ResetPassword", new { userId = user.Id, code = HttpUtility.UrlEncode(code), language }, Request.Url.Scheme);

            body = body.Replace("[MailUrl]",
                string.Format("{0}<a href=\"{1}\">{2}</a>", _localizationService.GetString("/ResetPassword/Mail/Text"), url, _localizationService.GetString("/ResetPassword/Mail/Link"))
            );

            _mailService.Send(mailPage.Subject, body, user.Email);

            return RedirectToAction("ForgotPasswordConfirmation");
        }

        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            var homePage = _contentLoader.Get<PageData>(ContentReference.StartPage) as HomePage;
            var model = ContentViewModel.Create(homePage);
            return View("ForgotPasswordConfirmation", model);
        }

        [AllowAnonymous]
        public ActionResult ResetPassword(ResetPasswordPage currentPage, string code)
        {
            var viewModel = new ResetPasswordViewModel(currentPage) { Code = code };
            return code == null ? View("Error") : View("ResetPassword", viewModel);
        }

        [HttpPost]
        [AllowDBWrite]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation");
            }

            var result = await _userManager.ResetPasswordAsync(user.Id, HttpUtility.UrlDecode(model.Code), model.Password);

            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation");
            }

            AddErrors(result.Errors);

            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            var homePage = _contentLoader.Get<PageData>(ContentReference.StartPage) as HomePage;
            var model = ContentViewModel.Create(homePage);
            return View("ResetPasswordConfirmation", model);
        }

        [HttpGet]
        public ActionResult SignOut()
        {
            _signinManager.SignOut();
            return RedirectToAction("Index", new { node = ContentReference.StartPage });
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (returnUrl.IsLocalUrl(Request))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", new { node = ContentReference.StartPage });
        }

        private void AddErrors(IEnumerable<string> errors)
        {
            foreach (var error in errors)
            {
                ModelState.AddModelError(string.Empty, error);
            }
        }
    }
}