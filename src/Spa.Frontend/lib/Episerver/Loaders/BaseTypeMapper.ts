import IContent, { IContentType, BaseIContent } from '../Models/IContent';

/**
 * Type info descriptor for a specific model within Episerver
 */
export interface TypeMapperTypeInfo {
  dataModel: string;
  instanceModel: string;
}

/**
 * Static interface for the typemapper, so it can be included
 * in the configuration
 */
export interface TypeMapperType {
  new: BaseTypeMapper;
}

/**
 * Base implementation for the TypeMapper, which is used to dynamically load
 * the content types needed to interact with the system.
 */
export default abstract class BaseTypeMapper {
  private cache: { [typeName: string]: IContentType } = {};
  private loading: { [typeName: string]: Promise<IContentType> } = {};

  /**
   * The list of types registered within Episerver and the configuration
   * of how they map to object types in TypeScript/JavaScript
   */
  protected abstract map: { [type: string]: TypeMapperTypeInfo };

  /**
   * Dynamically load a content type into memory
   *
   * @param typeInfo The mapping information of the type to load
   */
  protected abstract doLoadType(typeInfo: TypeMapperTypeInfo): Promise<IContentType>;

  public loadType(typeName: string): Promise<IContentType> {
    if (!this.typeExists(typeName)) {
      throw `The type ${typeName} is not known within Episerver`;
    }
    if (this.isCached(typeName)) {
      return Promise.resolve(this.getType(typeName, true) as IContentType);
    }
    if (!this.isLoading(typeName)) {
      const me = this;
      this.loading[typeName] = this.doLoadType(this.map[typeName]).then((t) => {
        me.cache[typeName] = t;
        delete me.loading[typeName];
        return t;
      });
    }
    return this.loading[typeName];
  }

  public async createInstanceAsync<T extends IContent>(data: T): Promise<BaseIContent<T>> {
    let typeName = data.contentType.slice(-1)[0];
    let dataType = await this.loadType(typeName);
    return new dataType(data);
  }

  public createInstance<T extends IContent>(data: T): BaseIContent<T> {
    let typeName = data.contentType.slice(-1)[0];
    let dataType = this.getType(typeName) as IContentType;
    return new dataType(data);
  }

  public getType(typeName: string, throwOnUnknown: boolean = true): IContentType | null {
    if (this.isCached(typeName)) {
      return this.cache[typeName];
    }
    if (throwOnUnknown) {
      throw `The type ${typeName} has not been cached!`;
    }
    return null;
  }

  public isCached(typeName: string): boolean {
    try {
      return this.cache[typeName] ? true : false;
    } catch (e) {
      //Ignore exception
    }
    return false; //An exception occured, so not pre-loaded
  }

  public isLoading(typeName: string): boolean {
    try {
      return this.loading[typeName] ? true : false;
    } catch (e) {
      //Ignore exception
    }
    return false; //An exception occured, so not pre-loaded
  }

  public typeExists(typeName: string): boolean {
    try {
      return this.map[typeName] ? true : false;
    } catch (e) {
      //Ignore exception
    }
    return false;
  }
}
