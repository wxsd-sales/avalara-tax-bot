type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

type UrlSearchParams = ConstructorParameters<typeof URLSearchParams>[0];

type StandardParams = { params?: UrlSearchParams; paramsTransformer?: never };
type AdvanceTypeParams<P extends Exclude<unknown, UrlSearchParams>> = {
  params?: NonNullable<P>;
  paramsTransformer: (p?: P) => UrlSearchParams;
};
type FlexibleParams<P extends Exclude<unknown, UrlSearchParams>> = StandardParams | AdvanceTypeParams<P>;

type StandardHeaders = { headers?: HeadersInit; headersTransformer?: never };
type AdvanceTypeHeaders<H extends Exclude<unknown, HeadersInit>> = {
  headers: NonNullable<H>;
  headersTransformer: (h: H) => HeadersInit;
};
type FlexibleHeaders<H extends Exclude<unknown, HeadersInit>> = StandardHeaders | AdvanceTypeHeaders<H>;

export type FetchWrapperParam0 = Omit<RequestInit, 'body' | 'method' | 'signal'> & {
  resource?: Exclude<string, `/${string}` | `/`> | URL; // doesn't work
  baseUrl?: `${string}/` | URL;
  timeout?: number;
};

type HttpMethodParams<P, H> = { endpoint?: string } & FlexibleParams<P> &
  FlexibleHeaders<H> &
  Omit<RequestInit, 'body' | 'method' | 'headers'>;

export abstract class FetchWrapper<T> {
  private baseUrl = 'https://' + Math.random().toString(36).slice(2, 5);
  protected fetch: typeof fetch;
  protected url: URL;
  protected config: Omit<RequestInit, 'body' | 'method'>;
  protected timeout: number;

  /**
   * Creates the Request helper.
   *
   */
  protected constructor(
    { baseUrl = '/', resource = '', timeout = 8000, ...config }: FetchWrapperParam0 = {},
    fetch = globalThis.fetch
  ) {
    try {
      this.url = new URL(resource, baseUrl);
    } catch (e) {
      this.url = new URL(resource ?? '', this.baseUrl + baseUrl ?? '/');
    }
    this.fetch = fetch;
    this.config = config;
    this.timeout = timeout;
  }

  /**
   * Transform URL search parameters to fit standard format.
   *
   * @param config
   *
   * @return {UrlSearchParams | undefined}
   */
  protected static transformParams<P>(config: StandardParams | AdvanceTypeParams<P>) {
    return config?.paramsTransformer != null && config.params != null
      ? config.paramsTransformer(config.params)
      : config.params;
  }

  /**
   Transform headers to fit standard format.

   * @param config
   *
   * @return {HeadersInit | undefined}
   */
  protected static transformHeaders<H>(config: StandardHeaders | AdvanceTypeHeaders<H>) {
    return config?.headersTransformer != null ? config.headersTransformer(config.headers) : config.headers;
  }

  /**
   * Create new header by merging fresh to original and overwriting originals in case of duplicates.
   *
   * @param fresh
   * @param original
   *
   * @return {[string, string][] | Record<string, string> | Headers | undefined}
   */
  protected static mergeHeaders(fresh?: HeadersInit, original?: HeadersInit) {
    return fresh != null && original != null
      ? Array.from(new Headers(fresh).entries()).reduce((h, e) => {
          h.set(e[0], e[1]);
          return h;
        }, new Headers(original))
      : original ?? fresh;
  }

  /**
   * Transforms arbitrary types to that compatible for a fetch request.
   *
   * @param value
   */
  protected abstract transformBody(value: T): BodyInit;

  /**
   * Creates the endpoint URL.
   *
   * @param endpoint
   * @param query
   *
   * @returns {string}
   */
  protected formUrl(endpoint?: string, query?: UrlSearchParams) {
    const urlRegex = new RegExp(`^${this.baseUrl}`);
    const url = new URL(endpoint ?? '', this.url);
    query != null && new URLSearchParams(query).forEach((value, name) => url.searchParams.append(name, value));

    return url.toString().replace(urlRegex, '');
  }

  /**
   * Creates the Request object.
   *
   * @param config
   * @param method
   * @param rawBody
   *
   * @return {RequestInit}
   */
  protected formInit(method: HttpMethod, config: Omit<RequestInit, 'body' | 'method'>, rawBody?: T) {
    const body = rawBody != null ? this.transformBody(rawBody) : undefined;
    const headers = FetchWrapper.mergeHeaders(config.headers, this.config.headers);

    return {
      ...this.config,
      ...config,
      headers,
      method,
      body
    } satisfies RequestInit & { method: HttpMethod };
  }
  /**
   * Returns response if successful else rejects the Promise with the failed response enclosed.
   *
   * @param response
   *
   * @returns {Promise<Response>}
   */
  protected handleResponse(response: Response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(response);
  }

  /**
   * Makes a HTTP request.
   *
   * @param method
   * @param endpoint
   * @param body
   * @param config
   *
   * @returns {Promise<Response>}
   */
  protected makeRequest<P, H>(
    method: HttpMethod,
    { endpoint, body, ...config }: HttpMethodParams<P, H> & { body?: T } = {}
  ) {
    const params = FetchWrapper.transformParams(config);
    const headers = FetchWrapper.transformHeaders(config);
    const url = this.formUrl(endpoint, params);
    const init = this.formInit(method, { ...config, headers }, body);

    console.log(init.headers);
    console.log(init.body);
    console.log(init.method);

    return this.fetch(url, { ...init, signal: init?.signal ?? AbortSignal.timeout(this.timeout) }).then((r) =>
      this.handleResponse(r)
    );
  }

  /**
   * Makes a HTTP DELETE request.
   *
   * @param endpoint
   * @param params
   * @param config
   *
   * @returns {Promise<Response>}
   */
  delete<P, H>({ endpoint, body, ...config }: HttpMethodParams<P, H> & { body?: T } = {}) {
    return this.makeRequest('DELETE', { endpoint, body, ...config });
  }

  /**
   * Makes a HTTP HEAD request.
   *
   * @param endpoint
   * @param params
   * @param config
   *
   * @returns {Promise<Response>}
   */
  head<P, H>({ endpoint, ...config }: HttpMethodParams<P, H> = {}) {
    return this.makeRequest('HEAD', { endpoint, ...config });
  }

  /**
   * Makes a HTTP GET request.
   *
   * @param endpoint
   * @param params
   * @param config
   *
   * @returns {Promise<Response>}
   */
  get<P, H>({ endpoint, ...config }: HttpMethodParams<P, H> = {}) {
    return this.makeRequest('GET', { endpoint, ...config });
  }

  /**
   * Makes an HTTP OPTIONS request.
   *
   * @param endpoint
   * @param params
   * @param config
   *
   * @returns {Promise<Response>}
   */
  options<P, H>({ endpoint, ...config }: HttpMethodParams<P, H> = {}) {
    return this.makeRequest('OPTIONS', { endpoint, ...config });
  }

  /**
   * Makes a HTTP PATCH request.
   *
   * @param endpoint
   * @param params
   * @param body
   * @param config
   *
   * @returns {Promise<Response>}
   */
  patch<P, H>({ endpoint, body, ...config }: HttpMethodParams<P, H> & { body: T }) {
    return this.makeRequest('PATCH', { endpoint, body, ...config });
  }

  /**
   * Makes a HTTP POST request.
   *
   * @param endpoint
   * @param body
   * @param config
   *
   * @returns {Promise<Response>}
   */
  post<P, H>({ endpoint, body, ...config }: HttpMethodParams<P, H> & { body: T }) {
    return this.makeRequest('POST', { endpoint, body, ...config });
  }

  /**
   * Makes a HTTP PUT request.
   *
   * @param endpoint
   * @param body
   * @param config
   *
   * @returns {Promise<Response>}
   */
  put<P, H>({ endpoint, body, ...config }: HttpMethodParams<P, H> & { body: T }) {
    return this.makeRequest('PUT', { endpoint, body, ...config });
  }
}
