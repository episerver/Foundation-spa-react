import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * FormContainerBlock
 *
 * No Description available.
 *
 * @GUID 02ec61ff-819f-4978-add6-a097f5bd944e
 */
export default interface FormContainerBlockData extends Taxonomy.IContent {
    /**
     * MetadataAttribute
     *
     * No description available
     */
    metadataAttribute: ContentDelivery.StringProperty

    /**
     * Title
     *
     * No description available
     */
    title: ContentDelivery.StringProperty

    /**
     * AllowToStoreSubmissionData
     *
     * No description available
     */
    allowToStoreSubmissionData: ContentDelivery.BooleanProperty

    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

    /**
     * ShowSummarizedData
     *
     * No description available
     */
    showSummarizedData: ContentDelivery.BooleanProperty

    /**
     * ConfirmationMessage
     *
     * No description available
     */
    confirmationMessage: ContentDelivery.StringProperty

    /**
     * RedirectToPage
     *
     * No description available
     */
    redirectToPage: ContentDelivery.StringProperty

    /**
     * SubmitSuccessMessage
     *
     * No description available
     */
    submitSuccessMessage: ContentDelivery.StringProperty

    /**
     * AllowAnonymousSubmission
     *
     * No description available
     */
    allowAnonymousSubmission: ContentDelivery.BooleanProperty

    /**
     * AllowMultipleSubmission
     *
     * No description available
     */
    allowMultipleSubmission: ContentDelivery.BooleanProperty

    /**
     * ShowNavigationBar
     *
     * No description available
     */
    showNavigationBar: ContentDelivery.BooleanProperty

    /**
     * AllowExposingDataFeeds
     *
     * No description available
     */
    allowExposingDataFeeds: ContentDelivery.BooleanProperty

    /**
     * Send email after form submission
     *
     * No description available
     */
    sendEmailAfterSubmissionActor: ContentDelivery.Property<any> // Original type: Message Template

    /**
     * Trigger webhook after form submission
     *
     * No description available
     */
    callWebhookAfterSubmissionActor: ContentDelivery.Property<any> // Original type: Web Hook

    /**
     * PartialSubmissionRetentionPeriod
     *
     * No description available
     */
    partialSubmissionRetentionPeriod: ContentDelivery.StringProperty

    /**
     * FinalizedSubmissionRetentionPeriod
     *
     * No description available
     */
    finalizedSubmissionRetentionPeriod: ContentDelivery.StringProperty

    /**
     * ElementsArea
     *
     * No description available
     */
    elementsArea: ContentDelivery.ContentAreaProperty

    /**
     * Connect to Datasource
     *
     * No description available
     */
    forms_ConnectedDataSource: ContentDelivery.Property<any> // Original type: Property Connected Data Source Collection

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FormContainerBlockProps extends ComponentTypes.AbstractComponentProps<FormContainerBlockData> {}

export class FormContainerBlockType extends Taxonomy.AbstractIContent<FormContainerBlockData> implements FormContainerBlockData {
    protected _typeName : string = "FormContainerBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'metadataAttribute': 'LongString',
        'title': 'LongString',
        'allowToStoreSubmissionData': 'Boolean',
        'description': 'LongString',
        'showSummarizedData': 'Boolean',
        'confirmationMessage': 'LongString',
        'redirectToPage': 'Url',
        'submitSuccessMessage': 'XhtmlString',
        'allowAnonymousSubmission': 'Boolean',
        'allowMultipleSubmission': 'Boolean',
        'showNavigationBar': 'Boolean',
        'allowExposingDataFeeds': 'Boolean',
        'sendEmailAfterSubmissionActor': 'Message Template',
        'callWebhookAfterSubmissionActor': 'Web Hook',
        'partialSubmissionRetentionPeriod': 'LongString',
        'finalizedSubmissionRetentionPeriod': 'LongString',
        'elementsArea': 'ContentArea',
        'forms_ConnectedDataSource': 'Property Connected Data Source Collection',
    }

    /**
     * MetadataAttribute
     *
     * No description available
     */
    public get metadataAttribute() : FormContainerBlockData["metadataAttribute"] { return this.getProperty("metadataAttribute"); }

    /**
     * Title
     *
     * No description available
     */
    public get title() : FormContainerBlockData["title"] { return this.getProperty("title"); }

    /**
     * AllowToStoreSubmissionData
     *
     * No description available
     */
    public get allowToStoreSubmissionData() : FormContainerBlockData["allowToStoreSubmissionData"] { return this.getProperty("allowToStoreSubmissionData"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : FormContainerBlockData["description"] { return this.getProperty("description"); }

    /**
     * ShowSummarizedData
     *
     * No description available
     */
    public get showSummarizedData() : FormContainerBlockData["showSummarizedData"] { return this.getProperty("showSummarizedData"); }

    /**
     * ConfirmationMessage
     *
     * No description available
     */
    public get confirmationMessage() : FormContainerBlockData["confirmationMessage"] { return this.getProperty("confirmationMessage"); }

    /**
     * RedirectToPage
     *
     * No description available
     */
    public get redirectToPage() : FormContainerBlockData["redirectToPage"] { return this.getProperty("redirectToPage"); }

    /**
     * SubmitSuccessMessage
     *
     * No description available
     */
    public get submitSuccessMessage() : FormContainerBlockData["submitSuccessMessage"] { return this.getProperty("submitSuccessMessage"); }

    /**
     * AllowAnonymousSubmission
     *
     * No description available
     */
    public get allowAnonymousSubmission() : FormContainerBlockData["allowAnonymousSubmission"] { return this.getProperty("allowAnonymousSubmission"); }

    /**
     * AllowMultipleSubmission
     *
     * No description available
     */
    public get allowMultipleSubmission() : FormContainerBlockData["allowMultipleSubmission"] { return this.getProperty("allowMultipleSubmission"); }

    /**
     * ShowNavigationBar
     *
     * No description available
     */
    public get showNavigationBar() : FormContainerBlockData["showNavigationBar"] { return this.getProperty("showNavigationBar"); }

    /**
     * AllowExposingDataFeeds
     *
     * No description available
     */
    public get allowExposingDataFeeds() : FormContainerBlockData["allowExposingDataFeeds"] { return this.getProperty("allowExposingDataFeeds"); }

    /**
     * Send email after form submission
     *
     * No description available
     */
    public get sendEmailAfterSubmissionActor() : FormContainerBlockData["sendEmailAfterSubmissionActor"] { return this.getProperty("sendEmailAfterSubmissionActor"); }

    /**
     * Trigger webhook after form submission
     *
     * No description available
     */
    public get callWebhookAfterSubmissionActor() : FormContainerBlockData["callWebhookAfterSubmissionActor"] { return this.getProperty("callWebhookAfterSubmissionActor"); }

    /**
     * PartialSubmissionRetentionPeriod
     *
     * No description available
     */
    public get partialSubmissionRetentionPeriod() : FormContainerBlockData["partialSubmissionRetentionPeriod"] { return this.getProperty("partialSubmissionRetentionPeriod"); }

    /**
     * FinalizedSubmissionRetentionPeriod
     *
     * No description available
     */
    public get finalizedSubmissionRetentionPeriod() : FormContainerBlockData["finalizedSubmissionRetentionPeriod"] { return this.getProperty("finalizedSubmissionRetentionPeriod"); }

    /**
     * ElementsArea
     *
     * No description available
     */
    public get elementsArea() : FormContainerBlockData["elementsArea"] { return this.getProperty("elementsArea"); }

    /**
     * Connect to Datasource
     *
     * No description available
     */
    public get forms_ConnectedDataSource() : FormContainerBlockData["forms_ConnectedDataSource"] { return this.getProperty("forms_ConnectedDataSource"); }

}
