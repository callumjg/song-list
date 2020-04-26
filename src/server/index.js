import chalk from 'chalk';
import server from './server';
import connect from './db/mongoose';
const PORT = process.env.PORT || 3000;

connect();

server.listen(PORT, () =>
  console.log(`Server listening on port ${chalk.green(PORT)}`)
);
