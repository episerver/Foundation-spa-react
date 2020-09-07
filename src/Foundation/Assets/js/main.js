import "bootstrap";
import "../scss/main.scss"
import "lazysizes";
import "lazysizes/plugins/bgset/ls.bgset";
import feather from "feather-icons";
import MyProfile from "./features/my-profile"
import FoundationInit from "./features/foundation.init"

feather.replace();

var foudationInit = new FoundationInit();
foudationInit.init();