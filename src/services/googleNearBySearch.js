export const nearBySearch = async (optionSearchBy = {
  latitude: 0,
  longitude: 0,
  typeSearch: 'restaurant',
  typeRange: 1,
}) =>
  await fetch(
    `${import.meta.env.VITE_PROXY_URL+import.meta.env.VITE_API_URL}/place/nearbysearch/json?location=${optionSearchBy.latitude},${optionSearchBy.longitude}&type=${optionSearchBy.typeSearch}&radius=${optionSearchBy.typeRange * 1000}&key=${import.meta.env.VITE_API_KEY}`
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