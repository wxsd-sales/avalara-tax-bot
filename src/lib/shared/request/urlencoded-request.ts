import { FetchWrapper, FetchWrapperParam0 } from './fetch-wrapper';

type UrlEncodedRequestParam0 = FetchWrapperParam0 & {
  readonly contentType?: `application/x-www-form-urlencoded`;
};

export class UrlEncodedRequest extends FetchWrapper<URLSearchParams> {
  /**
   * Creates the Url Encoded Request helper.
   *
   */
  constructor({ baseUrl = '/', ...args }: UrlEncodedRequestParam0 = {}, fetch = globalThis.fetch) {
    const contentType = args?.contentType ?? `application/x-www-form-urlencoded`;
    const headers = FetchWrapper.mergeHeaders(args?.headers, { 'Content-Type': contentType });
    super({ ...args, headers, baseUrl }, fetch);
  }

  protected transformBody(value: URLSearchParams): BodyInit {
    return value;
  }
}

/**
 * Instantiate a URL Encoded request helper.
 *
 * @type {UrlEncodedRequest}
 */
export const urlEncodedRequest = (...args: ConstructorParameters<typeof UrlEncodedRequest>) =>
  new UrlEncodedRequest(...args);
