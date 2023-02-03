export type OptiOnPageEditingContext = {
    beta: {
        /**
         * @deprecated
         */
        inEditMode: boolean

        /**
         * @deprecated
         */
        isEditable: boolean

        /**
         * @deprecated
         */
        ready: boolean
    }
    inEditMode: boolean
    isEditable: boolean
    ready: boolean
    publish: (topic: string, message: any) => void
    subscribe: <K extends keyof OptiEvents>(topic: K, handler: (data: OptiEvents[K]) => void) => { remove: () => void}
}

export type OptiEvents = {
    contentSaved: {
        contentLink: string
        editUrl: string
        properties: {
            name: string, 
            value: any, 
            successful: boolean, 
            validationErrors: null | any[]
        }[]
    }
}

export default OptiOnPageEditingContext