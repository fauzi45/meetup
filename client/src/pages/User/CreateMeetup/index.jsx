import Button from '@components/Button';
import classes from './style.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import Jumbotron from '@components/Jumbotron';
import { useMap, MapContainer, TileLayer } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { createStructuredSelector } from 'reselect';
import './react-leaflet-geosearch.css';
import { useDispatch, connect } from 'react-redux';
import { addNewMeetup, setLocation } from './action';
import { selectLocationMeetup } from './selector';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const provider = new OpenStreetMapProvider();
const searchControl = new SearchControl({
  provider: provider,
  style: 'button',
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

  map.on("click", function (e) {
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

const CreateMeetup = ({ meetupLocation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    full_address: '',
    start_date: '',
    finish_date: '',
    start_time: '',
    finish_time: '',
    capacity: '',
  });

  useEffect(() => {
    dispatch(setLocation(null));
  }, []);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function onDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    setImage([...image, ...files]);
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          }
        ]);
      }
    }
  }
  function onFileSelect(e) {
    const files = e.target.files;
    setImage(files);
    if (files.length === 0) return 0;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          }
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    const imageArray = Array.from(image); // Convert FileList to an array
    const filtered = imageArray.filter((_, i) => i !== index);
    setImage(filtered);
  }

  console.log(image)
  const submitData = () => {
    if (!formData.title) {
      toast.error('The Title cannot be empty');
    } else if (!formData.description) {
      toast.error('The Description cannot be empty');
    } else if (!formData.category_id) {
      toast.error('The Category cannot be empty');
    } else if (!formData.full_address) {
      toast.error('The Address cannot be empty');
    } else if (!meetupLocation) {
      toast.error('The Maps must be selected');
    } else if (!formData.start_date) {
      toast.error('The Start Date cannot be empty');
    }else if (!formData.finish_date) {
      toast.error('The Finish Date cannot be empty');
    }else if (!formData.start_time) {
      toast.error('The Start Time cannot be empty');
    }else if (!formData.finish_time) {
      toast.error('The Finish Date cannot be empty');
    }else if (!formData.capacity) {
      toast.error('The Capacity cannot be empty');
    }else if (!image) {
      toast.error('The Image cannot be empty');
    } else {
      const formDataSend = new FormData();
      formDataSend.append('title', formData.title);
      formDataSend.append('description', formData.description);
      formDataSend.append('category_id', formData.category_id);
      formDataSend.append('full_address', formData.full_address);
      formDataSend.append('lat', meetupLocation.x);
      formDataSend.append('long', meetupLocation.y);
      formDataSend.append('start_date', formData.start_date);
      formDataSend.append('finish_date', formData.finish_date);
      formDataSend.append('start_time', formData.start_time);
      formDataSend.append('finish_time', formData.finish_time);
      formDataSend.append('capacity', formData.capacity);
      Array.from(image).forEach((file, index) => {
        formDataSend.append(`image`, file);
      });
      dispatch(addNewMeetup(formDataSend, () => {
        toast.success('Meetup Successfully created');
        navigate('/');
      }));
    }
  }

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
        <textarea
          placeholder={intl.formatMessage({ id: 'app_create_meetup_description_placeholder' })}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          value={formData.description}
          className={classes.inputDesc}
        ></textarea>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_category" />
        </div>
        <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className={classes.inputTitle}>
          <option value="1">Hiking</option>
          <option value="1">Internet</option>
        </select>
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_location" />
        </div>
        <MapContainer className={classes.maps} center={[51.505, -0.09]} zoom={15} scrollWheelZoom={false}>
          <SearchField searchControl={searchControl} />
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
          onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
          value={formData.full_address}
          className={classes.inputTitle}
        />
        <div className={classes.subTitle}>
          <FormattedMessage id="app_create_meetup_when" />
        </div>
        <div className={classes.date}>
          <input type="date" className={classes.inputDate} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} value={formData.start_date} />
          <input type="time" className={classes.inputDate} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} value={formData.start_time} />
          <p className={classes.to}><FormattedMessage id="app_create_meetup_to" /></p>
          <input type="date" className={classes.inputDate} onChange={(e) => setFormData({ ...formData, finish_date: e.target.value })} value={formData.finish_date} />
          <input type="time" className={classes.inputDate} onChange={(e) => setFormData({ ...formData, finish_time: e.target.value })} value={formData.finish_time} />
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
            <p className={classes.title}><FormattedMessage id="app_create_meetup_drag_drop" /></p>
          </div>
          <div className={classes.dragArea} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            {isDragging ? (
              <span className={classes.select}>
                <FormattedMessage id="app_create_meetup_drop" />
              </span>
            ) : (
              <>
                <FormattedMessage id="app_create_meetup_drag_drop_or" /> {""}
                <span className={classes.select} role='button' onClick={selectFiles}><FormattedMessage id="app_create_meetup_browse" /></span>
              </>)
            }
            <input type="file" name='file' className={classes.file} multiple ref={fileInputRef} onChange={onFileSelect} accept="image/*" />
          </div>
          <div className={classes.container}>
            {images.map((image, index) => (
              <div className={classes.image} key={index}>
                <span className={classes.delete} onClick={() => deleteImage(index)}>&times;</span>
                <img src={image.url} alt={image.name} />
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
});

export default connect(mapStateToProps)(CreateMeetup);
