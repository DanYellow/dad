export default class Utils {
  /**
   * Transforms object to query string params. Remove null keys
   * @param  {Object} object Object to transform
   * @return {String}        URL params string
   */
  static objectToQueryString(object) {
    let queryString = '?';
    let queryParamsArray = [];
    for (var i = Object.keys(object).length - 1; i >= 0; i--) {
      let value = object[Object.keys(object)[i]];
      let key = Object.keys(object)[i];
      if (!value) { continue; };
      queryParamsArray.push(`${key}=${value}`)
    };
    queryString += queryParamsArray.join('&');

    return queryString;
  } 
}