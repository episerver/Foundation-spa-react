import { getStaticProps as baseGetStaticProps } from './[...page]'
export const getStaticProps : typeof baseGetStaticProps = async ctx => baseGetStaticProps({ ...ctx, params: { page: [] } })
export { CmsPage as HomePage, CmsPage as default } from './[...page]'