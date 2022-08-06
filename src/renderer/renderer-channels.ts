export enum RendererChannels {
  ICP_EXAMPLE = 'icp-example',
  OPEN_FILE = 'open-file',
  SAVE_FILE = 'save-file',
  /**
   * The notification gets the code in the editor
   * and sends it to the main process
   */
  FETCH_CODE_TO_SAVE_AS = 'fetch-code-to-save',
  /**
   * The notification gets the code in the editor
   * and sends it to the main process
   */
  FETCH_CODE_TO_SAVE = 'fetch-code-to-save',
  /**
   * Specifies the state of the codemap,
   * whether to display it or not.
   */
  SET_CODEMAP = 'set-codemap',
}
