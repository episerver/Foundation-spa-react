import IPathProvider from '../PathProvider';
import ServerContext from './ServerContext';

declare var ssr: ServerContext;

export default class PathProvider implements IPathProvider
{
    getCurrentPath(): string {
        return ssr.Path;
    }
}