export type Website = {
    name: string
    id: string
    editLocation: string
    contentRoots: Record<string, ContentRoot>
    languages: Language[]
    hosts?: Host[]
}

export type ContentRoot<ExpandedType = any> = {
    id: number
    workId: number
    guidValue: string
    providerName: string | null
    url: string | null
    expanded ?: ExpandedType | null
}

export type Host = {
    name: string
    type: "Undefined" | "Edit" | "Primary"
    language: Language | null
}

export type Language = {
    /**
     * If set to true, this is the default/master language for
     * the website. Any other value, including null or undefined
     * implies false
     */
    isMasterLanguage ?: boolean | null

    /**
     * The URL Slug for this language
     */
    urlSegment ?: string

    /**
     * The homepage for this language
     */
    url ?: string

    /**
     * The name of the language, as it should be displayed to the
     * visitors
     */
    displayName: string

    /**
     * The code of the language, is it is used internally by the CMS
     */
    name: string
}