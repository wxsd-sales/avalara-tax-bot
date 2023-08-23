'use strict';
import { config } from 'dotenv';
import closeWithGrace from 'close-with-grace';

config();

// Require the framework
const Fastify = require('fastify');
// Instantiate Fastify with some config
const app = Fastify({
  logger: true
});

// Register your application as a normal plugin.
const appService = require('./app.js');
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});