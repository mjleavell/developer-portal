import axios from 'axios';
import apiKeys from '../apiKeys';

const githubUrl = apiKeys.githubApi.apiUrl;

const getUserInfo = userName => new Promise((resolve, reject) => {
  axios.get(`${githubUrl}/users/${userName}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

const getCommits = userName => new Promise((resolve, reject) => {
  axios.get(`${githubUrl}/users/${userName}/events/public`)
    .then((results) => {
      let commitCounter = 0;
      const commits = results.data.filter(event => event.type === 'PushEvent');
      commits.forEach((commit) => {
        commitCounter += commit.payload.commits.length;
        // console.log(commit.payload.commits);
      });
      resolve(commitCounter);
    })
    .catch(err => reject(err));
});


export default {
  getUserInfo,
  getCommits,
};
