import data from '../data/bug-tracker';
import styles from './card.module.css';
import cls from 'classnames';

const Card = () => {
  console.log(data[0].title);
  return (
    <div className={styles.container}>
      {data.map(d => {
        return (
          <div className={styles.card}>
            <div className={cls(styles.border, styles.borderTitle)}>
              <p>{d.title}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.reporter}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.severity[0]}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.status[2]}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.devAssigned}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
