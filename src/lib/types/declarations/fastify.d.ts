export * from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      HOST: string;
      PORT: number;
      WEBEX_API_BASE_URL: `${string}/`;
      WEBEX_BOT_ID: string;
      WEBEX_BOT_TOKEN: string;
      AVALARA_API_BASE_URL: `${string}/`;
      AVALARA_USERNAME: string;
      AVALARA_PASSWORD: string;
      AVALARA_CLIENT_ID: string;
      AVALARA_CLIENT_PROFILE_ID: string;
      WEBEX_PERSON_EMAIL_REGEX_BASE64: string;
      // this should be same as the confKey in options
      // specify your typing here
    };
  }
}
