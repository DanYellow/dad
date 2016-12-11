export default class Utils {
  /**
   * Transforms object to query string params. Remove null keys
   * @param  {Object} object Object to transform
   * @return {String}        URL params string
   */
  static objectToQueryString(object) {
    
    let queryParamsArray = [];
    for (var i = Object.keys(object).length - 1; i >= 0; i--) {
      const value = object[Object.keys(object)[i]];
      const key = Object.keys(object)[i];

      if (!value) { continue; };

      queryParamsArray.push(`${key}=${value}`)
    };

    if (queryParamsArray.length <= 0) { return ''; }

    let queryString = '?';
    queryString += queryParamsArray.join('&');

    return queryString;
  }

  static getFormDataObj(form) {
    let formData = new FormData();

    let obj = {};
    for(let i = 0 ; i < form.elements.length ; i++){
      let input = form.elements.item(i);
      if (!input.name) { continue; }
      obj[input.name] = input.value;
      formData.append(input.name, input.value);
    }

    return { formData: formData, formObject: obj };
  }
}