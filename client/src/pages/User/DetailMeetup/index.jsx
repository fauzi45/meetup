import Carousel from '@components/Carousel';
import classes from './style.module.scss';
import { MapContainer, TileLayer } from 'react-leaflet';

import Avatar from '@mui/material/Avatar';
import Button from '@components/Button';
import MeetupMember from '@components/MeetupMember';
import { useState } from 'react';
const DetailMeetup = () => {
  const images = [
    'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg',
    'https://via.placeholder.com/800x400/33ff57/fff',
    'https://via.placeholder.com/800x400/5733ff/fff',
  ];

  const name = ['uji', 'ujan', 'uji', 'ujan', 'uji'];

  const [visibleMembers, setVisibleMembers] = useState(3);
  const [remainingMembers, setRemainingMembers] = useState(name.length - visibleMembers);

  const handleLoadMore = () => {
    setVisibleMembers(name.length);
    setRemainingMembers(0);
  };

  const remainingCountText = remainingMembers > 0 ? `+${remainingMembers} more` : '';

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.carousel}>
          <Carousel images={images} />
        </div>
        <div className={classes.content}>
          <div className={classes.kiri}>
            <div className={classes.detail}>
              <p className={classes.title}>Perkumpulan di Puncak Jayawijaya</p>
              <p className={classes.category}>Hiking</p>
              <p className={classes.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className={classes.member}>
              <p className={classes.title}>Members ({name.length})</p>
              <div className={classes.organizer}>
                <Avatar
                  className={classes.menuAvatar}
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
                />
                <div className={classes.organizercontent}>
                  <p className={classes.organizertitle}>Organizers</p>
                  <p className={classes.organizername}>Fuazi</p>
                </div>
              </div>
              <div className={classes.organizermember}>
                {name.slice(0, visibleMembers).map((name, index) => (
                  <MeetupMember key={index} name={name} />
                ))}
                {remainingMembers > 0 && ( // Check if remaining members are more than 2
                  <div className={classes.container}>
                    <Avatar className={classes.menuAvatar} />
                    <p className={classes.name}>{remainingCountText}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.comment}>
              <p className={classes.title}>Comment (2)</p>
              <div className={classes.mycomment}>
                <Avatar
                  className={classes.menuAvatar}
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
                />
                <div className={classes.inputContainer}>
                  <input className={classes.inputcomment} type="text" placeholder="Add comment" />
                  <button className={classes.sendButton}>Kirim</button>
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
              <Button text={'Attend'} />
              <p className={classes.title}>WHEN</p>
              <p className={classes.date}>September, March 2, 2024 at 11:00 AM</p>
              <p className={classes.to}>To</p>
              <p className={classes.date}>September, March 2, 2024 at 11:00 AM</p>
            </div>
            <div className={classes.where}>
              <p className={classes.title}>WHERE</p>
              <p className={classes.location}>Gedung Kocak</p>
              <p className={classes.fulladdress}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <MapContainer className={classes.maps} center={[51.505, -0.09]} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
            <div className={classes.commentMobile}>
              <p className={classes.title}>Comment (2)</p>
              <div className={classes.mycomment}>
                <Avatar
                  className={classes.menuAvatar}
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/4/7fbb77c0-1bfc-4f10-8c87-e80e8600e211.jpg"
                />
                <div className={classes.inputContainer}>
                  <input className={classes.inputcomment} type="text" placeholder="Add comment" />
                  <button className={classes.sendButton}>Kirim</button>
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
    </div>
  );
};

export default DetailMeetup;
