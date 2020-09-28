import React from 'react'
import githubButton from '../../assets/open-github.png'
import './styles.scss';

const Footer = props => {
    return (
        <div className="footer">
            <p>Hecho por Sebastian Lopez</p>
            <a href="https://github.com/sebalopezz/pokemon-finder" className="btn-github-wrapper" target="_blank" rel="noopener noreferrer">
                <img src={githubButton} alt="Open on GitHub" className="btn-github" />
            </a>
        </div>
    )
}

export default Footer