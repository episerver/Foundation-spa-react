const factory = require('./cjs/content-delivery/factory')
module.exports = factory.createInstance
module.exports.default = factory.createInstance
module.exports.createContentDeliveryClient = factory.createInstance