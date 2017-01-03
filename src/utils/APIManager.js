import Utils from './Utils'

export default class APIManager {
  static getMessageForStatusCode(statusCode) {
    let message = '';
    switch (statusCode) {
      case 1000:
        message = 'Élément crée';
        break;
      case 1001:
        message = 'Élément mis à jour';
        break;
      case 1002:
        message = 'Élément supprimé';
        break;
      case 1004:
        message = 'Élément non trouvé';
        break;
      case 1005:
        message = 'Vous n\'êtes pas connecté(e)';
        break;
      case 1006:
        message = 'Identifiants inconnus';
        break;
      case 1007:
        message = 'Cette entrée existe déjà';
        break;
      case 1008:
        message = 'Le formulaire est imcomplet';
        break;
      case 1009:
        message = 'Cet utilisateur n\'existe pas';
        break;
      case 1010:
        message = 'Votre compte a été crée, vous pouvez vous connecter.';
        break;
      case 1011:
        message = 'Vous êtes connecté(e). Vous allez être redirigé vers l\'accueil';
        break;
      case 1012:
        message = 'Mot de passe incorrect';
        break;
      case 1013:
        message = 'Format d\'image incorrect. Seul les formats suivants sont acceptés : .png, .jp(e)g, .gif';
        break;
      case 1014:
        message = 'Un lien de récupération de mot de passe vient d\'être envoyé à votre adresse mail';
        break;
      case 1015:
        message = 'Cet utilisateur existe déjà'
        break;
      default:
        message = '';
        break;
    }
    return message;
  }

  // slant
  /*** 
   *       ________                _ _____          __   ___       __                __  _                                __      
   *      / ____/ /___ ___________(_) __(_)__  ____/ /  /   | ____/ /   _____  _____/ /_(_)_______  ____ ___  ___  ____  / /______
   *     / /   / / __ `/ ___/ ___/ / /_/ / _ \/ __  /  / /| |/ __  / | / / _ \/ ___/ __/ / ___/ _ \/ __ `__ \/ _ \/ __ \/ __/ ___/
   *    / /___/ / /_/ (__  |__  ) / __/ /  __/ /_/ /  / ___ / /_/ /| |/ /  __/ /  / /_/ (__  )  __/ / / / / /  __/ / / / /_(__  ) 
   *    \____/_/\__,_/____/____/_/_/ /_/\___/\__,_/  /_/  |_\__,_/ |___/\___/_/   \__/_/____/\___/_/ /_/ /_/\___/_/ /_/\__/____/  
   *                                                                                                                              
   */

  /**
   * Retrieve classified advertisements for a given params (page, category, query/search)
   * @param  {Object} [params={p: 1, q: null, cat: null}]          queryString params
   * @param  {[type]} successCallback Callback function success to call when API call succeed
   * @param  {[type]} errorCallback   Callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisements(params={p: 1, q: null, c: null}, successCallback, errorCallback, currentUser = false) {
    let url = `${APIManager.baseURL}/c_as/${params.p}${Utils.objectToQueryString(params)}`
    if (currentUser) {
      url = `${APIManager.baseURL}/me/c_as/${params.p}${Utils.objectToQueryString(params)}`
    }

    let request = new Request(url, APIManager.getConfig());
    fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }


  /**
   * Retrieve one classified advertisement for a given id
   * @param  {Number} id              Id of the classified advertisement
   * @param  {Function} successCallback callback function success to call when API call succeed
   * @param  {Function} errorCallback   callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisement(params, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/c_a/${params.id}?is_admin_part=${params.is_admin_part}`, APIManager.getConfig());

    fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {

        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  /**
   * Create a classified advertisement
   * @param  {Object} params      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static createClassifiedAdvertisement(bodyParams, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/c_a`, APIManager.getConfig());

    fetch(request, {method: 'POST', body: bodyParams}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  /**
   * Update a classified advertisement
   * @param  {Object} bodyParams      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return {[type]}                 [description]
   */
  static updateClassifiedAdvertisement(bodyParams, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/c_a/${bodyParams.get('id')}`, APIManager.getConfig());

    fetch(request, {method: 'POST', body: bodyParams}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  /**
   * Delete a classified advertisement
   * @param  {Number} id              Id of the classified advertisement to delete
   * @param  {Function} successCallback callback function success to call when API call succeed
   * @param  {Function} errorCallback   callback function fail to call when API call failed
   * @return null
   */
  static deleteClassifiedAdvertisement(id, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/c_a/${id}`, APIManager.getConfig());

    fetch(request, {method: 'DELETE'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  static updateStatusClassifiedAdvertisement(id, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/c_a/activate/${id}`, APIManager.getConfig());

    fetch(request, {method: 'POST'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }


  /***
   *       _____ _             ____         _______ _             __  __    
   *      / ___/(_)___ _____  /  _/___    _/_/ ___/(_)___ _____  / / / /___ 
   *      \__ \/ / __ `/ __ \ / // __ \ _/_/ \__ \/ / __ `/ __ \/ / / / __ \
   *     ___/ / / /_/ / / / // // / / //_/  ___/ / / /_/ / / / / /_/ / /_/ /
   *    /____/_/\__, /_/ /_/___/_/ /_/_/   /____/_/\__, /_/ /_/\____/ .___/ 
   *           /____/                             /____/           /_/      
   */
  
  /**
   * Request API to log in user
   * @param  {Object} bodyParams      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static signIn(bodyParams, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/get_token`, APIManager.getConfig());

    fetch(request, { method: 'POST', body: JSON.stringify(bodyParams) }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  /**
   * Requests API to log
   * @param  {Object} bodyParams      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static signUp(bodyParams, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/sign_up`, APIManager.getConfig());

    fetch(request, { method: 'POST', body: JSON.stringify(bodyParams) }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }

  /***
   *       ______      __                        _          
   *      / ____/___ _/ /____  ____ _____  _____(_)__  _____
   *     / /   / __ `/ __/ _ \/ __ `/ __ \/ ___/ / _ \/ ___/
   *    / /___/ /_/ / /_/  __/ /_/ / /_/ / /  / /  __(__  ) 
   *    \____/\__,_/\__/\___/\__, /\____/_/  /_/\___/____/  
   *                        /____/                          
   */
  
  /**
   * Gets all categories for classified advertisements
   * @param  {Boolean} cleaned Indicate if we want cleaned values. Useful for react-select
   * @return {Promise - Object} Results from API
   */
  static getCategories(cleaned = false) {
    let request = new Request(`${APIManager.baseURL}/categories`, APIManager.getConfig());

    return fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (!cleaned) {
        return { options: Utils.mapCategoriesToSelectOptions(data.data.list) };
      }
      return { options: data.data.list };
    }).catch(function(data) {
      return { options: [] };
    });
  }


  static forgotPassword(bodyParams, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/forgot_password`, APIManager.getConfig());

    fetch(request, { method: 'POST', body: JSON.stringify(bodyParams) }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status_code > 210 || !data.success) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    }).catch(function(data) {
      errorCallback(data);
    });
  }


  static getRandomTweet(successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/random_tweet`);

    fetch(request, { method: 'GET' }).then(function(response) {
      return response.json();
    }).then(function(data) {
      successCallback(data);
    }).catch(function(data) {
      errorCallback(data);
    });
  }


  /**
   * Updates Requests config to add at each requests the current user token
   * @return Object
   */
  static getConfig () {
    var headers = new Headers();
    headers.append('X-TOKEN', window.localStorage.getItem('token'));
    APIManager.fetchConfigInit['headers'] = headers;

    return APIManager.fetchConfigInit;
  }
}

APIManager.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'https://dadbo.danyellow.net';

APIManager.header = new Headers();

APIManager.fetchConfigInit = {
  mode: 'cors',
  cache: 'default'
};
