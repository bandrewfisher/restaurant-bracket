import axios from 'axios';
import secrets from '../../secrets';

export default axios.create({
  baseURL: ' https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${secrets.API_KEY}`,
  },
});
