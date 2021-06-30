'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');
import markupForCountry from './templates/markupCountry.hbs';
import markupSeveralCountries from './templates/markupSeveralCountries.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, success, error } from '@pnotify/core';
import API from './js/fetchCountries.js';
import getRefs from '../src/js/get-refs.js';

const refs = getRefs();

refs.inputForm.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
    e.preventDefault();
    clearCountryContainer();
    const searchQuery = e.target.value.trim();

    if (searchQuery) {
        API.fetchCountries(searchQuery)
        .then(country => {
            // console.log(country.length);
            if (country.length === 1) {
                renderCountry(country, markupForCountry);
                onSuccessfulRequest();
            }
            else if (country.length <= 10) {
                renderCountry(country, markupSeveralCountries);
                notSpecificEnoughAlert();
                // console.log('there is refs.inputForm.value:', refs.inputForm.value);
            } else if (country.length > 10) {
                clearCountryContainer();
                tooManyMatchesError();
            } else if (country.status === 404) {
                onFetchError();
            }
            return
        })        
        .catch((err => {
            onFetchError(err);
            console.log(err);
        }))
    }   
}

function renderCountry(countries, hds) {
    const markup = countries.map(count => hds(count)).join();
    refs.cardContainer.innerHTML = markup;
}

function clearCountryContainer() {
    refs.cardContainer.innerHTML = '';
}

function onFetchError() {
    error({
        text: "Something went wrong! Please enter a valid country name"
    });
}

function tooManyMatchesError() {
    error({
        text: "Too many matches found. Please enter a more specific query!"
    });
}

function notSpecificEnoughAlert() {
    alert({
        text: "Please enter a more specific query!"
    });
}

function onSuccessfulRequest() {
    success({
        text: "Congratulations! You found the country."
    });
}