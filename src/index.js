import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('input#search-box');

inputField.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
  fetchCountries(inputField.value.trim());
}
