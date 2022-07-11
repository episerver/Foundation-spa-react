module.exports = require('./cjs/util/index.cjs')
const propUtils = require('./cjs/util/property.cjs')
const refUtils = require('./cjs/util/content-reference.cjs')
module.exports.readValue = propUtils.readValue
module.exports.createApiId = refUtils.createApiId