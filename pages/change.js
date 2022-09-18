import { useState } from 'react';

import styles from '../styles/Home.module.css'

const Home = () => {
  const [response, setResponse] = useState([]);
  const [repoUrl, setRepoUrl] = useState('');
  const [filepath, setAddFilepath] = useState('');
  const [filecontent, setFilecontent] = useState('');

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

  const simpleDelete = async (filepath) => {
    await fetch(
      'api/update',
      {
        method: 'POST',
        body: JSON.stringify({ filepath }) 
      }
    )
      .then(response => response.json())
      .catch(e => console.log('error', e));
  };

  const simpleAdd = async () => {
    await fetch(
      'api/update',
      {
        method: 'POST',
        body: JSON.stringify({
          filepath,
          filecontent
        }) 
      }
    )
      .then(response => response.json())
      .catch(e => console.log('error', e));
  };

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <p className={styles.pageTitle}>Simple clone repository, add/delete files using "isomorphic-git"</p>
        <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

        <div className={styles.requestContainer}>
          <div className={styles.request}>
            <label>Repository url:</label>
            <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
          </div>

          <button className={styles.cloneButton} onClick={simpleClone}>Clone</button>
        </div>

      <div className={styles.commandsContainer}>
        {!!response?.length &&
          <>
            <div className={styles.cloneResponseContainer}>
              {response.map(cR => (
                <div key={`${cR}`} className={styles.cloneFile}>
                  <span className={styles.cloneFileName}>{cR}</span>
                  <svg onClick={() => simpleDelete(cR)} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </div>
              ))}
            </div>
            <div className={styles.addCommandContainer}>
              <div className={styles.addMetaInfContainer}>
                <label>File path:</label>
                <input className={styles.addFileNameInput} type="text" value={filepath} onChange={e => setAddFilepath(e.target.value)}/>
                <button className={styles.cloneButton} onClick={simpleAdd}>Add</button>
              </div>
              <textarea className={styles.addInput} value={filecontent} onChange={e => setFilecontent(e.target.value)} />
            </div>
          </>
        }
      </div>

        {!response?.length &&
          <p className={styles.preloaderCaption}>Here will be list of files after clone operation.</p>
        }

      </main>
    </div>
  )
}

export default Home

