import axios from 'axios';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_nPXXkw17a5hktbvTxY7jBI44DzPqjj6KFlQ7qs9WRMvrEQSyIJorBvyglioEP2fT';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  Notiflix.Loading.standard();
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    Notiflix.Loading.remove();
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  Notiflix.Loading.standard();
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      Notiflix.Loading.remove();
      return response.data;
    });
}
