import EpiContext from "./Context";
import Website from "./Models/Website";
import WebsiteList from "./Models/WebsiteList";

class WebsiteService {
    websiteService : string = "/api/episerver/v2.0/site";

    getSiteServiceURL() : string
    {
        return EpiContext.config.epiBaseUrl + this.websiteService;
    }

    async getWebsites() : Promise<WebsiteList> {
        const r = await fetch(this.getSiteServiceURL(), {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Accept-Language': EpiContext.config.defaultLanguage //@ToDo: Convert to context call, with default
            }
        });
        return r.json();
    }

    async getWebsite() : Promise<Website> {
        const list = await this.getWebsites();
        return list[0];
    }
}

let website : WebsiteService = new WebsiteService();
export default website;