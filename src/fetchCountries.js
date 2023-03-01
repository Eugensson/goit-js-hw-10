import Notiflix from 'notiflix';

const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(value) {
  if (value !== '') {
    fetch(
      `https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          clearCountryInfo();
          clearCountriesList();
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          clearCountriesList();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          createCountryList(data);
          clearCountryInfo();
        } else {
          createCountryInfo(data);
          clearCountriesList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    clearCountriesList();
  }
}

function clearCountriesList() {
  countriesList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function createCountryList(arrayCountriesName) {
  const markup = arrayCountriesName
    .map(({ name, flags }) => {
      return `<li class="country-item"><img class="country-image" src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span></li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function createCountryInfo(countryName) {
  const markup = countryName
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <p><img class="country-image" src="${flags.svg}" alt="${
        flags.alt
      }" width="25" height="15">${name.common}</p>
      <p><b class="country-text">Capital:</b>${capital}</p>
      <p><b class="country-text">Population:</b>${population}</p>
      <p><b class="country-text">Languages:</b>${Object.values(languages).join(
        ', '
      )}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

export { fetchCountries };
