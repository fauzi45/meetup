import classes from './style.module.scss';
import Avatar from '@mui/material/Avatar';
import { FormattedMessage } from 'react-intl';

const MeetupMember = ({name, image}) => {
  return (
    <div className={classes.container}>
      <Avatar
        className={classes.menuAvatar}
        src={image}
      />
      <p className={classes.name}>{name}</p>
      <p className={classes.member}><FormattedMessage id="app_detail_meetup_member" /></p>
    </div>
  );
};

export default MeetupMember;
