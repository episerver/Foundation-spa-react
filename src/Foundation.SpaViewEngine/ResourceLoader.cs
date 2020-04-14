using System.Reflection;

namespace Foundation.SpaViewEngine
{
    public class ResourceLoader
    {
        public string ResourcePrefix => GetType().Namespace + ".Resources";

        public Assembly ResourceAssembly => GetType().Assembly;

        public string BuildFullname(string resourceName) => string.Format("{0}.{1}", ResourcePrefix, resourceName);
    }
}
