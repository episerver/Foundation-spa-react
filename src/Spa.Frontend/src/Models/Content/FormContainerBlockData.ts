import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * FormContainerBlock
 *
 * No Description available.
 *
 * @GUID 02ec61ff-819f-4978-add6-a097f5bd944e
 */
export default interface FormContainerBlockData extends IContent {
    /**
     * MetadataAttribute
     *
     * No description available
     */
    metadataAttribute: StringProperty

    /**
     * Title
     *
     * No description available
     */
    title: StringProperty

    /**
     * AllowToStoreSubmissionData
     *
     * No description available
     */
    allowToStoreSubmissionData: BooleanProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * ShowSummarizedData
     *
     * No description available
     */
    showSummarizedData: BooleanProperty

    /**
     * ConfirmationMessage
     *
     * No description available
     */
    confirmationMessage: StringProperty

    /**
     * RedirectToPage
     *
     * No description available
     */
    redirectToPage: StringProperty

    /**
     * SubmitSuccessMessage
     *
     * No description available
     */
    submitSuccessMessage: StringProperty

    /**
     * AllowAnonymousSubmission
     *
     * No description available
     */
    allowAnonymousSubmission: BooleanProperty

    /**
     * AllowMultipleSubmission
     *
     * No description available
     */
    allowMultipleSubmission: BooleanProperty

    /**
     * ShowNavigationBar
     *
     * No description available
     */
    showNavigationBar: BooleanProperty

    /**
     * AllowExposingDataFeeds
     *
     * No description available
     */
    allowExposingDataFeeds: BooleanProperty

    /**
     * Send email after form submission
     *
     * No description available
     */
    sendEmailAfterSubmissionActor: Property<any> // Original type: Message Template

    /**
     * Trigger webhook after form submission
     *
     * No description available
     */
    callWebhookAfterSubmissionActor: Property<any> // Original type: Web Hook

    /**
     * PartialSubmissionRetentionPeriod
     *
     * No description available
     */
    partialSubmissionRetentionPeriod: StringProperty

    /**
     * FinalizedSubmissionRetentionPeriod
     *
     * No description available
     */
    finalizedSubmissionRetentionPeriod: StringProperty

    /**
     * ElementsArea
     *
     * No description available
     */
    elementsArea: ContentAreaProperty

    /**
     * Connect to Datasource
     *
     * No description available
     */
    forms_ConnectedDataSource: Property<any> // Original type: Property Connected Data Source Collection

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FormContainerBlockProps extends ComponentProps<FormContainerBlockData> {}
