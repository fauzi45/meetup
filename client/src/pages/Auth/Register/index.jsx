import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';

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
            <input
              className={classes.input}
              type="password"
              placeholder={intl.formatMessage({ id: 'app_password' })}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.group}>
            <p className={classes.text}>
              <FormattedMessage id="app_repeat_password" />
            </p>
            <input
              className={classes.input}
              type="password"
              placeholder={intl.formatMessage({ id: 'app_repeat_password' })}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <Button onClick={onSubmit} text={<FormattedMessage id="app_sign_up" />} />
          <div className={classes.group}>
            <div className={classes.textacc}>
              <p>
                <FormattedMessage id="app_no_acc" />
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
