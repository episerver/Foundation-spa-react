// Export the "default" getStaticProps, and make sure we call it with and empty path
import { getStaticProps as baseGetStaticProps } from './[...page]'
export const getStaticProps : typeof baseGetStaticProps = 
        async ctx => baseGetStaticProps({ ...ctx, params: { page: [] } })

// Export the default component
export { 
    CmsPage as HomePage, 
    CmsPage as default 
} from './[...page]'