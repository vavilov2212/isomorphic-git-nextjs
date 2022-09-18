import path from 'path';
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';
import fs from 'fs';

export default async function handler(req, res) {
  const { filepath, filecontent } = JSON.parse(req.body);

  const dir = path.join(process.cwd(), 'test-clone');
  const file = path.join(dir, filepath);

  const message = '';

  if (fs.existsSync(dir)) {
    try {
      if (filecontent) {
        fs.appendFileSync(file, filecontent);
        await git.add({ fs, dir: './test-clone', filepath  })
      } else {
        await git.remove({ fs, dir: './test-clone', filepath })
      }
    } catch(e) {
      console.log('git.add error', e);
    }
  }

  await git.commit({
    fs,
    dir,
    message,
    author: {
      name: 'Athors name',
      email: 'Authors email',
    },
  })
    .then(console.log)
    .catch(console.log);

  try{
    await git.push({
      fs,
      dir,
      http,
      onProgress: console.log,
      onMessage: console.log,
      remote: 'origin',
      ref: 'master',
      onAuth: () => ({
        username: 'YOUR_USERNAME',
        password: 'YOUR_PASSWORD_OR_PERSONAL_ACCESS_TOKEN'
      }),
    })
      .then(() => res.status(200).json({ success: true }))
  } catch(e) {
    console.log('push error', e);
    res.status(400).json({ error: e.message });
  }
};

