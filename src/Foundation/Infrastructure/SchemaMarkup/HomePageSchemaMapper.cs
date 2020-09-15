using EPiServer.Web;
using Foundation.Cms;
using Foundation.Cms.Extensions;
using Foundation.Features.Home;
using Schema.NET;
using System;
using System.Linq;

namespace Foundation.Infrastructure.SchemaMarkup
{
    /// <summary>
    /// Create Schema website and organization objects from HomePage
    /// </summary>
    public class HomePageSchemaMapper : ISchemaDataMapper<HomePage>
    {
        public Thing Map(HomePage content)
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