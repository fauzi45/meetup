import classes from "./style.module.scss";
import { FormattedMessage } from 'react-intl';

const Jumbotron = () => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.content}>
          <p className={classes.title}>
          <FormattedMessage id="app_jumbotron_title" />
          </p>
          <p className={classes.desc}>
          <FormattedMessage id="app_jumbotron_description" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
