import * as DEV from './dev';
import * as PROD from './prod';

let env;

if ('__ENV__' === 'development') {
  env = DEV;
} else {
  env = PROD;
}

export default env;
