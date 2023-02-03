const helper =  './cjs/hooks/content-uri.cjs'
module.exports = {
    buildContentURI: helper.buildContentURI,
    parseContentURI: helper.parseContentURI,
    default: helper.buildContentURI
}