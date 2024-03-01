import classes from './style.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoxMeetup from '@components/BoxMeetup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={classes.container}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Change Password</p>
            <p>Please fill out this information to change your Account's password</p>
          </div>
        </Box>
      </Modal>
      <div className={classes.wrapper}>
        <img
          className={classes.cover}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className={classes.headerprofile}>
          <img
            className={classes.photoProfile}
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <p className={classes.child}>MEETUP CREATED</p>
          <p className={classes.child}>MEETUP ATTENDED</p>
        </div>
        <div className={classes.contentProfile}>
          <div className={classes.kiri}>
            <p className={classes.name}>Orang Profile</p>
            <div>
              <p className={classes.kiritext}>Saya akan mencertikan keseharian saya di padang</p>
            </div>
            <div>
              <p className={classes.kiritext}>
                {' '}
                <LocationOnIcon /> Padang
              </p>
              <p className={classes.kiritext}>
                <AccessTimeIcon />
                Joined September 2013
              </p>
            </div>
            <div>
              <p className={classes.kirilink} onClick={() => navigate("/edit-profile")}>Edit Profile</p>
              <p onClick={handleOpen} className={classes.kirilink}>
                Change Password
              </p>
            </div>
          </div>
          <div className={classes.headerprofileMobile}>
            <p className={classes.child}>MEETUP CREATED</p>
            <p className={classes.child}>MEETUP ATTENDED</p>
          </div>
          <div className={classes.kanan}>testeses</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
