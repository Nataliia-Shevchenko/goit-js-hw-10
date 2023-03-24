import './css/styles.css';

import Notiflix from 'notiflix';

import debounce from 'lodash.debounce';

import { RestCountriesApi } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const counrtyListEl = document.querySelector('.country-list');
const counrtyCardEl = document.querySelector('.country-info');

const RestCountriesAPI = new RestCountriesApi();

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  console.dir(e.target.value);

  // const inputValue = e.target.value.trim();

  const searchQuery = e.target.value.trim();
  RestCountriesAPI.query = searchQuery;

  if (searchQuery === '') {
    return;
  }
  RestCountriesAPI.fetchCountries()
    .then(country => {
      console.log(country);
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length === 1) {
        renderCountryCard(country);
        // counrtyListEl.remove();
       
      } else if (country.length >= 2 && country.length <= 10) {
        renderCountryList(country);
        // counrtyCardEl.remove();
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryCard(country) {
  const markup = country
    .map(({ flags, name, capital, population, languages }) => {
      return `
        <div class='country-element--big'><img src=${
          flags.svg
        } width='30px' height='30px' />
        <h2 class="country-title">${name.official}</h2></div>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages)}</p>
      `;
    })
    .join('');
    counrtyListEl.remove();
    // counrtyListEl.innerHTML;
  counrtyCardEl.innerHTML = markup;
  
}

function renderCountryList(country) {
  const markup = country
    .map(({ flags, name }) => {
      return `<li><div class='country-element'>
      <img src=${flags.svg} width='20px' height='20px'/>
      <p>${name.official}</p></div>
    </li>
    `;
    })
    .join('');
    
    // counrtyCardEl.innerHTML;
  counrtyListEl.innerHTML = markup;
  
}
