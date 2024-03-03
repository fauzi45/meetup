import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

import Button from '@components/Button';
import classes from './style.module.scss';
import encryptPayload from '@utils/encryptionHelper';
import { RegisterUser } from './action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const intl = useIntl();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = () => {
    if (!username) {
      toast.error('username cannot be empty');
    } else if (!email) {
      toast.error('Email cannot be empty');
    } else if (!password) {
      toast.error('Password cannot be empty');
    } else if (password.length < 8) {
      toast.error('Password minimal 8 character');
    } else if (!isValidEmail(email)) {
      toast.error('Invalid email');
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const payload = {
        username: encryptPayload(username),
        email: encryptPayload(email),
        password: encryptPayload(password),
        confirmPassword: encryptPayload(confirmPassword),
      };
      dispatch(
        RegisterUser(payload, () => {
          toast.success('Register success');
          setUsername('');
          setEmail('');
          setPassword('');
          setconfirmPassword('');
          navigate('/login');
        })
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.containerbox}>
          <div className={classes.title}>
            <FormattedMessage id="app_sign_up" />
          </div>
          <div className={classes.group}>
            <p className={classes.text}>
              <FormattedMessage id="app_username" />
            </p>
            <input
              className={classes.input}
              type="text"
              placeholder={intl.formatMessage({ id: 'app_username' })}
              onChange={(e) => setUsername(e.target.value)}
            />
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
          <div className={classes.group}>
            <p className={classes.text}>
              <FormattedMessage id="app_repeat_password" />
            </p>
            <FormControl className={classes.inputPassword} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-password"><FormattedMessage id="app_profile_change_password_confirm_password" /></InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password confirm visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>
          <Button onClick={onSubmit} text={<FormattedMessage id="app_sign_up" />} />
          <div className={classes.group}>
            <div className={classes.textacc}>
              <p>
                <FormattedMessage id="app_have_acc" />
              </p>
              <p onClick={() => navigate("/login")} className={classes.link}>
                {' '}
                <FormattedMessage id="app_login_here" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
