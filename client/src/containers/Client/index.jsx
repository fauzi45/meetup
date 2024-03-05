import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '@containers/Client/selectors';
import { selectMyProfile } from '@pages/Profile/selector';

const Client = ({ login, children, organizerOnly, myProfile }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    } else if (organizerOnly && myProfile.role !== 1) {
      navigate('/');
    }
  }, [login, organizerOnly, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  children: PropTypes.element,
  myProfile: PropTypes.object,
  organizerOnly: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  myProfile: selectMyProfile,
});

export default connect(mapStateToProps)(Client);
