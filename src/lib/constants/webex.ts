import { VALID_EMAIL } from './common';

export const GETTING_STARTED_LINK = 'https://developer.webex.com/docs/getting-started#accounts-and-authentication/';
export const API_BASE_URL = 'https://webexapis.com/v1/';
export const FEDRAMP_API_BASE_URL = 'https://api-usgov.webex.com/v1/';
export const SDK_CONFIG = {
  logger: { level: 'silent' },
  meetings: { reconnection: { enabled: true } }
};

export const VALID_ACCESS_TOKEN =
  /^([a-zA-Z0-9]{64})_(.*)_([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/;
export const VALID_APP_PATTERN = /^https?:\/\/(?:teams|teams-stage|teams-unstable|teams-test).webex.com/;
export const VALID_SIP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\w|-)+\.)*(webex|ciscospark|projectsquared).com$/;
export const VALID_PMR_ADDRESS = /([a-z0-9][-a-z0-9, '.']{0,62})@([a-z0-9][-a-z0-9, '.']{0,62})\.webex\.com/i;
export const VALID_PMR_LINK =
  /(https:\/\/)?([a-z0-9][-a-z0-9, '.']{0,62})\.webex\.com\/(meet|join)\/([a-z0-9][-a-z0-9, '.']{0,62})\/?/i;
export const VALID_MEETING_LINK =
  /(https:\/\/)?([a-z0-9][-a-z0-9, '.']{0,62})\.(?:webex|ciscospark)\.com\/(?:meet|join|m)\/([a-z0-9][-a-z0-9, '.']{0,62})\/?/i;
export const VALID_PIN = /([0-9]{4,6})/;
export const VALID_LOCI = /loci\/([\w-]+)/;
export const VALID_SHORT_SIP = /\d{9,11}@webex\.com/i;
export const VALID_SIP_MEETING_NUMBER = /(\d{9,11})@(?:\w+\.)?webex\.com/i;
export const VALID_DESTINATION = new RegExp(
  `(${VALID_MEETING_LINK.source})|(${VALID_PMR_LINK.source})|(${VALID_PMR_ADDRESS.source})|(${VALID_SIP.source})|(${VALID_EMAIL.source})`,
  'i'
);
