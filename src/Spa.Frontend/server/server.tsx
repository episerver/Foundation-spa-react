//Poly-fill server
import 'core-js';

//Episerver libraries
import SSRResponse from 'Episerver/ServerSideRendering/Response';
import RenderServerSide from 'Episerver/InitServer';

//Application layout & config
import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@PreLoad("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
declare var global: any;
global.render = (): SSRResponse => {
    return RenderServerSide(appConfig);
}