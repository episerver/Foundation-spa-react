export type ContentTypes = ContentType[]

export type ContentType = {
    id: string
    name: string
    version ?: string
    baseType ?: "Block" | "Page"
    editSettings ?: ContentTypeEditor
    properties: ContentTypeProperty[]
}

export type ContentTypeProperty = {
    name: string
    dataType: string
    itemType?: string
    branchSpecific: boolean
    editSettings: ContentTypeEditor
}

export type ContentTypeEditor = {
    visibility?: "default" | "hidden"
    displayName: string
    description?: string
    available?:boolean
    groupName?: string
    sortOrder: number
    hint?: string
    helpText?: string
}