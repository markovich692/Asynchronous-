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

//////////////////////////////////////
// Coding Challenge #1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Cordinates does not exist, ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       if (data.region === 'Throttled! See geocode.xyz/pricing')
//         throw new Error('could not process request Please wait and try again!');

//       console.log(`You are in ${data.region}, ${data.country}`);

//       getCountryDataAndBorder(data.country);
//     })

//     .catch(error => console.log(`Something went wrong, ${error.message} `));
// };

// whereAmI(19.037, 72.873);

// EVENT LOOP in practice

// console.log(`let's start`);

// setTimeout(() => console.log(`0 sec timer`), 0);

// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}

//   console.log(res);
// });

//Create your own Promise
// const promiseLottery = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN!');
//     } else {
//       reject(new Error('You lost your MONEY!'));
//     }
//   }, 2000);
// });

// promiseLottery
//   .then(res => console.log(res))
//   .catch(error => console.error(error));

// //Promisifying the setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3).then(() => console.log('I waited 3 seconds.'));

//Promisifying the geolocation API

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude);
//   },
//   function () {
//     alert('Could not get coordinates');
//   }
// );

//GEOLOCATION PROMISIFYING
// const geolocationPromise = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

//Promisifying the whereAmI

// const whereAmI = function () {
//   geolocationPromise()
//     .then(response => {
//       const { latitude: lat, longitude: lng } = response.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Cordinates does not exist, ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       if (data.region === 'Throttled! See geocode.xyz/pricing')
//         throw new Error('could not process request Please wait and try again!');

//       console.log(`You are in ${data.region}, ${data.country}`);

//       getCountryDataAndBorder(data.country);
//     })
//     .catch(error => console.log(`Something went wrong, ${error.message} `));
// };

// btn.addEventListener('click', function () {
//   whereAmI();
// });

//Coding Challenge #2 (complete the challenge later today)

// let img;

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // Part 1
// const createImage = function (imgPath) {
//   //returns a new Promise
//   return new Promise(function (resolve, reject) {
//     //create a new 'img' element
//     img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       document.querySelector('.images').append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('could not get image'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log('Image 1 loaded');
//     return wait(5);
//   })
//   .then(() => {
//     img.style.display = 'none';

//     createImage('img/img-2.jpg');

//     console.log('Image 2 loaded');
//     return wait(5);
//   })
//   .then(() => {
//     img.style.display = 'none';

//     createImage('img/img-3.jpg');

//     console.log('Image 3 loaded');
//     return wait(5);
//   })
//   .then(() => (img.style.display = 'none'))

//   .catch(error => console.error(error));

//ASYNC/AWAIT

//Promisified FUNCTIONS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const position = await getPosition();

    const { latitude: lat, longitude: lng } = position.coords;

    //Reverse Geocoding
    const responseGeocode = await fetch(
      `https://geocode.xyz/${lat},${lng}?json=1`
    );

    if (!responseGeocode.ok)
      throw new Error(
        `Problem getting country location ${responseGeocode.status}`
      );

    const dataGeocode = await responseGeocode.json();

    const country = await dataGeocode.country;

    const res = await fetch(`https://restcountries.com/v2/name/${country}`);

    if (!res.ok) throw new Error(`Problem getting country name ${res.status}`);

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeocode.city}, ${dataGeocode.state} `;
  } catch (error) {
    renderError(`Something went wrong ${error.message}`);

    //Reject Promise returned from ASYNC function
    throw error;
  }
};

// console.log('1: Will get location');
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(error => console.error(`2: ${error.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`1:${city}`);
//   } catch (error) {
//     console.error(`2: ${error.message}`);
//   }
//   console.log(`3:Finished getting location`);
// })();

const get3Countries = async function (c1, c2, c3) {
  try {
    let arr = [];

    const datas = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    datas.forEach(function (data) {
      const [city] = data;

      console.log(city.capital);

      arr.push(city.capital);
    });
    console.log(arr);
  } catch (error) {
    console.error(error);
  }
};

get3Countries('portugal', 'benin', 'canada');
