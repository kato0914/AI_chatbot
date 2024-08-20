import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ChatInterface from '../components/ChatInterface'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AIチャットボット</title>
        <meta name="description" content="AIチャットボットアプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>AIチャットボット</h1>
        <ChatInterface />
      </main>
    </div>
  )
}