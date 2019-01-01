import axios from 'axios';
import apiKeys from '../apiKeys';

const githubUrl = apiKeys.githubApi.apiUrl;

const getGithubUser = username => new Promise((resolve, reject) => {
  axios.get(`${githubUrl}/users/${username}`).then((result) => {
    resolve(result.data);
  })
    .catch(err => reject(err));
});

export default {
  getGithubUser,
};
