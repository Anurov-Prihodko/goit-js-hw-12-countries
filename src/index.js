'use strict';
import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
var debounce = require('lodash.debounce');
import markupForCountries from './templates/markup.hbs';


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

