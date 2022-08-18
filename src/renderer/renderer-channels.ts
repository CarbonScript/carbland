export enum RendererChannels {
  ICP_EXAMPLE = 'icp-example',
  /**
   * Open a file in application and transmit file contents
   * into code editor
   */
  OPEN_FILE = 'open-file',
  /**
   * Fetch the code content in code-editor
   */
  FETCH_CODE = 'fetch-code',
  /**
   * Save the code content that in code-editor into file 
   */
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
