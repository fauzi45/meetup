import classes from './style.module.scss';
let text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
make a type specimen book. It has survived not only five centuries, but also the leap into electronic
typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.`;

let result = text.substring(0, 250);

const BoxMeetup = () => {
  return (
    <div className={classes.container}>
      <div className={classes.kiri}>
        <p className={classes.title}>Belajar masak daging ala Aceh</p>
        <p className={classes.description}>{result}...</p>
        <button className={classes.button}>Show Detail</button>
      </div>
      <div className={classes.kanan}>
        <img
        className={classes.image}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="gambarcontoh"
        />
      </div>
    </div>
  );
};

export default BoxMeetup;
