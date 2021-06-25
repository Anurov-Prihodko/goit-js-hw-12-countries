'use strict';
import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
var debounce = require('lodash.debounce');
import markupForCountry from './templates/markupCountry.hbs';
import markupSeveralCountry from './templates/markupSeveralCountry.hbs';


fetch(`https://restcountries.eu/rest/v2/name/Ukraine`)
    .then(response => {
    return response.json()
    })
    .then(country => {
    console.log(country);
    })
    .catch(error => {
    console.log(error);    
    })

