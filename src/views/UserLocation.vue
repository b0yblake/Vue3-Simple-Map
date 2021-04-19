<template>
  <section class="user-location border border-gray-400 rounded p-5 mt-20 ml-10 w-1/4 bg-white">
    <form @submit.prevent="submitForm()">
      <div class="form-wrap flex flex-col">
        <h2 class="title text-black-500 text-lg uppercase ">Google map direction 🌍</h2>

        <ErrorAlert :errorMessage="errorMessage" />
        <TextForm
          :id="'autocomplete'"
          :isBlind="true"
          :label="'Enter Your Address'"
          :address="address"
        >
          <!-- slot after input -->
          <template #get_location>
            <button type="button" @click="getLocator()" class="flex w-20 bg-red-400 p-1 mt-2 text-white text-lg">Get location</button>
          </template>

          <!-- slot spin -->
          <template #spin v-if="isLoadingSpin">
            Loading...
          </template>
        </TextForm>
        <TextButton :title="'Go'"  />
      </div>
    </form>
    <div id="map"></div>
  </section>
</template>

<script>
import {
  ref,
  onMounted,
} from 'vue';
import { API_KEY, API_URL } from '@/services/configAPI';
import { currentLocation } from '@/services/googleMapAPI';
import { autocomplete } from '@/services/googleAutocompleteAPI';

export default {
  name: "UserLocation",
  setup() {
    const errorMessage = ref('');
    const address = ref('');
    const isLoadingSpin = ref(false);

    const submitForm = () => {
      console.log('submit form');


    }

    const getLocator = () => {
      if(!navigator && !navigator.geolocation) {
        console.log('Your browser does not support geolocation API');
      }
      isLoadingSpin.value = true;
      console.log('isLoadingSpin: ', isLoadingSpin.value);

      navigator.geolocation.getCurrentPosition(showPosition, catchError);
    }

    const showUserLocationOnTheMap = (latitude, longitude) => {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // The marker
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map
      })
    }

    const showPosition = position => {
      // console.log('latitude: ', position.coords.latitude);
      // console.log('longitude: ', position.coords.longitude);
      fetchLocation(position.coords.latitude, position.coords.longitude);
      showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
    }

    const fetchLocation = async (latitude, longitude) => {
      const response = await currentLocation(latitude, longitude);

      console.log('response: ', response);

      if(response.error_message) {
        return catchError(response);
      }
      isLoadingSpin.value = false;
      console.log('isLoadingSpin: ', isLoadingSpin.value);
      return address.value = response?.results[0]?.formatted_address;
    }

    const catchError = error => {
      errorMessage.value = `ERROR(${error.code || ''}): ${error.message || error.error_message}`;
      
      //Auto hide message error after 3000ms
      const TIMEOUT_MS = 3000;
      setTimeout(() => { errorMessage.value = '' }, TIMEOUT_MS);
      isLoadingSpin.value = false;
    }

    onMounted(() => {
      autocomplete(`${API_URL}/js?libraries=places&key=${API_KEY}`)
      .then(() => {
        // Script is loaded, do something
        console.log('ok');

        const autoComplteAddress = new google.maps.places.Autocomplete(
          document.getElementById("autocomplete"),
          // {bounds: new google.maps.LatLngBounds(0, 0)} // Show current state first, optional
        )

        autoComplteAddress.addListener("place_changed", () => {
          let place = autoComplteAddress.getPlace();
          // console.log(place);
          showUserLocationOnTheMap(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          )
        });
      })
      .catch(() => {
        console.log('Failed');
      });
    })

    return {
      errorMessage,
      submitForm,
      getLocator,
      address,
      isLoadingSpin,
    }
  }
}
</script>

<style lang="scss" scoped>

.user-location {
  .title {
    color: red;
    font-family: $defaultFontFamily;
  }
  #map {
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ccc;
  }
}

</style>