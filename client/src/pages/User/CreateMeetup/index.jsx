import Button from '@components/Button';
import classes from './style.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import Jumbotron from '@components/Jumbotron';
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { createStructuredSelector } from 'reselect';
import './react-leaflet-geosearch.css';
import { useDispatch, connect } from 'react-redux';
import { addNewMeetup, deleteImages, setLocation, updateMeetup } from './action';
import { selectLocationMeetup } from './selector';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailMeetup, resetCommentMeetup } from '../DetailMeetup/actions';
import { selectMeetupDetail } from '../DetailMeetup/selector';
import { selectCategory } from '@pages/Category/selector';

const provider = new OpenStreetMapProvider();
const searchControl = new SearchControl({
  provider: provider,
  style: 'button',
  autoComplete: true,
  autoClose: true,
  maxMarkers: 1,
  keepResult: true,
  notFoundMessage: 'Sorry, that address could not be found.',
});

const SearchField = ({ searchControl }) => {
  const dispatch = useDispatch();
  const map = useMap();
  const markerRef = useRef(null); // Declare marker using useRef

  map.addControl(searchControl);

  map.on('geosearch/showlocation', function (e) {
    dispatch(setLocation(e.location));
  });

  map.on('click', function (e) {
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }
    markerRef.current = L.marker(e.latlng).addTo(map); // Update marker using useRef
    dispatch(setLocation({ x: e.latlng.lat, y: e.latlng.lng }));
  });

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, []);
};

const CreateMeetup = ({ meetupLocation, meetupDetail, listCategory }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [image, setImage] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    place: '',
    full_address: '',
    start_date: '',
    finish_date: '',
    start_time: '',
    finish_time: '',
    capacity: '',
    lat: '',
    long: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getDetailMeetup(id, () => navigate('/notfound/error')));
    } else {
      dispatch(resetCommentMeetup());
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFormData({
        title: meetupDetail?.title,
        description: meetupDetail?.description,
        category_id: meetupDetail?.category_id,
        place: meetupDetail?.place,
        full_address: meetupDetail?.full_address,
        lat: meetupDetail?.lat,
        long: meetupDetail?.long,
        start_date: meetupDetail?.start_date,
        finish_date: meetupDetail?.finish_date,
        start_time: meetupDetail?.start_time,
        finish_time: meetupDetail?.finish_time,
        capacity: meetupDetail?.capacity,
      });
      setImage(JSON.parse(meetupDetail?.image));
    } else {
      setFormData({
        title: '',
        description: '',
        category_id: '',
        place: '',
        full_address: '',
        start_date: '',
        finish_date: '',
        start_time: '',
        finish_time: '',
        capacity: '',
      });
    }
  }, [meetupDetail]);

  useEffect(() => {
    dispatch(setLocation(null));
  }, []);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function onDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    setImage((prevImages) => [...prevImages, ...files]);
  }
  function onFileSelect(e) {
    const files = e.target.files;
    setImage((prevImages) => [...prevImages, ...files]);
  }

  function deleteImage(index) {
    let filteredImage;
    if (id) {
      dispatch(
        deleteImages(id, payload, () => {
          dispatch(getDetailMeetup(id));
        })
      );
    } else {
      const imageArray = Array.from(image);
      const filtered = imageArray.filter((_, i) => i !== index);
      setImage(filtered);
    }
  }

  const submitData = () => {
    if (!formData.title) {
      toast.error('The Title cannot be empty');
    } else if (!formData.description) {
      toast.error('The Description cannot be empty');
    } else if (!formData.category_id) {
      toast.error('The Category cannot be empty');
    } else if (!formData.full_address) {
      toast.error('The Address cannot be empty');
    } else if (!meetupLocation?.x) {
      toast.error('The Maps must be selected');
    } else if (!formData.place) {
      toast.error('The Place cannot be empty');
    } else if (!formData.start_date) {
      toast.error('The Start Date cannot be empty');
    } else if (!formData.finish_date) {
      toast.error('The Finish Date cannot be empty');
    } else if (!formData.start_time) {
      toast.error('The Start Time cannot be empty');
    } else if (!formData.finish_time) {
      toast.error('The Finish Date cannot be empty');
    } else if (!formData.capacity) {
      toast.error('The Capacity cannot be empty');
    } else if (formData.capacity < 2) {
      toast.error('capacity must be greater than 1');
    } else if (!image) {
      toast.error('The Image cannot be empty');
    } else {
      const formDataSend = new FormData();
      formDataSend.append('title', formData.title);
      formDataSend.append('description', formData.description);
      formDataSend.append('category_id', formData.category_id);
      formDataSend.append('full_address', formData.full_address);
      formDataSend.append('lat', meetupLocation?.x);
      formDataSend.append('long', meetupLocation?.y);
      formDataSend.append('place', formData.place);
      formDataSend.append('start_date', formData.start_date);
      formDataSend.append('finish_date', formData.finish_date);
      formDataSend.append('start_time', formData.start_time);
      formDataSend.append('finish_time', formData.finish_time);
      formDataSend.append('capacity', formData.capacity);
      Array.from(image).forEach((file, index) => {
        formDataSend.append(`image`, file);
      });
      if (id) {
        dispatch(
          updateMeetup(id, formDataSend, () => {
            navigate('/my-profile');
          })
        );
      } else {
        dispatch(
          addNewMeetup(formDataSend, () => {
            toast.success('Meetup Successfully created');
            navigate('/');
          })
        );
      }
    }
  };
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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_description" />
        </div>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e })}
          className={classes.inputDesc}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_category" />
        </div>
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          className={classes.inputTitle}
        >
          <option value="" hidden>
            Pilih kategori
          </option>
          {listCategory?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_location" />
        </div>
        <MapContainer className={classes.maps} center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
          <SearchField searchControl={searchControl} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {meetupDetail?.lat && meetupDetail?.long && <Marker position={[meetupDetail?.lat, meetupDetail?.long]} />}
        </MapContainer>
        <br />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_place" />
        </div>
        <input
          placeholder={intl.formatMessage({ id: 'app_create_meetup_place' })}
          type="text"
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
          value={formData.place}
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_fullAddress" />
        </div>
        <input
          placeholder={intl.formatMessage({ id: 'app_create_meetup_fullAddress' })}
          type="text"
          onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
          value={formData.full_address}
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_when" />
        </div>
        <div className={classes.date}>
          <input
            type="date"
            className={classes.inputDate}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            value={formData.start_date}
          />
          <input
            type="time"
            className={classes.inputDate}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            value={formData.start_time}
          />
          <p className={classes.to}>
            <FormattedMessage id="app_create_meetup_to" />
          </p>
          <input
            type="date"
            className={classes.inputDate}
            onChange={(e) => setFormData({ ...formData, finish_date: e.target.value })}
            value={formData.finish_date}
          />
          <input
            type="time"
            className={classes.inputDate}
            onChange={(e) => setFormData({ ...formData, finish_time: e.target.value })}
            value={formData.finish_time}
          />
        </div>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_capacity" />
        </div>
        <input
          type="number"
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          value={formData.capacity}
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_upload_image" />
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <p className={classes.title}>
              <FormattedMessage id="app_create_meetup_drag_drop" />
            </p>
          </div>
          <div className={classes.dragArea} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            {isDragging ? (
              <span className={classes.select}>
                <FormattedMessage id="app_create_meetup_drop" />
              </span>
            ) : (
              <>
                <FormattedMessage id="app_create_meetup_drag_drop_or" /> {''}
                <span className={classes.select} role="button" onClick={selectFiles}>
                  <FormattedMessage id="app_create_meetup_browse" />
                </span>
              </>
            )}
            <input
              type="file"
              name="file"
              className={classes.file}
              multiple
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/*"
            />
          </div>
          <div className={classes.container}>
            {Array.isArray(image) &&
              image?.map((imageData, index) => (
                <div className={classes.image} key={index}>
                  <span className={classes.delete} onClick={() => deleteImage(index)}>
                    &times;
                  </span>
                  <img
                    src={
                      meetupDetail
                        ? imageData.image_url || URL.createObjectURL(imageData)
                        : URL.createObjectURL(imageData)
                    }
                    alt={imageData.name}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={classes.post}>
          <Button onClick={submitData} text={'Simpan'} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  meetupLocation: selectLocationMeetup,
  meetupDetail: selectMeetupDetail,
  listCategory: selectCategory,
});

export default connect(mapStateToProps)(CreateMeetup);
