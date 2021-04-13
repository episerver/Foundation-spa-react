using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.Infrastructure;
using Foundation.SpaViewEngine.SpaContainer;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine
{
    public class SpaViewEngine : IViewEngine
    {
        private SpaView _sharedView;

        private readonly SpaSettings _spaSettings;

        protected SpaView SharedView
        {
            get
            {
                if (_sharedView == null) _sharedView = CreateSpaView();
                return _sharedView;
            }
        }

        public SpaViewEngine(SpaSettings spaSettings)
        {
            _spaSettings = spaSettings;
        }

        public ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache) => CreateSpaView(controllerContext, partialViewName, useCache);

        public ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache) => CreateSpaView(controllerContext, viewName + "." + masterName, useCache);

        private ViewEngineResult CreateSpaView(ControllerContext controllerContext, string viewName, bool useCache)
        {
            if (controllerContext.RequestContext.TryGetRoutedContent(out _))
                return new ViewEngineResult(useCache ? SharedView : CreateSpaView(), this);
            
            // The SpaViewEngine will only return for iContent (at the moment...)
            return new ViewEngineResult(new string[] {
                $"{ SpaViewBlob.BlobUriScheme }://{ _spaSettings.BrowserContainerName }/{ _spaSettings.HtmlTemplateName }/{ viewName }",
                $"{ SpaViewBlob.BlobUriScheme }://{ _spaSettings.ServerContainerName }/{ _spaSettings.ServerJsName }/{ viewName }"
            });
        }

        protected virtual SpaView CreateSpaView() => ServiceLocator.Current.GetInstance<SpaView>(); // SpaView is a transient service, so we'll get a new one every time we invoke this method

        private bool _hasDeployedSpa = false;
        protected virtual bool HasDeployedSpa
        {
            get {
                if (!_hasDeployedSpa)
                    _hasDeployedSpa = SpaFolderHelper.HasItemInDeployment(_spaSettings.BrowserContainerName, _spaSettings.HtmlTemplateName) &&
                                            SpaFolderHelper.HasItemInDeployment(_spaSettings.ServerContainerName, _spaSettings.HtmlTemplateName);
                return _hasDeployedSpa;
            }
        }

        public void ReleaseView(ControllerContext controllerContext, IView view)
        {
            //Not implemented yet
            //throw new NotImplementedException();
        }
    }
}
