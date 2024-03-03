import Button from '@components/Button';
import classes from './style.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectMyProfile } from '@pages/Profile/selector';
import { useState } from 'react';
import { useEffect } from 'react';
import { updateMyProfile, updateProfileImage } from './actions';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';
import { getMyProfile } from '@pages/Profile/actions';


const EditProfile = ({ myProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
  });

  useEffect(() => {
    if (myProfile) {
      setFormData({
        username: myProfile?.username,
        bio: myProfile?.bio,
        location: myProfile?.location,
      });
    } else {
      setFormData({
        username: '',
        bio: '',
        location: '',
      });
    }
  }, [myProfile]);


  const handleSubmit = () => {
    const formDataSend = new FormData();
    formDataSend.append('username', formData.username);
    formDataSend.append('bio', formData.bio);
    formDataSend.append('location', formData.location);
    dispatch(
      updateMyProfile(formDataSend, () => {
        navigate('../my-profile');
      })
    );
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const onHandlerImage = (e) => {
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0])
    dispatch(
      updateProfileImage(formData, () => {
        toast.success('Change Profile Picture success');
        dispatch(getMyProfile());
        setImage('');
      })
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}><FormattedMessage id="app_profile_edit_your_profile" /></p>
        <div className={classes.containercontent}>
          <div className={classes.kiri}>
            <div className={classes.kiriContainer}>
              <div className={classes.containerPicture}>
                <img
                  src={myProfile?.image_url ? myProfile?.image_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  className={classes.img}
                  alt=""
                />
                <input type='file' onChange={onHandlerImage} style={{ display: 'none' }} id='file' accept="image/png, image/jpeg" />
                <label htmlFor="file" className={classes.label}><FormattedMessage id="app_profile_choose_photo" /></label>
              </div>
              <p className={classes.name}>{myProfile?.username}</p>
              <p className={classes.location}>
                {' '}
                <LocationOnIcon />
                {myProfile?.location}
              </p>
            </div>
          </div>
          <div className={classes.kanan}>
            <p><FormattedMessage id="app_username" /></p>
            <input value={formData.username} onChange={(e) => setFormData((data) => ({ ...data, username: e.target.value }))}
              className={classes.input} type="text" />
            <p><FormattedMessage id="app_profile_edit_bio" /></p>
            <textarea name="" id="" cols="30" rows="10" value={formData.bio}
              onChange={(e) =>
                setFormData((data) => ({
                  ...data,
                  bio: e.target.value
                }))}
            ></textarea>
            <p><FormattedMessage id="app_profile_location" /></p>
            <input value={formData.location} onChange={(e) => setFormData((data) => ({ ...data, location: e.target.value }))}
              className={classes.input} type="text" />
            <Button onClick={handleSubmit} text={<FormattedMessage id="app_meetup_save" />} />
          </div>
        </div>
      </div>
      <Toaster />
    </div >
  );
};

const mapStateToProps = createStructuredSelector({
  myProfile: selectMyProfile,
});

export default connect(mapStateToProps)(EditProfile);
