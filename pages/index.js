import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import CreatePost from '../components/createPost'
import { useState, useEffect } from 'react'
import fire from '../config/fire-config'


const Home = ({ allPostsData }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
      fire.firestore()
        .collection('blog')
        .onSnapshot(snap => {
          const blogs = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBlogs(blogs);
        });
    }, []);

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
    
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
            {blogs.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
  
        <CreatePost /> 


      </Layout>
    )
}

export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}