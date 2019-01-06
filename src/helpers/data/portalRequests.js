import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getItems = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const items = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        items.push(res.data[key]);
      });
    }
    resolve(items);
  })
    .catch(err => reject(err));
});

const deleteOneItem = itemId => axios.delete(`${baseUrl}/items/${itemId}.json`);

const updateIsCompleted = (itemId, isCompleted) => axios.patch(`${baseUrl}/items/${itemId}.json`, { isCompleted });

const postRequest = newItemObject => axios.post(`${baseUrl}/tutorials.json`, newItemObject);

export default {
  getItems,
  deleteOneItem,
  updateIsCompleted,
  postRequest,
};
