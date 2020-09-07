import PDFPreview from "./pdf-preview";
import NotificationHelper from "./notification-helper";
import Locations from "./selective/locations"
import People from "./selective/people"
import BlockTracking from "./block-tracking"
import Blog from "./blog"
import Dropdown from "./dropdown"
import FoundationCms from "./foundation.cms"
import Header from "./header"
import MobileNavigation from "./mobile-navigation"
import PdfPreview from "./pdf-preview"
import { ProductSearch, NewProductsSearch, SalesSearch } from "./search";
import SearchBox from "./search-box"
import Selection from "./selection"

export class FoundationInit{
    init() {
        // convert json to formdata and append __RequestVerificationToken key for CORS
        window.convertFormData = function (data, containerToken) {
            var formData = new FormData();
            var isAddedToken = false;
            for (var key in data) {
                if (key == "__RequestVerificationToken") {
                    isAddedToken = true;
                }
                formData.append(key, data[key]);
            }
    
            if (!isAddedToken) {
                if (containerToken) {
                    formData.append("__RequestVerificationToken", $(containerToken + ' input[name=__RequestVerificationToken]').val());
                } else {
                    formData.append("__RequestVerificationToken", $('input[name=__RequestVerificationToken]').val());
                }
            }
    
            return formData;
        };
    
        window.serializeObject = function (form) {
            var datas = form.serializeArray();
            var jsonData = {};
            for (var d in datas) {
                jsonData[datas[d].name] = datas[d].value;
            }
    
            return jsonData;
        };

        window.notification = new NotificationHelper();

        PDFPreview();

        let header = new Header();
        header.init();

        let params = {
            searchBoxId: "#mobile-searchbox",
            openSearchBoxId: "#open-searh-box",
            closeSearchBoxId: "#close-search-box",
            sideBarId: "#offside-menu-mobile",
            openSideBarId: "#open-offside-menu"
        }

        var mobileNavigation = new MobileNavigation(params);
        mobileNavigation.init();

        var blockTracking = new BlockTracking();
        blockTracking.init();

        var selection = new Selection();
        selection.init();

        var dropdown = new Dropdown();
        dropdown.init();

        var searchBox = new SearchBox();
        searchBox.init();

        var blog = new Blog();
        blog.init();
        
        var productSearch = new ProductSearch();
        productSearch.init();

        var locations = new Locations();
        locations.init();

        var people = new People();
        people.init();
    
        var cms = new FoundationCms();
        cms.init();
    }       
}