const { initMongoConnection } = require('./db/initMongoConnection');
const { startServer } = require('./server');

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
