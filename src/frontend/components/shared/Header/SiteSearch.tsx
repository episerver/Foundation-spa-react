import dynamic from 'next/dynamic'
export default dynamic(() => import('./DynamicParts/SiteSearch'), { ssr: false })