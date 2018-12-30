import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getItems = (uid, itemType) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${itemType}.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
    const items = [];
    if (res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        res.data[key].id = key;
        getItems.push(res.data[key]);
      });
    }
    resolve(items);
  })
    .catch(err => reject(err));
});

const deleteOneItem = (itemId, itemType) => axios.delete(`${baseUrl}/${itemType}/${itemId}.json`);

const updateIsCompleted = (itemId, itemType, isCompleted) => axios.patch(`${baseUrl}/${itemType}/${itemId}.json`, { isCompleted });

export default {
  getItems,
  deleteOneItem,
  updateIsCompleted,
};
