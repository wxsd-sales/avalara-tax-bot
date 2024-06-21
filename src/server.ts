import Ajv from 'ajv';
import bot from './services/bot';
import AutoLoad from '@fastify/autoload';
import addFormats from 'ajv-formats';
import { join } from 'path';
import { API_BASE_URL as AVALARA_API_BASE_URL } from '$lib/constants/avalara';
import { API_BASE_URL as WEBEX_API_BASE_URL, VALID_ACCESS_TOKEN } from '$lib/constants/webex';
import type { SensibleOptions } from '@fastify/sensible';
import type { FastifyInstance, FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import type { FastifyEnvOptions as EnvOptions } from '@fastify/env';
import type { FastifyStaticOptions as StaticOptions } from '@fastify/static';
import type { AutoloadPluginOptions } from '@fastify/autoload';

export type AppOptions = {
  server?: FastifyServerOptions;
  routes: AutoloadPluginOptions;
  plugins: AutoloadPluginOptions & {
    options: { env: EnvOptions; static: StaticOptions; sensible?: SensibleOptions };
  };
};

const ajv = addFormats(
  new Ajv({ allErrors: true, removeAdditional: true, useDefaults: true, coerceTypes: true, allowUnionTypes: true })
);

const schema = {
  type: 'object',
  required: [
    'PORT',
    'AVALARA_USERNAME',
    'AVALARA_PASSWORD',
    'AVALARA_CLIENT_ID',
    'AVALARA_CLIENT_PROFILE_ID',
    'WEBEX_BOT_EMAIL',
    'WEBEX_BOT_ID',
    'WEBEX_BOT_TOKEN'
  ],
  properties: {
    PORT: { type: 'number', default: 3000 },
    AVALARA_API_BASE_URL: { type: 'string', format: 'uri', default: AVALARA_API_BASE_URL },
    AVALARA_USERNAME: { type: 'string', format: 'email' },
    AVALARA_PASSWORD: { type: 'string', format: 'password' },
    AVALARA_CLIENT_ID: { type: 'string', format: 'int64' },
    AVALARA_CLIENT_PROFILE_ID: { type: 'string', format: 'int64' },
    WEBEX_API_BASE_URL: { type: 'string', format: 'uri', default: WEBEX_API_BASE_URL },
    WEBEX_BOT_EMAIL: { type: 'string', format: 'email' },
    WEBEX_BOT_ID: { type: 'string' },
    WEBEX_BOT_TOKEN: { type: 'string', format: 'password', pattern: VALID_ACCESS_TOKEN.source },
    WEBEX_PERSON_EMAIL_REGEX_BASE64: { type: 'string', default: 'Lio' }
  }
};

// Pass --options via CLI arguments in command to enable these options.
const appOptions: AppOptions = {
  server: { logger: true },
  routes: { dir: join(__dirname, 'routes') },
  plugins: {
    dir: join(__dirname, 'plugins'),
    options: { static: { root: join(__dirname, '../public') }, env: { dotenv: true, expandEnv: true, ajv, schema } }
  }
};

const app: FastifyPluginAsync<AppOptions> = async (fastify, options): Promise<void> => {
  // load plugins
  void fastify.register(AutoLoad, options.plugins);

  // load routes
  void fastify.register(AutoLoad, options.routes);

  fastify.addHook('onReady', async () => {
    // Some code
    const personEmailRegexBase64 = Buffer.from(fastify.config.WEBEX_PERSON_EMAIL_REGEX_BASE64, 'base64');
    const personEmailRegex = new RegExp(personEmailRegexBase64.toString());
    const webex = {
      baseUrl: fastify.config.WEBEX_API_BASE_URL,
      botId: fastify.config.WEBEX_BOT_ID,
      botToken: fastify.config.WEBEX_BOT_TOKEN,
      personEmailRegex
    };
    const avalara = {
      baseUrl: fastify.config.AVALARA_API_BASE_URL,
      username: fastify.config.AVALARA_USERNAME,
      password: fastify.config.AVALARA_PASSWORD,
      clientId: fastify.config.AVALARA_CLIENT_ID,
      clientProfileId: fastify.config.AVALARA_CLIENT_PROFILE_ID
    };

    await bot(webex, avalara, fastify.log).initialize();
  });
};

export default (fastify: FastifyInstance) => app(fastify, appOptions);
