import Button from '@components/Button';
import classes from './style.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import Jumbotron from '@components/Jumbotron';
import { useMap, MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { createStructuredSelector } from 'reselect';
import './react-leaflet-geosearch.css';
import { useDispatch, connect } from 'react-redux';
import { setLocation } from './action';
import { selectLocationMeetup } from './selector';

const SearchField = () => {
  const dispatch = useDispatch();
  const searchControl = new SearchControl({
    provider: new OpenStreetMapProvider(),
    style: 'button',
    notFoundMessage: 'Sorry, that address could not be found.',
  });
  const map = useMap();
  map.locate({ setView: true, maxZoom: 16 });
  map.addControl(searchControl);
  map.on('geosearch/showlocation', function (e) {
    dispatch(setLocation(e.location));
  });
};

const CreateMeetup = ({ meetupLocation }) => {
  const intl = useIntl();
  return (
    <div className={classes.container}>
      <Jumbotron />
      <div className={classes.containercontent}>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_title" />
        </div>
        <input
          placeholder={intl.formatMessage({ id: 'app_create_meetup_title_placeholder' })}
          type="text"
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_description" />
        </div>
        <textarea
          placeholder={intl.formatMessage({ id: 'app_create_meetup_description_placeholder' })}
          className={classes.inputDesc}
        ></textarea>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_category" />
        </div>
        <select className={classes.inputTitle}>
          <option value="Hiking">Hiking</option>
        </select>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_location" />
        </div>

        <MapContainer className={classes.maps} center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
          <SearchField />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <br />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_fullAddress" />
        </div>
        <input
          placeholder={intl.formatMessage({ id: 'app_create_meetup_fullAddress' })}
          type="text"
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_when" />
        </div>
        <div className={classes.date}>
          <input type="date" className={classes.inputDate} />
          <input type="time" className={classes.inputDate} />
          <p className={classes.to}>To</p>
          <input type="date" className={classes.inputDate} />
          <input type="time" className={classes.inputDate} />
        </div>
        <div className={classes.post}>
          <Button text={'Simpan'} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  meetupLocation: selectLocationMeetup,
});

export default connect(mapStateToProps)(CreateMeetup);
