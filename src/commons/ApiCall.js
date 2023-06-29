import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://localhost:3035/api-v1/',
  // baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

apiClient.interceptors.request.use(async function (config, data) {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + JSON.parse(token).token;
  }

  return config;
});

export default apiClient;
