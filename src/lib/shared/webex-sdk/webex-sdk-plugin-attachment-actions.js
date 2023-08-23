/**
 * @typedef {any} AttachmentAction
 */

/**
 * Webex SDK Attachment Actions Plugin wrapper.
 *
 */
export class WebexSdkPluginAttachmentActions {
  /**
   * @callback OnEventAction
   * @param {AttachmentAction} event
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns any
   */

  /**
   * Starts listening for attachmentAction events by establishing a websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {OnEventAction} [onCreate]
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static startListening(webex, onCreate) {
    return webex.attachmentActions.listen().then(() => {
      webex.attachmentActions.on('created', async (/** @type {AttachmentAction} */ event) => onCreate?.(event, webex));

      return webex;
    });
  }

  /**
   * Stops listening for attachmentAction events on an established websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static stopListening(webex) {
    return new Promise((resolve) => {
      webex.attachmentActions.stopListening();
      webex.attachmentActions.off('created');

      return resolve(webex);
    });
  }

  /**
   * Create a new attachment action for a message with attachment.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {AttachmentAction} body
   *
   * @returns {Promise<AttachmentAction>}
   */
  static create(webex, body) {
    return webex.attachmentActions.create(body);
  }

  /**
   * Get an attachment action for a message with attachment.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {AttachmentAction} body
   *
   * @returns {Promise<AttachmentAction>}
   */
  static get(webex, body) {
    return webex.attachmentActions.get(body);
  }
}

export const webexSdkAttachmentActionsPlugin = WebexSdkPluginAttachmentActions;
