import axios from 'axios';

const ENDPOINT = `https://pixabay.com/api/`;
const API_KEY = `33603912-7e8ee717ebd011b2a3cf395f5`;

axios.defaults.baseURL = ENDPOINT;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };

  try {
    const response = await axios.get('', config);

    return response;
  } catch (error) {
    console.log(error);
  }
};
