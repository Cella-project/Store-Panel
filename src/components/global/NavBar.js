import React from 'react';
import { Link } from 'react-router-dom';
import LangMenu from '../common/LangMenu';
import logo from '../../assets/images/mint-logo.png';
import darkLogo from '../../assets/images/white-logo.png';
import Canvas from '../common/Canvas';
import { useSelector } from 'react-redux';
import './NavBar.scss';
import languages from './languages';

const NavBar = ({ menuToggle }) => {
  const userData = useSelector(state => state.auth.userData)
  const mode = useSelector(state => state.theme.mode);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  // Extract the first name from the user data
  const firstName = userData.owner.name.split(' ')[0];

  return (
    <div className={`nav-bar ${mode === 'dark-mode' ? 'dark' : ''} full-width`}>
      <div className='nav-bar--cont full-width white-bg flex-row-between'>
        <Link to={'/'} className='home-link'>
          <img src={mode === 'dark-mode' ? darkLogo : logo} alt='ACTORE' className='nav-bar--logo pointer' />
        </Link>
        <i className={`nav-bar--btn bi bi-list ${mode === 'dark-mode' ? 'gray' : 'orange'} size-38px pointer`} onClick={menuToggle.bind(null, true)}></i>
        <div className='flex-row-center'>
          <LangMenu />
          <div className='nav-bar--card flex-row-center radius-15px margin-6px-H white-bg shadow-2px pointer'>
            <i className={`bi bi-bell ${mode === 'dark-mode' ? 'gray' : 'orange'} size-22px`} />
            <div className={`nav-bar--card--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translations.notification}
            </div>
          </div>
          <Link to={'/profile'}>
            <div className='nav-bar--card flex-row-center white-bg radius-15px margin-6px-H shadow-2px pointer'>
              <div className='nav-bar--card--img flex-row-center radius-circular'>
                <Canvas name={userData.owner.name} borderRadius='50%' width={50} height={50} fontSize={'28px'} /> :
              </div>
              <p className={`nav-bar--card--content space-none inter ${mode === 'dark-mode' ? 'gray' : 'orange'} margin-4px-H size-12px`}>{translations.hi}, {firstName}</p>
              <div className={`nav-bar--card--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                {translations.profile}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
