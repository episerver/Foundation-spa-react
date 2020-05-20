export interface EPiGlobal {
  EPiServer: EPiServer;
}

export interface EPiServer {
  Forms?: EPiForms;
  CurrentPageLink: string;
  CurrentPageLanguage: string;
  CurrentFormLanguage?: string;
}

export interface EPiForms {
  InjectFormOwnJQuery: boolean;
  OriginalJQuery: any;
  [guid: string]: EPiFormInstance;
}

export interface EPiFormInstance {}

declare var epi: EPiGlobal;
export default epi;
