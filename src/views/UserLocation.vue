<template>
  <section class="user-location border border-gray-400 rounded p-5 mt-20 ml-10 bg-white">
    <form @submit.prevent="">
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
            <button type="button" @click="getLocator()" class="flex w-4/4 bg-red-400 p-1 mt-2 text-white text-lg">Get location</button>
          </template>

          <!-- slot spin -->
          <template #spin v-if="isLoadingSpin">
            Loading...
          </template>
        </TextForm>

        <div class="form_text">
          <select v-model="typeSearch">
            <option value="restaurant">Restaurant</option>
            <option value="gas">Gas Station</option>
            <option value="bus">Bus Station</option>
            <option value="Hotel">Hotel</option>
          </select>
        </div>

        <div class="form_text">
          <select v-model="typeRange">
            <option value="1">1km</option>
            <option value="3">3km</option>
            <option value="5">5km</option>
          </select>
        </div>

        <TextButton :title="'Find your destination closest'" @click="findCloser" />
      </div>
      <div class="list_places flex flex-col mt-5">
        <ul>
          <li v-for="(item, index) in places" :key="`${places.id}_${index}`" class="flex flex-row mt-4 content-center items-center">
            <div class="border border-gray-400 p-2 mr-2">
              <img :src="item.icon" width="20" height="20" class="" />
            </div>
            <div class="detail">
              <strong>{{ item.name }}</strong>
              <p>{{ item.vicinity }}</p>
            </div>
          </li>
        </ul>
      </div>
    </form>
  </section>
  <section id="map"></section>
</template>

<script>
import {
  ref,
  onMounted,
  reactive,
} from 'vue';
import { API_KEY, API_URL } from '@/services/configAPI';
import { currentLocation } from '@/services/googleMapAPI';
import { autocomplete } from '@/services/googleAutocompleteAPI';
import { nearBySearch } from '@/services/googleNearBySearch';

export default {
  name: "UserLocation",
  setup() {
    const errorMessage = ref('');
    const address = ref('');
    const isLoadingSpin = ref(false);
    const typeSearch = ref('restaurant');
    const typeRange = ref(1);
    const coordinates = reactive({
      lat: 0,
      lng: 0
    });
    const places = ref([]);

    const getLocator = () => {
      if(!navigator && !navigator.geolocation) {
        console.log('Your browser does not support geolocation API');
      }
      isLoadingSpin.value = true;
      // console.log('isLoadingSpin: ', isLoadingSpin.value);

      navigator.geolocation.getCurrentPosition(showPosition, catchError);
    }

    const showUserLocationOnTheMap = (latitude, longitude) => {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      
      // The marker
      let ico_marker = 'https://img.icons8.com/fluent/48/000000/marker-storm.png';
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        icon: ico_marker,
      })
    }

    const showPosition = position => {
      coordinates.lat = position.coords.latitude;
      coordinates.lng = position.coords.longitude;

      fetchLocation(coordinates.lat, coordinates.lng);
      showUserLocationOnTheMap(coordinates.lat, coordinates.lng);
    }

    const fetchLocation = async (latitude, longitude) => {
      const response = await currentLocation(latitude, longitude);

      // console.log('response: ', response);

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

    const findCloser = async () => {
      isLoadingSpin.value = true;
      // console.log('typeSearch: ', typeSearch.value)
      // console.log('typeRange: ', typeRange.value)

      const response = await nearBySearch({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        typeSearch: typeSearch.value,
        typeRange: typeRange.value,
      });

      if(response.error_message) {
        return catchError(response);
      }

      // assign response to places ref[]
      places.value = response.results;

      const mapWithDestination = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      places.value.forEach(item => {
        showPlacesOnMap(item.geometry.location.lat, item.geometry.location.lng, mapWithDestination, item.name);
      })

      isLoadingSpin.value = false;
    }

    const showPlacesOnMap = (lat, lng, map, name) => {
      
      let ico_marker = 'https://img.icons8.com/fluent/48/000000/marker-storm.png';
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: ico_marker,
      })
      google.maps.event.addListener(marker, "click", () => {
        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent(`<div class="">${name}</div>`);
        infoWindow.open(map, marker);
      })
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

          // re-assign to coordinates onMounted lifecycle
          // Its mean after call API done, app run onMounted() -> re-assign
          coordinates.lat = place.geometry.location.lat();
          coordinates.lng = place.geometry.location.lng();

        });
      })
      .catch(() => {
        console.log('Failed');
      });
    })

    return {
      errorMessage,
      getLocator,
      address,
      isLoadingSpin,
      // coordinates, //return reactive state of coordinates if need on template
      findCloser,
      typeSearch,
      typeRange,
      places,
    }
  }
}
</script>

<style lang="scss" scoped>

.user-location {
  position: relative;
  width: 300px;
  z-index: 1;
  .title {
    color: red;
    font-family: $defaultFontFamily;
  }
  .list_places {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
#map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ccc;
}

</style>