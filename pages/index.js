import Head from 'next/head';
import styles from '../styles/Home.module.css';
import client from '../lib/apollo-client';
import { gql } from '@apollo/client';

import Card from '../components/card';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetData {
        links {
          title
          reporter
          severity
          status
          devAssigned
        }
      }
    `
  });

  return {
    props: {
      data
    }
  };
}

export default function Home({data}) {
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
        <Card data={data}/>
      </main>
    </div>
  );
}
