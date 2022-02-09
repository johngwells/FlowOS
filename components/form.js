import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { client } from '../lib/apollo-client';
import styles from './form.module.css';
import Card from './card';
// import Card from './card';

const CREATE_BUG = gql`
  mutation Mutation($title: String!, $reporter: String!) {
    createFields(title: $title, reporter: $reporter) {
      title
      reporter
    }
  }
`;

const READ_BUG = gql`
  query Query {
    fields {
      title
      reporter
    }
  }
`;

console.log(CREATE_BUG);

const Form = () => {
  const [title, setTitle] = useState('');
  const [reporter, setReporter] = useState('');

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

  const handleSubmit = e => {
    console.log('Submitted!', title, reporter);
    e.preventDefault();
    createFields({
      variables: { title, reporter }
    });

    // Reset
    setTitle('');
    setReporter('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label>
        Title:
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        Reporter:
        <input
          type='text'
          name='reporter'
          value={reporter}
          onChange={handleReporterChange}
        />
      </label>
      <button type='submit'>Submit Bug</button>
    </form>
  );
};

export default Form;
