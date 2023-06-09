import axios from 'axios';

export default axios.create({
  baseURL: 'http://134.209.132.246:8080/',
  headers: {
    common: {
      "Content-Type": "application/json"
    }
  }
});