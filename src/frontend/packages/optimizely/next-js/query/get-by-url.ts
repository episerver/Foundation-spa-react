export const GetByUrl = /* GraphQL */`query GetByUrl ($url: String = "#") {
    content: Content (
      where: { Url: { eq: $url } }
    ) {
      name: Name
      slug: RouteSegment
      url:  Url
      reference: ContentLink {
        guid: GuidValue
      },
      contentType: ContentType
    }
  }`
export default GetByUrl