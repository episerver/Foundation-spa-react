import type { IContentComponent } from '@optimizely/cms'
import dynamic from 'next/dynamic'

export const VideoFile = dynamic(() => import('./VideoFile'), {
    ssr: false
})

VideoFile.displayName = "Optimizely Video Asset"

export default VideoFile