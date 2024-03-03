import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { setLocale, setTheme } from '@containers/App/actions';
import { jwtDecode } from 'jwt-decode';
import classes from './style.module.scss';
import { selectMyProfile } from '@pages/Profile/selector';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectToken } from '@containers/Client/selectors';

const Navbar = ({ title, locale, theme, myProfile, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const [menuProfile, setMenuProfile] = useState(null);
  const openProfile = Boolean(menuProfile);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleClickProfile = (event) => {
    setMenuProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setMenuProfile(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate("/my-profile");
  }

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setLogin(false));
  }

  const dataToken = token ? jwtDecode(token) : {};

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <div className={classes.title}>Meetup</div>
        </div>
        <div className={classes.toolbar}>
          <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div>
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          {token ? <div className={classes.toggle} onClick={handleClickProfile}>
            <Avatar className={classes.avatar} src={myProfile?.image_url} />
            <div className={classes.name}>{myProfile?.username}</div>
          </div> : ""}

        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
        <Menu open={openProfile} anchorEl={menuProfile} onClose={handleCloseProfile}>
          <MenuItem className={classes.menuitem} onClick={() => handleProfile()} selected={locale === 'id'}>
            <div className={classes.menu}>
              <div className={classes.menuLang}>
                <FormattedMessage id="app_profile_my" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => handleLogout()} selected={locale === 'id'}>
            <div className={classes.menu}>
              <div className={classes.menuLang}>
                <FormattedMessage id="app_profile_logout" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  myProfile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  myProfile: selectMyProfile,
  token: selectToken,
});

export default connect(mapStateToProps)(Navbar);
