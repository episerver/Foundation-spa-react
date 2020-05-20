import LanguageList from './LanguageList';
import ContentRootList from './ContentRootList';

export default interface Website {
  id: string;
  name: string;
  languages: LanguageList;
  contentRoots: ContentRootList;
}
