import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { initializeApollo, addApolloState } from '../lib/apollo-next-client';
import { gql } from '@apollo/client';

import Card from '../components/card';

const GET_ALL_QUERIES = gql`
  query Query {
    fields {
      title
      reporter
      severity
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ALL_QUERIES
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flow OS</title>
        <meta
          name='description'
          content='FlowOS Productivity into the future'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <img src='static/flow.png' className={styles.flowImg}></img>
          <h1 className={styles.title}>Flow.OS</h1>
        </div>
        <Card />
      </main>
    </div>
  );
}
