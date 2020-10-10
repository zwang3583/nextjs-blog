import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello there! I am a BA/MS in Computer Science student at Boston University, expecting to graduate in 2022.</p>
        <p>I have a keen interest in cybersecurity and software engineering for social good.</p>
        <p>I have taken several course relating to cybersecurity such as cryptography and network security, and am volunteering to develop software for organizations with a positive social impact.</p>
      </section>
    </Layout>
  )
}