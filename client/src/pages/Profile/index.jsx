import classes from './style.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoxMeetup from '@components/BoxMeetup';
import { createStructuredSelector } from 'reselect';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { useEffect } from 'react';
import { DodeleteMeetup, getMyMeetupAttended, getMyMeetupCreated, getMyProfile, resetMyProfile, updatePassword } from './actions';
import { selectMyMeetupAttended, selectMyMeetupCreated, selectMyProfile } from './selector';
import { formatMonthYear } from '@utils/convertDate';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatDate } from '@utils/convertDate';
import ConfirmationModal from '@components/ConfirmationModal';

const Profile = ({ myProfile, myMeetupCreated, myMeetupAttended }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 325,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    dispatch(resetMyProfile());
    dispatch(getMyProfile());
    if (myProfile?.role === 1) {
      dispatch(getMyMeetupCreated());
    } else {
      dispatch(getMyMeetupAttended());
    }
  }, [dispatch]);

  const showDetail = (id) => {
    navigate(`../meetup/${id}`);
  };

  const handleSubmit = () => {
    if (!currentPassword) {
      toast.error('Current Password cannot be empty');
    } else if (!newPassword) {
      toast.error('New Password cannot be empty');
    } else if (!confirmPassword) {
      toast.error('Confirm Password cannot be empty');
    } else if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password is not same');
    } else {
      const payload = {
        old_password: currentPassword,
        new_password: newPassword,
        new_confirm_password: confirmPassword,
      };
      dispatch(updatePassword(payload, () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOpen(false);
        toast.success('Password changed successfully');
      }));
    }
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const deleteMeetup = (id) => {
    dispatch(DodeleteMeetup(id, () => {
      dispatch(getMyMeetupCreated());
      toast.success('Meetup deleted successfully');
      setIsModalOpen(false);
    }))
  }

  return (
    <div className={classes.container}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" align="center" fontWeight="bold" fontSize={18}>
            <FormattedMessage id="app_profile_change_password" />
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            <FormattedMessage id="app_profile_change_password_description" />
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-current-password"><FormattedMessage id="app_profile_change_password_old_password" /></InputLabel>
            <OutlinedInput
              id="outlined-adornment-current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle current password visibility"
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Current Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-new-password"><FormattedMessage id="app_profile_change_password_new_password" /></InputLabel>
            <OutlinedInput
              id="outlined-adornment-new-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle current password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password"><FormattedMessage id="app_profile_change_password_confirm_password" /></InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle current password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <Button text={<FormattedMessage id="app_meetup_update" />} onClick={handleSubmit} />
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
            src={myProfile?.image_url ? myProfile?.image_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            alt=""
          />
          {myProfile?.role === 1 ? (
            <p className={classes.child}><FormattedMessage id="app_profile_meetup_created" /></p>
          ) : (
            <p className={classes.child}><FormattedMessage id="app_profile_meetup_attended" /></p>
          )}
        </div>
        <div className={classes.contentProfile}>
          <div className={classes.kiri}>
            <p className={classes.name}>{myProfile?.username}</p>
            <div>
              <p className={classes.kiritext}>{myProfile?.bio ? myProfile?.bio : "-"}</p>
            </div>
            <div>
              <p className={classes.kiritext}>
                {' '}
                <LocationOnIcon /> {myProfile?.location ? myProfile?.location : "-"}
              </p>
              <p className={classes.kiritext}>
                <AccessTimeIcon />
                <FormattedMessage id="app_profile_joined" /> {formatMonthYear(myProfile?.createdAt)}
              </p>
            </div>
            <div>
              <p className={classes.kirilink} onClick={() => navigate("/edit-profile")}><FormattedMessage id="app_profile_edit" /></p>
              <p onClick={handleOpen} className={classes.kirilink}>
                <FormattedMessage id="app_profile_change_password" />
              </p>
            </div>
          </div>
          <div className={classes.headerprofileMobile}>
            {myProfile?.role === 1 ? (
              <p className={classes.child}><FormattedMessage id="app_profile_meetup_attended" /></p>
            ) : (
              <p className={classes.child}><FormattedMessage id="app_profile_meetup_attended" /></p>
            )}
          </div>
          <div className={classes.kanan}>
            {myProfile?.role === 1 ? (
              myMeetupCreated && Array.isArray(myMeetupCreated) && myMeetupCreated?.length > 0 ? (
                myMeetupCreated?.map((pos, index) => {
                  const images = JSON.parse(pos?.image);
                  return (
                    <div key={index} className={classes.container}>
                      <div className={classes.kiri}>
                        <p className={classes.title}>{pos?.title}</p>
                        <div
                          className={classes.description}
                          dangerouslySetInnerHTML={{
                            __html: pos?.description?.length > 100 ? pos?.description.substring(0, 100) + '...' : pos?.description,
                          }}
                        />
                        <div className={classes.dateContainer}>
                          <p className={classes.date}>
                            <CalendarTodayIcon fontSize="small" /> {formatDate(pos?.start_date)} - {pos?.start_time.substring(0, 5)} WIB
                          </p>
                        </div>
                        <div className={classes.buttonContainer}>
                          <button onClick={() => showDetail(pos?.id)} className={classes.button}>
                            <FormattedMessage id="app_show_detail" />
                          </button>
                          <EditIcon onClick={() => navigate(`/update-meetup/${pos?.id}`)} className={classes.icon} />
                          <DeleteIcon onClick={() => setIsModalOpen(true)} className={classes.icon} />
                          <ConfirmationModal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={() => deleteMeetup(pos?.id)}
                          />
                        </div>
                      </div>
                      <div className={classes.kanan}>
                        <img className={classes.image} src={images[index].image_url} alt="gambarcontoh" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className={classes.meetupempty}>
                  <FormattedMessage id="app_profile_meetup_created_empty" />
                </p>
              )
            ) :
              (myMeetupAttended && Array.isArray(myMeetupAttended) && myMeetupAttended?.length > 0 ? (
                myMeetupAttended?.map((pos, index) => {
                  const images = JSON.parse(pos?.Meetup?.image);
                  return (
                    <BoxMeetup
                      key={index}
                      onClick={() => showDetail(pos?.Meetup?.id)}
                      title={pos?.Meetup?.title}
                      date={pos?.Meetup?.start_date}
                      time={pos?.Meetup?.start_time}
                      description={pos?.Meetup?.description}
                      image_url={images[index].image_url}
                    />
                  );
                })
              ) : (
                <p className={classes.meetupempty}>
                  <FormattedMessage id="app_profile_meetup_attended_empty" />
                </p>
              ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  myProfile: selectMyProfile,
  myMeetupCreated: selectMyMeetupCreated,
  myMeetupAttended: selectMyMeetupAttended
});

export default connect(mapStateToProps)(Profile);
