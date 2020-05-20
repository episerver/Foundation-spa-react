/**
 * String utilities for common advanced string operations, which are needed across multiple
 * locations.
 */
export default class StringUtils {
  /**
   * Transform a model name, as received from the ContentDelivery API to a safe model name that
   * can be loaded through the ES module loaders.
   *
   * @param {string} modelName  The original model name
   */
  public static SafeModelName(modelName: string): string {
    let processedName = modelName;
    processedName = processedName.replace('(', '_').replace(')', '_');
    processedName = this.TrimRight('_', processedName);
    return processedName;
  }

  /**
   * Trim all occurences of a string of the end of another string
   *
   * @param {string} char     The string to search
   * @param {string} subject  The string to manipulate
   * @returns {string}        The manipulated string
   */
  public static TrimRight(char: string, subject: string): string {
    if (typeof char != 'string' || char.length < 1) {
      throw 'Char must be a string of minimal one char';
    }
    if (typeof subject != 'string') {
      throw 'Subject must be a string';
    }

    if (char.length > subject.length) {
      return subject;
    }

    let length = -1 * char.length;
    let out = subject;
    while (out.slice(length) == char) {
      out = out.substr(0, out.length + length);
    }
    return out;
  }

  /**
   * Trim all occurences of a string of the start of another string
   *
   * @param {string} char     The string to search
   * @param {string} subject  The string to manipulate
   * @returns {string}        The manipulated string
   */
  public static TrimLeft(char: string, subject: string): string {
    if (typeof char != 'string' || char.length < 1) {
      throw 'Char must be a string of minimal one char';
    }
    if (typeof subject != 'string') {
      throw 'Subject must be a string';
    }

    if (char.length > subject.length) {
      return subject;
    }

    let out = subject;
    while (out.slice(0, char.length) == char) {
      out = out.substr(char.length);
    }
    return out;
  }
}
