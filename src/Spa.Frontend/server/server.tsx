//Episerver libraries
import SSRResponse from '@episerver/spa-core/ServerSideRendering/Response';
import RenderServerSide from '@episerver/spa-core/InitServer';

//Application layout & config
import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@PreLoad("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
declare var global: any;
global.render = (): SSRResponse => {
    return RenderServerSide(appConfig);
}