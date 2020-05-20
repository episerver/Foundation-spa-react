//Episerver libraries
import SSRResponse from 'episerver/ServerSideRendering/Response';
import RenderServerSide from 'episerver/InitServer';

//Application layout & config
import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@PreLoad("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
declare var global: any;
global.render = (): SSRResponse => {
    return RenderServerSide(appConfig);
}