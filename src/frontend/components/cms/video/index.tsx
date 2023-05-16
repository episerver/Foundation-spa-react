import type { ComponentType } from "react"
import MediaVideoFile from './media/VideoFile'

export const CmsVideoComponents : Record<string, ComponentType> = {
    "video/media/VideoFile": MediaVideoFile
}

export default CmsVideoComponents