import axios from 'axios';

const server = axios.create({
  baseURL: 'https://songs.callumcancreate.com/api/v1',
});

server.interceptors.request.use(
  (_config) => {
    const config = { ..._config };
    const csrf = JSON.parse(localStorage.getItem('csrf')) || {};
    config.headers.Authorization = config.url.match(/^\/users\/auth\/refresh/)
      ? csrf.refresh
      : csrf.bearer;
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

server.interceptors.response.use(
  (res) => res,
  async (e) => {
    const original = e.config;
    if (e?.response?.status === 401 && !original._retry) {
      const {
        data: { csrf },
      } = await server.get('/users/auth/refresh');
      original._retry = true;
      localStorage.setItem('csrf', JSON.stringify(csrf));
      original.headers.Authorization = csrf.bearer;
      return axios(original);
    }
    return Promise.reject(e);
  }
);
export default server;
