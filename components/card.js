// import data from '../data/bug-tracker';
import { gql, useQuery, NetworkStatus } from '@apollo/client';
import styles from './card.module.css';
import cls from 'classnames';

import Form from './form';

const GET_ALL_QUERIES = gql`
  query Query {
    fields {
      title
      reporter
      severity
    }
  }
`;

const Card = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_ALL_QUERIES,
    {
      // variables: allPostsQueryVars,

      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  console.log(NetworkStatus)

  const loadingMoreFields = networkStatus === NetworkStatus.fetchMore

  const loadMoreFields = () => {
    fetchMore({
      variables: {
        skip: allFields.length,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading fields." />
  if (loading && !loadingMoreFields) return <div>Loading</div>

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
          <div className={styles.card} key={Math.random()}>
            <div className={cls(styles.border, styles.borderTitle)}>
              <p>{d.title}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.reporter}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.severity}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.status}</p>
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
