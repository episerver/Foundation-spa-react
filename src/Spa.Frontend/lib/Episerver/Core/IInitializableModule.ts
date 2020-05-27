import IServiceContainer from './IServiceContainer';
import IEpiserverContext from './IEpiserverContext';
import IStateReducerInfo from './IStateReducerInfo';

export default interface IInitializableModule
{
    /**
     * Retrieve the name of the module
     * 
     * @returns {string}
     */
    GetName(): string;

    ConfigureContainer(container: IServiceContainer) : void;

    StartModule(context: IEpiserverContext): void;

    GetStateReducer(): IStateReducerInfo<any> | null;
}

export abstract class BaseInitializableModule implements IInitializableModule
{
    protected name : string = "Unnamed module";

    public GetName() : string
    {
        return this.name;
    }

    public ConfigureContainer(container: IServiceContainer) : void
    {
        //No action taken by default
    }

    public StartModule(context: IEpiserverContext): void
    {
        if (context.isDebugActive()) {
            console.debug(`Starting ${ this.GetName() }`);
        }
    }

    public GetStateReducer() : IStateReducerInfo<any> | null
    {
        return null;
    }
}