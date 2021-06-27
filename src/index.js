'use strict';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
let debounce = require('lodash.debounce');
import markupForCountry from './templates/markupCountry.hbs';
import markupSeveralCountries from './templates/markupSeveralCountries.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, success, error } from '@pnotify/core';

const refs = {
    cardContainer: document.querySelector('.markup-js'),
    inputForm: document.querySelector('#searchQuery'),
}

refs.inputForm.addEventListener('input', debounce(onSearch, 2000))

function onSearch(e) {
    e.preventDefault();
    clearCountryContainer();
    const searchQuery = e.target.value;

    fetchCountries(searchQuery)
        .then(country => {
            renderOneCountry(country, markupForCountry);
        // renderSeveralCountry(country, markupSeveralCountries);
        })
        .catch(onFetchError)
}

function renderOneCountry(countries, hds) {
    const markup = countries.map(count => hds(count)).join();
    refs.cardContainer.innerHTML = markup;
}

function renderSeveralCountry(countries, hds) {
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