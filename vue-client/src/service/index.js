import axios from 'axios';
import jwt_decode from 'jwt-decode';

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,

})

const methods = ['get', 'post', 'put', 'delete']

const service = {
  get isTokenExpired() {
    const { exp } = this.getToken();
    return exp > Date.now() / 1000;
  },
  async execute(method, ...args) {
    try {
      const { data } = await instance[method](...args)
      return data;
    } catch (error) {
      throw error.response.data;
    }
  },
  setHeaderToken(token) {
    instance.defaults.headers.common.Authorization = token || this.getToken()
  },
  saveToken(token) {
    localStorage.setItem('jwtToken', token);
  },
  getToken() {
    return localStorage.getItem('jwtToken');
  },
  clearToken() {
    localStorage.removeItem('jwtToken')
  },
  getUserData(token) {
    return jwt_decode(token || this.getToken());
  },
}

// add axios method
methods.forEach(method => {
  service[method] = (...args) => service.execute(method, ...args)
})

export default service;
