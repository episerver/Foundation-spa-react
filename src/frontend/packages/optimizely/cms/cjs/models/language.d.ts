export declare type Language = {
    name: string;
    displayName: string;
    isMasterLanguage?: boolean;
    /**
     * The link to the startPage of this language
     *
     * @deprecated
     * @var { string }
     */
    link?: string;
    /**
     * The URL Slug of the startpage of this language
     *
     * @var { string }
     */
    urlSegment?: string;
};
export default Language;
