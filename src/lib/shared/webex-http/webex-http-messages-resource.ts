import { API_BASE_URL } from '$lib/constants/webex';
import { WebexHttp } from './webex-http';
import type { JsonObject } from '$lib/types/json';

type From = { personId: string; personEmail?: never } | { personId?: never; personEmail: string };

type In = { roomId: string; mentionedPeople?: string[]; max?: number } & (
  | { parentId: string; before?: never; beforeMessage?: never }
  | { parentId?: never; before: string; beforeMessage?: string }
  | { parentId?: never; before?: string; beforeMessage: string }
);

type Without<Type1, Type2> = { [P in Exclude<keyof Type1, keyof Type2>]?: never };

export type XOR<Type1, Type2> = Type1 | Type2 extends object
  ? (Without<Type1, Type2> & Type2) | (Without<Type2, Type1> & Type1)
  : Type1 | Type2;

type To = { parentId?: string } & XOR<{ roomId: string }, XOR<{ toPersonId: string }, { toPersonEmail: string }>>;

type PlainTextContent = XOR<{ text: string; markdown: string }, XOR<{ text: string }, { markdown: string }>>;

type AttachmentOrFileContent = { markdown?: never } & XOR<
  { attachments: [JsonObject] },
  { files: { blob: Blob; name?: string } }
>;

export class WebexHttpMessagesResource extends WebexHttp {
  /**
   * Creates a Webex Request wrapper instance for the `messages` HTTP API resource.
   *
   * @param apiBaseUrl
   * @param accessToken
   */
  constructor(apiBaseUrl: `${string}/`, accessToken: string) {
    super(apiBaseUrl, 'messages', accessToken);
  }

  /**
   * Lists all messages in a 1:1 (direct) room.
   *
   * @param query
   *
   * @returns {Promise<Response>}
   */
  listDirectMessages(query: From) {
    const params = Object.entries(query).filter((x): x is [string, string] => x[1] !== undefined);

    return this.get({ endpoint: 'direct', params });
  }

  /**
   * Lists all messages in a room.
   *
   * @param query
   *
   * @returns {Promise<Response>}
   */
  listMessages(query: In) {
    const mentionedPeople = query.mentionedPeople?.join(',');
    const max = query.max?.toString();
    const params = Object.entries({ ...query, mentionedPeople, max }).filter(
      (x): x is [string, string] => x[1] !== undefined
    );

    return this.get({ params });
  }

  /**
   * Send a plain text message to a room.
   *
   * @param body
   *
   * @returns {Promise<Response>}
   */
  createMessage(body: To & PlainTextContent & AttachmentOrFileContent) {
    if (body.files != null) {
      const { files, ..._body } = body;

      const headers = new Headers(this.config.headers);
      headers.delete('Content-Type');

      const formData = new FormData();
      formData.set('files', files.blob, files.name);
      Object.keys(_body).forEach((k) => {
        const v = _body[k as keyof Omit<typeof body, 'files'>];
        v != null && formData.set(k, v);
      });

      return this.post({ body: formData, headers });
    }

    return this.post({ body });
  }
}

/**
 * Instantiates the Webex request wrapper for the `messages` HTTP API resource.
 *
 * @param accessToken
 * @param apiBaseUrl
 *
 * @returns {WebexHttpMessagesResource}
 */
export const webexHttpMessagesResource = (accessToken: string, apiBaseUrl: `${string}/` = API_BASE_URL) =>
  new WebexHttpMessagesResource(apiBaseUrl, accessToken);
