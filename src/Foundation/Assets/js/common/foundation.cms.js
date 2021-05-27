import PDFPreview from "./pdf-preview";
import NotificationHelper from "./notification-helper";
import Header from "./header";
import MobileNavigation from "./mobile-navigation";
import Selection from "./selection";
import Dropdown from "./dropdown";
import SearchBox from "../../../Features/Search/search-box";
import ContentSearch from "../../../Features/Search/search";
import Blog from "../../../Features/Blog/blog";
import CalendarBlock from "../../../Features/Events/CalendarBlock/calendar-block";
import Locations from "../../../Features/Locations/locations";
import People from "Features/People/people";

export default class FoundationCms {
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
        axios.defaults.headers.common['Accept'] = '*/*';

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

        var selection = new Selection();
        selection.init();

        var dropdown = new Dropdown();
        dropdown.init();

        var searchBox = new SearchBox();
        searchBox.init();

        var contentSearch = new ContentSearch();
        contentSearch.init();

        var blog = new Blog();
        blog.init();

        var locations = new Locations();
        locations.init();

        let people = new People();
        people.init();

        let calendar = new CalendarBlock();
        calendar.init();
    }       
}