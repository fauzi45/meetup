import classes from './style.module.scss';

const Button = ({ text, onClick }) => {
  return (
    <div className={classes.button} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
