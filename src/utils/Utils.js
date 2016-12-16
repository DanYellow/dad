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

  /**
   * Returns a clean array for select tag to display properly list of categories
   * @param  {Array} categories [description]
   * @return {Array<{value, label}>}            Clean array of categories fir
   */
  static mapCategoriesToSelectOptions(categories) {
    let options = [];
    categories.forEach(function(category) {
      options.push({ value: category.id, label: category.name });
    });

    return options;
  }

  /**
   * [createFormDataObject description]
   * @param  {Object} formValues [description]
   * @return {[type]}            [description]
   */
  static createFormDataObject(formValues = {}) {
    let formData = new FormData();
    for(let name in formValues) {
      formData.append(name, formValues[name]);
    }
    formData.delete('image');
    formData.delete('seller');
    formData.delete('created_at');
    formData.delete('last_update');
    formData.delete('is_mine');
    formData.append('image', window.foo);
  
    return formData;
  }

  static formatCurrency = (price) => {
    let finalPrice = price.toFixed(2).replace('.', ',');

    return finalPrice + ' €';
  }
}