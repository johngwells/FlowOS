import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { initializeApollo, addApolloState } from '../lib/apollo-next-client';
import styles from './form.module.css';
import cls from 'classnames';
import { CREATE_BUG, READ_BUG, GET_ALL_QUERIES } from '../utils/queries';

const POSTS_PER_PAGE = 10;

const Form = () => {
  const [title, setTitle] = useState('');
  const [reporter, setReporter] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [status, setStatus] = useState('New');
  const [isError, setIsError] = useState(false);

  const [createFields, { data, loading, error }] = useMutation(CREATE_BUG, {
    notifyOnNetworkStatusChange: false,
    refetchQueries: [{ query: READ_BUG }]
  });

  if (loading) return 'Submitting';
  if (error) return `Submission error! ${error.message}`;

  const handleTitleChange = e => {
    setIsError(false);
    setTitle(e.target.value);
  };

  const handleReporterChange = e => {
    setReporter(e.target.value);
  };

  const handleSeverityChange = e => {
    const value = [...e.target.selectedOptions].map(option => option.value);
    setSeverity(value.join(''));
  };

  const handleStatusChange = e => {
    const value = [...e.target.selectedOptions].map(option => option.value);
    setStatus(value.join(''));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (title === '' || reporter === '') {
      return setIsError(true);
    }
    createFields({
      variables: { input: { title, reporter, severity, status } }
    });

    // Reset
    setSeverity('Low');
    setStatus('New');
    setTitle('');
    setReporter('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor='title' className={styles.labelMargin}>
        <input
          className={styles.input}
          id='title'
          type='text'
          name='title'
          value={title}
          placeholder={
            isError ? 'You must enter a title!' : 'What is your bug?'
          }
          onChange={handleTitleChange}
        />
      </label>
      <label htmlFor='reporter' className={styles.labelMargin}>
        <input
          className={styles.input}
          id='reporter'
          type='text'
          name='reporter'
          value={reporter}
          placeholder={
            isError ? 'Who reported this bug?' : 'Who reported this?'
          }
          onChange={handleReporterChange}
        />
      </label>
      <select defaultValue={severity} onChange={handleSeverityChange} className={cls(styles.input, styles.labelMargin)}>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
        <option value='Critical'>Critical</option>
      </select>
      <select defaultValue={status} onChange={handleStatusChange} className={cls(styles.input, styles.labelMargin)}>
        <option value='New'>New</option>
        <option value='Dev Needed'>Dev Needed</option>
        <option value='In Progress'>In Progress</option>
        <option value='Completed'>Completed</option>
      </select>
      <button type='submit' className={styles.btn}>Submit Bug</button>
    </form>
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

export default Form;
