import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import toast, { Toaster } from 'react-hot-toast';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

import encryptPayload from '@utils/encryptionHelper';
import classes from './style.module.scss';
import Button from '@components/Button';
import { doLoginAction } from './actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const onSubmit = () => {
    if (!email || !password) {
      toast.error('Email cannot be empty');
    } else if (!password) {
      toast.error('Password cannot be empty');
    } else if (!isValidEmail(email)) {
      toast.error('Invalid email');
    } else {
      const payload = {
        email: encryptPayload(email),
        password: encryptPayload(password),
      };
      dispatch(doLoginAction(payload, () => navigate('/')));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.containerbox}>
          <div className={classes.title}>
            <FormattedMessage id="app_login" />
          </div>
          <div className={classes.group}>
            <p className={classes.text}>Email</p>
            <input
              className={classes.input}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.group}>
            <p className={classes.text}>
              <FormattedMessage id="app_password" />
            </p>
            <FormControl className={classes.inputPassword} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password"><FormattedMessage id="app_password" /></InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Button onClick={onSubmit} text={<FormattedMessage id="app_login" />} />
          <div className={classes.group}>
            <div className={classes.textacc}>
              <p>
                <FormattedMessage id="app_no_acc" />
              </p>
              <p onClick={() => navigate('/register')} className={classes.link}>
                {' '}
                <FormattedMessage id="app_register_here" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
