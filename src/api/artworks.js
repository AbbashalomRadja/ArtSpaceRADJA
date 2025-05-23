import axios from 'axios';

const BASE_URL = 'https://6819c95b1ac1155635065be9.mockapi.io/api/artworks';

export const getArtworks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createArtwork = async (art) => {
  const response = await axios.post(BASE_URL, art);
  return response.data;
};

export const updateArtwork = async (id, art) => {
  const response = await axios.put(`${BASE_URL}/${id}`, art);
  return response.data;
};

export const deleteArtwork = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};