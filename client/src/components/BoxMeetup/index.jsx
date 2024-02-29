import { formatDate } from '@utils/convertDate';
import classes from './style.module.scss';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FormattedMessage } from 'react-intl';

const BoxMeetup = ({ title, description, date, image_url, time, onClick }) => {
  return (
    <div className={classes.container}>
      <div className={classes.kiri}>
        <p className={classes.title}>{title}</p>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{
            __html: description?.length > 100 ? description.substring(0, 100) + '...' : description,
          }}
        />
        <div className={classes.dateContainer}>
          <p className={classes.date}>
            <CalendarTodayIcon fontSize="small" /> {formatDate(date)} - {time.substring(0, 5)} WIB
          </p>
        </div>
        <button onClick={onClick} className={classes.button}>
          <FormattedMessage id="app_show_detail" />
        </button>
      </div>
      <div className={classes.kanan}>
        <img className={classes.image} src={image_url} alt="gambarcontoh" />
      </div>
    </div>
  );
};

export default BoxMeetup;
