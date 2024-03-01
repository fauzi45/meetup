import Button from '@components/Button';
import classes from './style.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EditProfile = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}>Edit Your Profile</p>
        <div className={classes.containercontent}>
          <div className={classes.kiri}>
            <div className={classes.kiriContainer}>
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className={classes.img}
                alt=""
              />
              <p className={classes.name}>Orang Padang</p>
              <p className={classes.location}>
                {' '}
                <LocationOnIcon />
                Padang
              </p>
            </div>
          </div>
          <div className={classes.kanan}>
            <p>Username</p>
            <input className={classes.input} type="text" />
            <p>A little bit of yourself</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <p>Location</p>
            <input className={classes.input} type="text" />
            <Button text={"Simpan"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
