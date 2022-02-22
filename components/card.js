import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../lib/apollo-next-client';
import {
  DELETE_BUG,
  READ_BUG,
  GET_ALL_QUERIES,
  UPDATE_STATUS
} from '../utils/queries';

import styles from './card.module.css';
import cls from 'classnames';

import Form from './form';
import StatusDropdown from './status-dropdown';

const POSTS_PER_PAGE = 10;

const Card = () => {
  const [open, setOpen] = useState(false);
  const [mapIndex, setMapIndex] = useState(null);

  const [deleteField] = useMutation(DELETE_BUG, {
    refetchQueries: [{ query: READ_BUG }]
  });

  const { loading, error, data } = useQuery(GET_ALL_QUERIES, {
    notifyOnNetworkStatusChange: false
  });

  const [updateField] = useMutation(UPDATE_STATUS, {
    refetchQueries: [{ query: GET_ALL_QUERIES }]
  });

  if (error) return <div>`Error ${error.message}`</div>;
  if (loading) return <div>Loading</div>;

  const handleDelete = id => {
    deleteField({ variables: { deleteFieldId: id } });
  };

  const handleStatusChange = (id, value) => {
    updateField({
      variables: { updateFieldId: id, input: { status: value } }
    });

    setOpen(false);
  };

  const onStatusClick = index => {
    setMapIndex(index);
    setOpen(true);
  };

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
      {data?.fields?.map((d, index) => {
        return (
          <div className={styles.card} key={d.id}>
            <div className={styles.btnContainer}>
              <img
                className={styles.btnDelete}
                src='static/delete_forever.svg'
                onClick={handleDelete.bind(this, d.id)}
              />
            </div>
            <div className={cls(styles.border, styles.borderTitle)}>
              <p>{d.title}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.reporter}</p>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <p>{d.severity}</p>
            </div>
            <div
              className={cls(styles.border, styles.borderSmall)}
              onClick={onStatusClick.bind(this, index)}
            >
              <>
                {open && mapIndex === index ? (
                  <StatusDropdown
                    id={d.id}
                    setOpen={setOpen}
                    handleStatusChange={handleStatusChange}
                    currentStatus={d.status}
                  />
                ) : (
                  <span>{d.status}</span>
                )}
              </>
            </div>
            <div className={cls(styles.border, styles.borderSmall)}>
              <div className={styles.assignedToContainer}>
                <button className={styles.btn}>Assign</button>
                <p>{d.devAssigned}</p>
              </div>
            </div>
          </div>
        );
      })}
      <Form />
    </div>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_QUERIES,
    variables: {
      first: POSTS_PER_PAGE,
      after: null
    }
  });

  return addApolloState(apolloClient, {
    props: {}
  });
}

export default Card;
