import morgan from 'morgan';

const { NODE_ENV } = process.env;

const logMode = NODE_ENV === 'production' ? 'common' : 'dev';

export const requestsLogger = morgan(logMode);