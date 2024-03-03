import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

import classes from './style.module.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@components/Button';
import MeetupMember from '@components/MeetupMember';
import { selectToken } from '@containers/Client/selectors';

import {
  addAttendMeetup,
  addCommentMeetup,
  deleteAttendMeetup,
  getCommentMeetup,
  getDetailMeetup,
  getMemberMeetup,
  resetCommentMeetup,
} from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCommentMeetup, selectMeetupDetail, selectMemberMeetup } from './selector';
import toast, { Toaster } from 'react-hot-toast';
import { formatDate } from '@utils/convertDate';
import { selectMyProfile } from '@pages/Profile/selector';
import { getMyProfile } from '@pages/Profile/actions';

const DetailMeetup = ({ meetupDetail, meetupMember, meetupComment, myProfile, token }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(1);
  const [commentsToShow, setCommentsToShow] = useState(5);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setCommentsToShow((prevCount) => prevCount + 5);
  };

  const showLoadMoreButton = meetupComment?.length + 1 > commentsToShow;

  const visibleComments = Array.isArray(meetupComment) ?  meetupComment?.slice(0, commentsToShow) : {};

  const dataToken = token ? jwtDecode(token) : {};

  useEffect(() => {
    dispatch(getDetailMeetup(id, () => navigate('/notfound/error')));
    dispatch(getMemberMeetup(id));
    dispatch(resetCommentMeetup());
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCommentMeetup(id, page));
  }, [dispatch, page]);

  useEffect(() => {
    if (meetupDetail) {
      setData(meetupDetail);
    }
  }, [meetupDetail]);

  useEffect(() => {
    if (meetupDetail && meetupDetail.image && meetupDetail !== 0) {
      try {
        setImage(JSON.parse(meetupDetail.image));
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [meetupDetail]);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === JSON.parse(meetupDetail?.image).length - 1 ? 0 : prevIndex + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? JSON.parse(meetupDetail?.image).length - 1 : prevIndex - 1));
  };
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const addAttend = async (id) => {
    try {
      await dispatch(
        addAttendMeetup(parseInt(id), () => {
          dispatch(getMemberMeetup(id));
          toast.success('Attend success');
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAttend = async (id) => {
    try {
      await dispatch(
        deleteAttendMeetup(parseInt(id), () => {
          dispatch(getMemberMeetup(id));
          toast.success('Attend Canceled success');
        })
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function timeAgo(timestamp) {
    const currentTime = new Date();
    const commentTime = new Date(timestamp);
    const difference = currentTime - commentTime;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));

    if (hours >= 24) {
      return (
        <>
          {Math.floor(hours / 24)} <FormattedMessage id="app_detail_meetup_comment_days_ago" />
        </>
      );
    } else if (hours >= 1) {
      return (
        <>
          {hours} <FormattedMessage id="app_detail_meetup_comment_hours_ago" />
        </>
      );
    } else if (minutes >= 1) {
      return (
        <>
          {minutes} <FormattedMessage id="app_detail_meetup_comment_minutes_ago" />
        </>
      );
    } else {
      return <FormattedMessage id="app_detail_meetup_comment_seconds_ago" />;
    }
  }

  const sendComment = async () => {
    try {
      const payload = {
        content: comment,
      };
      await dispatch(
        addCommentMeetup(meetupDetail?.id, payload, () => {
          dispatch(resetCommentMeetup());
          dispatch(getCommentMeetup(id));
          setPage(1);
          setCommentsToShow(5);
        })
      );
      setComment('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMap = () => {
    if (meetupDetail && meetupDetail?.lat && meetupDetail?.long) {
      const mapUrl = `https://www.google.com/maps?q=${meetupDetail?.lat},${meetupDetail?.long}`;
      window.open(mapUrl, '_blank');
    } else {
      console.error('Data latitude atau longitude tidak tersedia');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.carouselContainer}>
          <div className={classes.carousel}>
            <button onClick={prevSlide} className={classes.carousel__btn_prev}>
              &lt;
            </button>
            <img src={image[activeIndex]?.image_url} alt={`Slide ${activeIndex}`} className={classes.carousel__img} />
            <button onClick={nextSlide} className={classes.carousel__btn_next}>
              &gt;
            </button>
            <div className={classes.indicators}>
              {meetupDetail &&
                meetupDetail?.image &&
                JSON.parse(meetupDetail?.image)?.map((_, index) => (
                  <span
                    key={index}
                    className={`${classes.indicator} ${activeIndex === index ? classes.active : ''}`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
            </div>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.kiri}>
            <div className={classes.detail}>
              <p className={classes.title}>{data?.title}</p>
              <p className={classes.category}>{data?.Category?.name}</p>
              <div className={classes.description} dangerouslySetInnerHTML={{ __html: data?.description }} />
            </div>
            <div className={classes.member}>
              <p className={classes.title}>
                <FormattedMessage id="app_detail_meetup_member" /> ({meetupMember ? meetupMember?.length : 0}/
                {meetupDetail?.capacity})
              </p>
              <div className={classes.organizer}>
                <Avatar className={classes.menuAvatar} src={meetupDetail?.User?.image_url} />
                <div className={classes.organizercontent}>
                  <p className={classes.organizertitle}>
                    <FormattedMessage id="app_detail_meetup_organizer" />
                  </p>
                  <p className={classes.organizername}>{data?.User?.username}</p>
                </div>
              </div>
              {!meetupMember ? (
                <p className={classes.membernotfound}>
                  <FormattedMessage id="app_detai_meetup_member_notfound" />
                </p>
              ) : (
                <div className={classes.organizermember}>
                  {meetupMember && meetupMember?.length > 0 &&
                  meetupMember.slice(0, 3).map((name, index) => (
                    <MeetupMember key={index} image={name?.User?.image_url} name={name?.User?.username} />
                  ))}
                  {meetupMember?.length > 3 && (
                    <div className={classes.container}>
                      <Avatar className={classes.menuAvatar} />
                      <p className={classes.name}>
                        +{meetupMember?.length - 3} <FormattedMessage id="app_detail_meetup_member_more" />
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={classes.comment}>
              <p className={classes.title}>
                <FormattedMessage id="app_detail_meetup_comment" />
              </p>
              <div className={classes.mycomment}>
                <Avatar
                  className={classes.menuAvatar}
                  src={myProfile?.image_url}
                />
                <div className={classes.inputContainer}>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={classes.inputcomment}
                    type="text"
                    placeholder={intl.formatMessage({ id: 'app_detail_meetup_comment_placeholder' })}
                  />
                  <button onClick={sendComment} className={classes.sendButton}>
                    <FormattedMessage id="app_detail_meetup_comment_send" />
                  </button>
                </div>
              </div>
              {Array.isArray(visibleComments) && 
              visibleComments.map((comment, index) => (
                <div className={classes.publicComment} key={index}>
                  <Avatar className={classes.menuAvatar} src={comment?.User?.image_url} />
                  <div className={classes.publicontainer}>
                    <div className={classes.header}>
                      <p className={classes.publicname}>{comment?.User?.username}</p>
                      <p className={classes.time}>{timeAgo(comment?.createdAt)}</p>
                    </div>
                    <p className={classes.publiccontent}>{comment?.content}</p>
                  </div>
                </div>
              ))}
              {showLoadMoreButton && <Button onClick={handleLoadMore} text={<FormattedMessage id="app_load_more" />} />}
            </div>
          </div>
          <div className={classes.kanan}>
            <div className={classes.when}>
              {meetupDetail?.organizer_id === dataToken?.id ? (
                ''
              ) : dataToken?.id === 1 ? (
                ''
              ) : meetupMember && meetupMember?.length > 0 && meetupMember?.some((m) => m.user_id === dataToken?.id) ? (
                <Button
                  onClick={() => handleDeleteAttend(id)}
                  text={<FormattedMessage id="app_detai_meetup_attended" />}
                />
              ) : (
                <Button onClick={() => addAttend(id)} text={<FormattedMessage id="app_detai_meetup_attend" />} />
              )}
              <p className={classes.title}>
                <FormattedMessage id="app_detail_meetup_when" />
              </p>
              <p className={classes.date}>
                {formatDate(data?.start_date)} at {data && data?.start_time && data?.start_time.substring(0, 5)}
              </p>
              <p className={classes.to}>
                <FormattedMessage id="app_detail_meetup_to" />
              </p>
              <p className={classes.date}>
                {formatDate(data?.finish_date)} at {data && data?.finish_time && data?.finish_time.substring(0, 5)}
              </p>
            </div>
            <div className={classes.where}>
              <p className={classes.title}>
                <FormattedMessage id="app_detail_meetup_where" />
              </p>
              <p onClick={handleMap} className={classes.location}>
                {data?.place}
              </p>
              <p className={classes.fulladdress}>{data?.full_address}</p>
              {meetupDetail && meetupDetail.lat && meetupDetail.long && (
                <div onClick={handleMap}>
                  <MapContainer
                    key={`${meetupDetail.lat}-${meetupDetail.long}`}
                    className={classes.maps}
                    center={[meetupDetail.lat, meetupDetail.long]}
                    zoom={15}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[meetupDetail.lat, meetupDetail.long]} />
                  </MapContainer>
                </div>
              )}
            </div>
            <div className={classes.commentMobile}>
              <p className={classes.title}>
                <FormattedMessage id="app_detail_meetup_comment" />
              </p>
              <div className={classes.mycomment}>
                <Avatar
                  className={classes.menuAvatar}
                  src={myProfile?.image_url}
                />
                <div className={classes.inputContainer}>
                  <input
                    className={classes.inputcomment}
                    type="text"
                    placeholder={intl.formatMessage({ id: 'app_detail_meetup_comment_placeholder' })}
                  />
                  <button className={classes.sendButton}>
                    <FormattedMessage id="app_detail_meetup_comment_send" />
                  </button>
                </div>
              </div>
              {Array.isArray(visibleComments) &&  visibleComments?.map((comment, index) => (
                <div className={classes.publicComment} key={index}>
                  <Avatar className={classes.menuAvatar} src={comment?.User?.image_url} />
                  <div className={classes.publicontainer}>
                    <div className={classes.header}>
                      <p className={classes.publicname}>{comment?.User?.username}</p>
                      <p className={classes.time}>{timeAgo(comment?.createdAt)}</p>
                    </div>
                    <p className={classes.publiccontent}>{comment?.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

DetailMeetup.propTypes = {
  meetupDetail: PropTypes.object,
  meetupMember: PropTypes.array,
  meetupComment: PropTypes.array,
  myProfile: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  meetupDetail: selectMeetupDetail,
  meetupMember: selectMemberMeetup,
  meetupComment: selectCommentMeetup,
  myProfile: selectMyProfile,
  token: selectToken,
});

export default connect(mapStateToProps)(DetailMeetup);
