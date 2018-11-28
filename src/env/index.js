import * as DEV from './dev';
import * as PROD from './prod';

let env;

if (process.env.NODE_ENV === 'development') {
  env = DEV;
} else {
  env = PROD;
}

export default env;
