//Episerver library
import Start, { Core } from '@episerver/spa-core';

//Application
import config from 'app/Config';
import 'app/styles.scss';

Start(config);

Core.DefaultContext.events().debug = false;