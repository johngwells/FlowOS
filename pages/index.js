import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { client, useQuery } from '../lib/apollo-client';
import { gql } from '@apollo/client';

import Card from '../components/card';
import { useEffect } from 'react';

const GET_ALL_QUERIES = gql`
  query Query {
    fields {
      title
      reporter
    }
  }
`;

export async function getSeverSideProps() {
  const { error, loading, data } = await client.query(GET_ALL_QUERIES);

  return {
    props: data
  };
}


export default function Home({ data }) {
  // useEffect(() => {
  //   console.log({ data })
  // }, [data])
  // console.log({ data });
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
        <Card data={data} />
      </main>
    </div>
  );
}
