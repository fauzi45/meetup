import { FormattedMessage } from 'react-intl';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useDispatch, connect } from 'react-redux';
import MarkerClusterGroup from 'react-leaflet-cluster';

import classes from './style.module.scss';
import BoxMeetup from '@components/BoxMeetup';
import { createStructuredSelector } from 'reselect';
import { getMeetup } from './actions';
import { useEffect } from 'react';
import { selectMeetup } from './selectors';
import { useNavigate } from 'react-router-dom';
const Home = ({ meetup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMeetup());
  }, [dispatch]);

  const showDetail = (id) => {
    navigate(`meetup/${id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}>Find Meetup Around Indonesia</p>
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
            {meetup && Array.isArray(meetup) && meetup?.map((pos, index) => {
              const images = JSON.parse(pos?.image);
              return (
                <Marker key={index} position={[parseFloat(pos.lat), parseFloat(pos.long)]} >
                  <Popup>
                    <p className={classes.title}>{pos?.title}</p>
                    <p className={classes.organizer}>{pos?.User?.username}</p>
                    <p className={classes.organizer}>{pos?.User?.username}</p>
                    <img
                      className={classes.image}
                      alt="gambarcontoh"
                      src={images[index].image_url}
                    />
                    <div className={classes.buttonContainer}>
                      <p className={classes.button} onClick={() => showDetail(pos?.id)} >Show Detail</p>
                    </div>
                  </Popup>
                </Marker>
              );
            }
            )}
          </MarkerClusterGroup>
        </MapContainer>
        <div className={classes.box}>
          <div className={classes.boxwrapper}>
            {meetup?.map((pos, index) => {
              const images = JSON.parse(pos?.image);
              return (
                <BoxMeetup key={index} onClick={() => showDetail(pos?.id)} title={pos?.title} date={pos?.start_date} time={pos?.start_time} description={pos?.description} image_url={images[index].image_url} />
              )
            })}
          </div>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = createStructuredSelector({
  meetup: selectMeetup,
});

export default connect(mapStateToProps)(Home);
