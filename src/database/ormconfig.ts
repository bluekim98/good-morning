import * as dotenv from 'dotenv';
dotenv.config();
import { DEV_CONFIG, APP_CONFIG } from './config';

const ormconfig = { app: APP_CONFIG, dev: DEV_CONFIG };

export default ormconfig;
