import { Connection, createConnection, getConnectionManager } from 'typeorm';

import config from './ormconfig';

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const connect = await createConnection(config);
    console.log(`Database connection success. Connection name: '${connect.name}' Database: '${connect.options.database}'`);
  } catch (err) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      const activeConnection = getConnectionManager().get(config.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};