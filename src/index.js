import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

refs = {
  select: document.querySelector('.breed-select'),
  markup: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
};
refs.select.addEventListener('change', catInfo);

fetchBreeds()
  .then(data => {
    const option = createMarkap(data);
    refs.select.innerHTML = option;
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(() => Notiflix.Notify.failure(refs.error.textContent));

function createMarkap(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function catInfo() {
  const selectValue = refs.select.value;
  fetchCatByBreed(selectValue)
    .then(data => {
      console.log(data[0]);
      refs.markup.innerHTML = createMarkapCat(data[0]);
    })
    .catch(() => Notiflix.Notify.failure(refs.error.textContent));
}

function createMarkapCat({ breeds, url }) {
  return `<img class="cat-img" src="${url}" alt="${breeds[0].name}">
  <div class="cat-info-block">
    <h2 class="cat-title">${breeds[0].name}</h2>
    <p class="cat-descr">${breeds[0].description}</p>
    <p class="cat-temp">
      <b class="cat-temp-title">Temperament: </b>
      ${breeds[0].temperament} </p>
  </div>`;
}
