import { init as webex } from 'webex';
import { SDK_CONFIG } from '$lib/constants/webex';

/**
 * @typedef {any} Webex
 */

export class WebexSdk {
  #accessToken;
  #config;

  /**
   * Creates a Webex SDK wrapper instance.
   *
   * @param {string} accessToken
   * @param {Record<string, unknown>} config
   */
  constructor(accessToken, config = SDK_CONFIG) {
    this.#accessToken = accessToken;
    this.#config = config;
  }

  /**
   * Initialize the core Webex instance from the SDK.
   *
   * @returns {Promise<Webex>}
   */
  initialize() {
    return new Promise((resolve) => {
      return resolve(webex({ config: this.#config, credentials: { access_token: this.#accessToken } }));
    });
  }
}

/**
 * Instantiates the Webex SDK wrapper.
 *
 * @param {string} accessToken
 * @param {Record<string, unknown>} config
 *
 * @returns {WebexSdk}
 */
export const webexSdk = (accessToken, config = SDK_CONFIG) => new WebexSdk(accessToken, config);
