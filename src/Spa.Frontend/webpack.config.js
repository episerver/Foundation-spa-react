const frontendConfig = require('./webpack.frontend.config');
const serverConfig = require('./webpack.server.config');

module.exports = (env) => {
	return [
		frontendConfig(env),
		serverConfig(env)
	]
};