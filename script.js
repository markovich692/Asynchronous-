'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);

  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
<article class= "country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
</article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMessage) {
  return fetch(`${url}`).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

const getCountryDataAndBorder = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      //Country 1
      const [data1] = data;

      renderCountry(data1);

      const neighbour = data1.borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      //Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data2 => {
      return renderCountry(data2, 'neighbour');
    })
    .catch(error =>
      renderError(`Something went wrong ${error.message} Try again`)
    )
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryDataAndBorder('portugal');
});

// const getCountryDataAndBorder = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       const [data1] = data;

//       const border = data1.borders?.[0];

//       renderCountry(data1);

//       return fetch(`https://restcountries.com/v2/alpha/${border}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data2 => {
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     })
//     .catch(error =>
//       renderError(`Something went wrong ${error.message} Try again`)
//     )
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountryDataAndBorder('portugal');
// });

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

/////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   // console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     const html = `
//             <article class="country">
//               <img class="country__img" src="${data.flag}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${data.population}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//               </div>
//             </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('cameroon');
// getCountryData('Kazakhstan');

// const getCountryDataAndBorder = function (country) {
//   //AJAX call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     //Get neighbor Country 2
//     const neighbor = data?.borders[0];

//     //AJAX call 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');

//       //country 3
//       const spainNeighbor = data2?.borders[1];

//       const request3 = new XMLHttpRequest();
//       request3.open(
//         'GET',
//         `https://restcountries.com/v2/alpha/${spainNeighbor}`
//       );
//       request3.send();

//       request3.addEventListener('load', function () {
//         const data3 = JSON.parse(this.responseText);

//         //Render neighbor3
//         renderCountry(data3, 'neighbour');
//       });
//     });
//   });
// };

// getCountryDataAndBorder('Portugal');

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);
