import dynamic from 'next/dynamic'
export default dynamic(() => import('./DynamicParts/UserMenu'), { ssr: false })