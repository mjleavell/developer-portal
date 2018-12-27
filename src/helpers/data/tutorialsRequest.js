import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getTutorials = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tutorials.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const tutorials = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        tutorials.push(res.data[key]);
      });
    }
    resolve(tutorials);
  })
    .catch(err => reject(err));
});

export default {
  getTutorials,
};
