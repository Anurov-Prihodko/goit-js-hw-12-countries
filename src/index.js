'use strict';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
let debounce = require('lodash.debounce');
import markupForCountry from './templates/markupCountry.hbs';
import markupSeveralCountries from './templates/markupSeveralCountries.hbs';

const refs = {
    cardContainer: document.querySelector('.markup-js')
}

// refs.cardContainer.addEventListener('input', debounce(fetchCountries, 2000))

fetchCountries('ukraine').then(country => {
        renderOneCountry(country, markupForCountry);
        // renderSeveralCountry(country, markupSeveralCountries);
    })
    .catch(error => {
        console.log('Pus sed', error);    
    });

function renderOneCountry(countries, hds) {
    const markup = countries.map(count => hds(count)).join();
    refs.cardContainer.innerHTML = markup;
}

function renderSeveralCountry(countries, hds) {
    const markup = countries.map(count => hds(count)).join();
    refs.cardContainer.innerHTML = markup;
}

