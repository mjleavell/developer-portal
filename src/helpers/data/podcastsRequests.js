import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPodcasts = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/podcasts.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const podcasts = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        podcasts.push(res.data[key]);
      });
    }
    resolve(podcasts);
  })
    .catch(err => reject(err));
});

export default {
  getPodcasts,
};
