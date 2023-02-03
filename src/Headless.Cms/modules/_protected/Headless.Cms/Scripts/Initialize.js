define([
    "dojo/_base/declare",
    "epi/_Module",
], function (
    declare,
    _Module,
) {
        return declare([_Module], {
            initialize: function () {
                this.inherited(arguments);
                this._updateDocumentDomain();
            },

            _updateDocumentDomain: function () {
                /*console.groupCollapsed("Enabling decoupled edit mode")
                try {
                    console.log("Original domain: ", document.domain)
                    var parts = window.location.hostname.split(".");
                    document.domain = parts.length > 1 ? parts.slice(1).join(".") : window.location.hostname
                    console.log("Updated domain: ", document.domain)
                } catch (e) {
                    console.error(e)
                }
                console.groupEnd("Enabling decoupled edit mode")*/
            }
        });
    });