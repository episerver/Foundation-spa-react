const EpiConfig = require('./episerver.webpack.config');
const ExpressConfig = require('./express.webpack.config');
const HtmlConfig = require('./html.webpack.config');
const EnvConfig = require('@episerver/webpack/Config');

module.exports = (env) => {
	const config = new EnvConfig(__dirname, env);

	switch (config.getEnvVariable('EPI_BUILD_TARGET', 'episerver').toLowerCase())
	{
		case 'html':
			return HtmlConfig(env);
		case 'express':
			return ExpressConfig(env);
		case 'episerver':
		default:
			return EpiConfig(env);
	}

};