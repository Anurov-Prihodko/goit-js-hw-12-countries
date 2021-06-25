'use strict';
import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
var debounce = require('lodash.debounce');



document.querySelector('input').addEventListener(
  'input',
  debounce(() => {
    console.log(
      'Input event handler invocation after 300ms of inactivity past burst.',
    );
  }, 1000),
);