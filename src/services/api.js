import axios from 'axios';

export const getUsers = () => axios.get('https://json.medrocket.ru/users/');
export const getAlbums = userId => axios.get(`https://json.medrocket.ru/albums?userId=${userId}`);
export const getPhotos = albumId => axios.get(`https://json.medrocket.ru/photos?albumId=${albumId}`);