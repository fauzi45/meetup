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

import { addAttendMeetup, deleteAttendMeetup, getDetailMeetup, getMemberMeetup } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectMeetupDetail, selectMemberMeetup } from './selector';
import toast, { Toaster } from 'react-hot-toast';

const DetailMeetup = ({ meetupDetail, meetupMember, token }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const dataToken = jwtDecode(token);
    
    useEffect(() => {
        dispatch(
            getDetailMeetup(id, () => {
                navigate('/notfound/error');
            })
        );
        dispatch(getMemberMeetup(id));
    }, [dispatch]);

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

    function formatDate(inputDateStr) {
        const inputDate = new Date(inputDateStr);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return inputDate.toLocaleDateString('en-GB', options);
    }

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
            await dispatch(addAttendMeetup(parseInt(id), () => {
                dispatch(getMemberMeetup(id));
                toast.success('Attend success');
            }));
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteAttend = async (id) => {
        try {
            await dispatch(deleteAttendMeetup(parseInt(id), () => {
                dispatch(getMemberMeetup(id));
                toast.success('Attend Canceled success');
            }));
        } catch (error) {
            console.error('Error:', error);
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
                            <p className={classes.description}>{data?.description}</p>
                        </div>
                        <div className={classes.member}>
                            <p className={classes.title}>
                                <FormattedMessage id="app_detail_meetup_member" /> ({meetupMember ? meetupMember?.length : 0}/{meetupDetail?.capacity})
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
                                <p className={classes.membernotfound}><FormattedMessage id="app_detai_meetup_member_notfound" /></p>
                            ) : (
                                <div className={classes.organizermember}>
                                    {meetupMember.slice(0, 3).map((name, index) => (
                                        <MeetupMember key={index} image={name?.User?.image_url} name={name?.User?.username} />
                                    ))}
                                    {meetupMember?.length > 3 && (
                                        <div className={classes.container}>
                                            <Avatar className={classes.menuAvatar} />
                                            <p className={classes.name}>+{meetupMember?.length - 3} more</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={classes.comment}>
                            <p className={classes.title}>
                                <FormattedMessage id="app_detail_meetup_comment" /> (2)
                            </p>
                            <div className={classes.mycomment}>
                                <Avatar
                                    className={classes.menuAvatar}
                                    src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
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
                            <div className={classes.publicComment}>
                                <Avatar
                                    className={classes.menuAvatar}
                                    src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
                                />
                                <div className={classes.publicontainer}>
                                    <div className={classes.header}>
                                        <p className={classes.publicname}>ujan</p>
                                        <p className={classes.time}>3 Hours Ago</p>
                                    </div>
                                    <p className={classes.publiccontent}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                        and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                        leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.kanan}>
                        <div className={classes.when}>
                            {meetupDetail?.organizer_id === dataToken?.id
                                ?
                                ""
                                :
                                meetupMember?.some(m => m.user_id === dataToken?.id) ? (
                                    <Button
                                        onClick={() => handleDeleteAttend(id)}
                                        text={<FormattedMessage id="app_detai_meetup_attended" />}
                                    />
                                ) : (
                                    <Button
                                        onClick={() => addAttend(id)}
                                        text={<FormattedMessage id="app_detai_meetup_attend" />}
                                    />
                                )
                            }
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
                            <p className={classes.location}>Gedung Kocak</p>
                            <p className={classes.fulladdress}>{data?.full_address}</p>
                            {meetupDetail && meetupDetail.lat && meetupDetail.long && (
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
                            )}
                        </div>
                        <div className={classes.commentMobile}>
                            <p className={classes.title}>
                                <FormattedMessage id="app_detail_meetup_comment" /> (2)
                            </p>
                            <div className={classes.mycomment}>
                                <Avatar
                                    className={classes.menuAvatar}
                                    src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
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
                            <div className={classes.publicComment}>
                                <Avatar
                                    className={classes.menuAvatar}
                                    src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
                                />
                                <div className={classes.publicontainer}>
                                    <div className={classes.header}>
                                        <p className={classes.publicname}>ujan</p>
                                        <p className={classes.time}>3 Hours Ago</p>
                                    </div>
                                    <p className={classes.publiccontent}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                        and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                        leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
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
    token: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    meetupDetail: selectMeetupDetail,
    meetupMember: selectMemberMeetup,
    token: selectToken
});

export default connect(mapStateToProps)(DetailMeetup);
