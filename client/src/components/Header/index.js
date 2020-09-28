import React from 'react'
import logo from '../../assets/logo.png'
import './styles.scss';

const Header = props => {
    return (
        <div className="header">
          <img src={logo} alt="Pokemon Finder Logo" className="logo"/>
        </div>
    )
}

export default Header