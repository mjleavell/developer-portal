import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBlogs = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/blogs.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const blogs = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        blogs.push(res.data[key]);
      });
    }
    resolve(blogs);
  })
    .catch(err => reject(err));
});

export default {
  getBlogs,
};
