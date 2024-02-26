import classes from './style.module.scss';
import Avatar from '@mui/material/Avatar';

const MeetupMember = ({name}) => {
  return (
    <div className={classes.container}>
      <Avatar
        className={classes.menuAvatar}
        src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
      />
      <p className={classes.name}>{name}</p>
      <p className={classes.member}>Member</p>
    </div>
  );
};

export default MeetupMember;
