/**
 * This file is embedded into the javascript engine after the context has been
 * applied and will build the execution context.
 */

//Make the location object available on the window
var window = window || {};
window.location = __INITIAL__DATA__.Location;

//Prepare a global preload variable
var PreLoad = PreLoad || [];

//Prepare the epi global variable
var epi = epi || {};
epi.isServerSideRendering = true;
