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

const deleteTutorial = tutorialId => axios.delete(`${baseUrl}/tutorials/${tutorialId}.json`);

const updateIsCompleted = (tutorialId, isCompleted) => axios.patch(`${baseUrl}/tutorials/${tutorialId}.json`, { isCompleted });

export default {
  getTutorials,
  deleteTutorial,
  updateIsCompleted,
};
