/**
 * Some libraries & scripts depend on the window object being available
 * this script adds a basic window object for those libraries and scripts
 * to run properly.
 **/
var window = window || {
    //Empty location object
    location:
    {
        href: "",
        hostname: "",
        pathname: "",
        protocol: ""
    },

    //Empty event subscription
    addEventListener: function (event, callback, addEventOptions)
    {
        //We do not support events
        return;
    },

    //Empty event dispatch
    dispatchEvent: function (event)
    {
        //We do not support events
        return;
    }
};
