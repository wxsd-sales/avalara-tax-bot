import { FetchWrapper, FetchWrapperParam0 } from './fetch-wrapper';

type JsonRequestParam0 = FetchWrapperParam0 & {
  readonly contentType?: `application/json${string}`;
};

export class JsonRequest extends FetchWrapper<JsonValue> {
  /**
   * Creates the JSON Request helper.
   *
   */
  constructor({ baseUrl = '/', ...args }: JsonRequestParam0 = {}, fetch = globalThis.fetch) {
    const contentType = args?.contentType ?? `application/json`;
    const headers = FetchWrapper.mergeHeaders(args?.headers, { 'Content-Type': contentType });
    super({ ...args, headers, baseUrl }, fetch);
  }

  protected transformBody(value: JsonValue): BodyInit {
    return JSON.stringify(value);
  }
}

/**
 * Instantiate a JSON request helper.
 *
 * @type {JsonRequest}
 */
export const jsonRequest = (...args: ConstructorParameters<typeof JsonRequest>) => new JsonRequest(...args);
