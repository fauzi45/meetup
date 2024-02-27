import classes from './style.module.scss';
import Avatar from '@mui/material/Avatar';

const MeetupMember = ({name, image}) => {
  return (
    <div className={classes.container}>
      <Avatar
        className={classes.menuAvatar}
        src={image}
      />
      <p className={classes.name}>{name}</p>
      <p className={classes.member}>Member</p>
    </div>
  );
};

export default MeetupMember;
