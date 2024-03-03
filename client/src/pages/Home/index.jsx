import { FormattedMessage } from 'react-intl';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useDispatch, connect } from 'react-redux';
import MarkerClusterGroup from 'react-leaflet-cluster';

import classes from './style.module.scss';
import BoxMeetup from '@components/BoxMeetup';
import { createStructuredSelector } from 'reselect';
import { getMeetup, getMeetupByCategory, getMeetupByDate, resetMeetup } from './actions';
import { useEffect } from 'react';
import { selectMeetup } from './selectors';
import { useNavigate } from 'react-router-dom';
import { getCategory } from '@pages/Category/actions';
import { selectCategory } from '@pages/Category/selector';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@components/Button';
import { getMyProfile, resetMyProfile } from '@pages/Profile/actions';

const Home = ({ meetup, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('');
  const [date, setDate] = useState();

  useEffect(() => {
    dispatch(resetMyProfile());
    dispatch(getMyProfile());
    dispatch(resetMeetup());
    dispatch(getMeetup());
    dispatch(getCategory());
  }, [dispatch]);

  const showDetail = (id) => {
    navigate(`meetup/${id}`);
  };

  const handleActive = (value) => {
    setActiveCategory(value);
    dispatch(getMeetupByCategory(value));
  };

  const handleDate = (value) => {
    dispatch(getMeetupByDate(value));
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}>
          <FormattedMessage id="app_home_title" />
        </p>
        <MapContainer
          className={classes.maps}
          center={[-3.162455530237848, 119.87953278381451]}
          zoom={4}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading>
            {meetup &&
              Array.isArray(meetup) &&
              meetup?.map((pos, index) => {
                const images = JSON.parse(pos?.image);
                return (
                  <Marker key={index} position={[parseFloat(pos.lat), parseFloat(pos.long)]}>
                    <Popup>
                      <p className={classes.title}>{pos?.title}</p>
                      <div
                        className={classes.description}
                        dangerouslySetInnerHTML={{
                          __html:
                            pos?.description?.length > 100
                              ? pos?.description?.substring(0, 50) + '...'
                              : pos?.description,
                        }}
                      />
                      <p className={classes.organizer}>
                        <FormattedMessage id="app_organized_by" />: {pos?.User?.username}
                      </p>
                      <img className={classes.image} alt="gambarcontoh" src={images[index]?.image_url} />
                      <div className={classes.buttonContainer}>
                        <p className={classes.button} onClick={() => showDetail(pos?.id)}>
                          {' '}
                          <FormattedMessage id="app_show_detail" />
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
        </MapContainer>
        <div className={classes.box}>
          <div className={classes.dateContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker label={<FormattedMessage id="app_meetup_select_date" />} value={date} onChange={(newValue) => setDate(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
            <Button text={<FormattedMessage id="app_meetup_submit" />} onClick={() => handleDate(date)} />
          </div>
          <div className={classes.category}>
            {category &&
              Array.isArray(category) && category?.map((categories, index) => (
                <div
                  key={index}
                  onClick={() => handleActive(categories?.name)}
                  className={activeCategory === categories?.name ? classes.active : classes.button}
                >
                  {categories?.name}
                </div>
              ))}
          </div>
          <div className={classes.boxwrapper}>
            {meetup && Array.isArray(meetup) && meetup.length > 0 ? (
              meetup?.map((pos, index) => {
                const images = JSON.parse(pos?.image);
                return (
                  <BoxMeetup
                    key={index}
                    onClick={() => showDetail(pos?.id)}
                    title={pos?.title}
                    date={pos?.start_date}
                    time={pos?.start_time}
                    description={pos?.description}
                    image_url={images[index]?.image_url}
                  />
                );
              })
            ) : (
              <p className={classes.meetupempty}>
                <FormattedMessage id="app_meetup_empty" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  meetup: selectMeetup,
  category: selectCategory,
});

export default connect(mapStateToProps)(Home);
