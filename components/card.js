// import data from '../data/bug-tracker';
import styles from './card.module.css';
import cls from 'classnames';

import Form from './form';

const Card = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <img src='static/bug.png' className={styles.bugImg} />
        <h2 className={styles.title}>Bug Reports</h2>
        
      </div>
      <div className={styles.tableHeading}>
        <span className={cls(styles.borderTitle, styles.tableAlign)}>
          title
        </span>
        <span className={cls(styles.borderSmall, styles.tableAlign)}>
          Reporter
        </span>
        <span className={cls(styles.borderSmall, styles.tableAlign)}>
          Severity
        </span>
        <span className={cls(styles.borderSmall, styles.tableAlign)}>
          Status
        </span>
        <span className={cls(styles.borderSmall, styles.tableAlign)}>
          Assigned to
        </span>
      </div>
      {data?.fields?.map(d => {
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
      <Form />
    </div>
  );
};

export default Card;
