import { useState } from 'react';

import styles from '../styles/Home.module.css'

const Home = () => {
  const [response, setResponse] = useState([]);
  const [repoUrl, setRepoUrl] = useState('');

  const simpleClone = async () => {
    const cloneRespone = await fetch(
      'api/clone',
      {
        method: 'POST',
        body: JSON.stringify({ repoUrl }) 
      }
    )
      .then(res => res.json());

    setResponse(cloneRespone);
  };

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <p className={styles.pageTitle}>Simple clone repository example using "isomorphic-git"</p>
        <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

        <div className={styles.requestContainer}>
          <div className={styles.request}>
            <label>Repository url:</label>
            <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
          </div>

          <button className={styles.cloneButton} onClick={simpleClone}>Clone</button>
        </div>

        {!!response?.length &&
          <div className={styles.cloneResponseContainer}>
            {response.map(cR => <span key={`${cR}`}>{cR}</span>)}
          </div>
        }

        {!response?.length &&
          <p className={styles.preloaderCaption}>Here will be list of files after clone operation.</p>
        }

      </main>
    </div>
  )
}

export default Home
