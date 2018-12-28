import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getResources = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/resources.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const resources = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        resources.push(res.data[key]);
      });
    }
    resolve(resources);
  })
    .catch(err => reject(err));
});

export default {
  getResources,
};
