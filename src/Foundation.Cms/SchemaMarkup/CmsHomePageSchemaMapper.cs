using EPiServer.Web;
using Foundation.Cms.Extensions;
using Foundation.Cms.Pages;
using Schema.NET;
using System;
using System.Linq;

namespace Foundation.Cms.SchemaMarkup
{
    /// <summary>
    /// Create Schema website and organization objects from CmsHomePage
    /// </summary>
    public class CmsHomePageSchemaMapper : ISchemaDataMapper<CmsHomePage>
    {
        public Thing Map(CmsHomePage content)
        {
            return new WebSite
            {
                MainEntity = new Organization
                {
                    Name = content.CompanyName ?? content.Name,
                    Url = SiteDefinition.Current?.SiteUrl,
                    ContactPoint = new ContactPoint()
                    {
                        Email = content.CompanyEmail ?? new OneOrMany<string>(),
                        Telephone = content.CompanyPhone ?? new OneOrMany<string>()
                    },
                    SameAs = content.SocialLinks != null ? new OneOrMany<Uri>(content.SocialLinks.Select(x => new Uri(x.Href ?? string.Empty)).ToArray()) : new OneOrMany<Uri>()
                },
                Url = content.GetUri(true)
            };

        }
    }
}
