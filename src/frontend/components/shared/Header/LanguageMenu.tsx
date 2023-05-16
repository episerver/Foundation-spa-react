import dynamic from 'next/dynamic'
export default dynamic(() => import('./DynamicParts/LanguageMenu'), { ssr: false })