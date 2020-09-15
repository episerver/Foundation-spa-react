import "bootstrap";
import "../scss/main.scss";
require("easy-autocomplete");
import feather from "feather-icons";
import "lazysizes";
import "lazysizes/plugins/bgset/ls.bgset";
import FoundationCms from "Assets/js/common/foundation.cms";

feather.replace();

var foundationCms = new FoundationCms();
foundationCms.init();