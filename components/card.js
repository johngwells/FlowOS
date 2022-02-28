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
import SeverityDropdown from './severity-dropdown';

const POSTS_PER_PAGE = 10;

const Card = () => {
  const [open, setOpen] = useState(false);
  const [mapIndex, setMapIndex] = useState(null);

  const [severityOpen, setSeverityOpen] = useState(false);
  const [mapSeverityIndex, setMapSeverityIndex] = useState(null);

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

  const handleSeverityChange = (id, value) => {
    updateField({
      variables: { updateFieldId: id, input: { severity: value } }
    });
    setSeverityOpen(false);
  };

  const handleStatusClick = index => {
    setMapIndex(index);
    setOpen(true);
  };

  const handleSeverityClick = index => {
    setMapSeverityIndex(index);
    setSeverityOpen(true);
  };

  const handleAssignClick = () => {
    alert('Must be logged in as Admin to assign a dev')
  }

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
            <div
              className={cls(styles.border, styles.borderSmall)}
              onClick={handleSeverityClick.bind(this, index)}
            >
              <>
                {severityOpen && mapSeverityIndex === index ? (
                  <SeverityDropdown
                    id={d.id}
                    setSeverityOpen={setSeverityOpen}
                    handleSeverityChange={handleSeverityChange}
                    currentStatus={d.severity}
                  />
                ) : (
                  <span>{d.severity}</span>
                )}
              </>
            </div>
            <div
              className={cls(styles.border, styles.borderSmall)}
              onClick={handleStatusClick.bind(this, index)}
            >
              <>
                {/* Setting an Index to the cell & comparing to the current index of that row. Fixes the problem of opening all cells in the column */}
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
                <button onClick={handleAssignClick} className={styles.btn}>Assign</button>
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
