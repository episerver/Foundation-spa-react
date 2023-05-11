using EPiServer.Web;

namespace HeadlessCms.Features.Preview
{
    public class IPhone12Resolution : IDisplayResolution
    {
        public string Id
        {
            get { return GetType().FullName; }
        }

        public string Name
        {
            get { return "iPhone 12 (390x844)"; }
        }

        public int Width
        {
            get { return 390; }
        }
        public int Height
        {
            get { return 844; }
        }
    }
}
