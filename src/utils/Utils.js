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
   * Returns a object FormData 
   * @param  {Object} formValues [description]
   * @return {Object}            Form data
   */
  static createFormDataObject(formValues = {}) {
    let formData = new FormData();

    Object.keys(formValues).forEach(( key ) => {
      formData.append(key, formValues[ key ]);
    });

    return formData;
  }

  static formatCurrency = (price) => {
    let finalPrice = price.toFixed(2).replace('.', ',');

    return finalPrice + ' €';
  }

  /**
   * Checks if user token is valid
   * @param  {[type]}  token [description]
   * @return {Boolean}       [description]
   */
  static isTokenValid() {
    const token            = window.localStorage.getItem('token_expire_date') || 0;
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    return(token >= currentTimeStamp);
  }

  /**
   * Indicates if a popin is displayed currently
   * @param  {[type]} currentPath [description]
   * @return {Boolean}             
   */
  static aPopinIsOpened(currentPath) {
    if (['edit', 'delete'].some(function(v) { return currentPath.indexOf(v) >= 0; })) {
      return true;
    } else {
      return false;
    }
  }
}