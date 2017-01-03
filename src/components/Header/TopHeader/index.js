import React, { Component } from 'react';
import { Link } from 'react-router';

import Utils from '../../../utils/Utils'

import './style.scss';

class TopHeader extends Component {
  _renderLoggedContent() {
    return (
      <ul>
          <li className='home'><Link onlyActiveOnIndex={false} to={ 'classified_advertisements' } activeClassName='active'>Accueil</Link></li>

          { Utils.isTokenValid() && <li><Link onlyActiveOnIndex={false} to={ 'admin/classified_advertisements/1' } activeClassName='active'>Mes annonces</Link></li> }

          { Utils.isTokenValid() && <li><Link to={ 'classified_advertisement/create' } activeClassName='active'>Publier une annonce</Link></li> }

          { !Utils.isTokenValid() && <li><Link to={ 'signin' } activeClassName='active'>Se connecter</Link></li> }
          { !Utils.isTokenValid() && <li><Link to={ 'signup' } activeClassName='active'>S'inscrire</Link></li> }

          { Utils.isTokenValid() && <li><Link className='logout' to={{ pathname: 'classified_advertisements', state: { logged_out: true } }}>Se déconnecter</Link></li> }
      </ul>
    )
  }

  render() {
    return (
      <nav className='navigation'>
        { this._renderLoggedContent() }
      </nav>
    );
  }
}

export default TopHeader;
