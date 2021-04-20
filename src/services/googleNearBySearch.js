import { API_KEY, API_URL } from './configAPI';

export const nearBySearch = async (optionSearchBy = {
  latitude: 0,
  longitude: 0,
  typeSearch: 'restaurant',
  typeRange: 1,
}) =>
  await fetch(
    `${API_URL}/place/nearbysearch/json?location=${optionSearchBy.latitude},${optionSearchBy.longitude}&type=${optionSearchBy.typeSearch}&radius=${optionSearchBy.typeRange * 1000}&key=${API_KEY}`,
    {
      method: 'GET', // *GET, POST, PUT, DELETE, ..
      mode: 'cors', // *cors, no-cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // *same-origin, include, omit
      headers: {
        //'Content-Type': 'application/json' // application/json, application/x-www-form-urlencoded
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // *follow, manual, error
      referrerPolicy: 'no-referrer', // *no-referrer-when-downgrade, no-referrer, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
  )
  .then(
    function(response) {
      if (response.status !== 200 && response.data.error_message) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        return response.json();
      }

      // Examine the text in the response
      return response.json();
    }
  ).catch(function(err) {
    console.log('Fetch Error', err);
  });