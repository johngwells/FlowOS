import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { initializeApollo, addApolloState } from '../lib/apollo-next-client';
import styles from './form.module.css';
import { CREATE_BUG, READ_BUG, GET_ALL_QUERIES} from '../utils/queries';

const Form = () => {
  const [title, setTitle] = useState('');
  const [reporter, setReporter] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [status, setStatus] = useState('New');

  const [createFields, { data, loading, error }] = useMutation(CREATE_BUG, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [{ query: READ_BUG }]
  });

  if (loading) return 'Submitting';
  if (error) return `Submission error! ${error.message}`;

  const handleTitleChange = e => {
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
    console.log('Submitted!', title, reporter, severity);
    e.preventDefault();
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
      <label htmlFor='title'>
        <input
          id='title'
          type='text'
          name='title'
          value={title}
          placeholder='What is your bug?'
          onChange={handleTitleChange}
        />
      </label>
      <label htmlFor='reporter'>
        <input
          id='reporter'
          type='text'
          name='reporter'
          value={reporter}
          placeholder='Who reported this?'
          onChange={handleReporterChange}
        />
      </label>
      <select defaultValue={severity} onChange={handleSeverityChange}>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
        <option value='Critical'>Critical</option>
      </select>
      <select defaultValue={status} onChange={handleStatusChange}>
        <option value='New'>New</option>
        <option value='Dev Needed'>Dev Needed</option>
        <option value='In Progress'>In Progress</option>
        <option value='Completed'>Completed</option>
      </select>
      <button type='submit'>Submit Bug</button>
    </form>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_QUERIES,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  });
}

export default Form;
