export const currentLocation = async (latitude = 0, longitude = 0) =>
  await fetch(
    `${import.meta.env.VITE_API_URL}/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_API_KEY}`
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