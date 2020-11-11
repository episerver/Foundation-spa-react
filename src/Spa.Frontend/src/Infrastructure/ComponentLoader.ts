import { Loaders, Taxonomy, ComponentTypes } from '@episerver/spa-core';

export class MoseyComponenentLoader implements Loaders.IComponentLoader
{
    private debug : boolean = false;

    private get PREFIX() : string {
        return "app/Components/";
    }

    public get order() : number 
    {
        return 10;
    }

    public canLoad(componentName: string) : boolean  {
        return componentName.startsWith(this.PREFIX);
    }

    public async load<T extends unknown = ComponentTypes.AbstractComponentProps<Taxonomy.IContent>>(componentName: string) : Promise<Loaders.TComponentType<T>>
    {
        if (this.debug) console.debug(`MoseyComponenentLoader: Loading component: ${ componentName }`);
        const me = this;
        const component = componentName.substr(this.PREFIX.length);
        return import(
            /* webpackInclude: /\.tsx$/ */
            /* webpackExclude: /\.noimport\.tsx$/ */
            /* webpackChunkName: "components" */
            /* webpackMode: "lazy" */
            `../Components/${ component }`) // Can't use the constant here, as it will Prevent Webpack from properly loading the component
            .then(exports => {
                if (!(exports && exports.default)) throw new Error(`MoseyComponenentLoader: The component ${ componentName } does not have a default export`);
                const c = exports.default;
                if (me.debug) console.debug(`MoseyComponenentLoader: Finished loading component: ${ componentName }`, c);
                return c;
            });
    }

    public setDebug(debug: boolean)
    {
        return this.debug = debug;
    }
    
}
export default MoseyComponenentLoader;