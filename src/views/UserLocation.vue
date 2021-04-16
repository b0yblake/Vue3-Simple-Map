<template>
  <section class="user-location border border-gray-400 rounded p-4">
    <form @submit.prevent="submitForm()">
      <div class="form-wrap flex flex-col">
        <h2 class="title text-black-500 text-lg uppercase ">Google map direction 🌍</h2>

        <ErrorAlert :errorMessage="errorMessage" />
        <TextForm
          :id="'form-address'"
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
        <TextButton :title="'Go'" />
      </div>
    </form>
    <div class="map">

    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { currentLocation } from '@/services/googleMapAPI';

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

    const showPosition = position => {
      // console.log('latitude: ', position.coords.latitude);
      // console.log('longitude: ', position.coords.longitude);

      fetchAPI(position.coords.latitude, position.coords.longitude);
    }

    const fetchAPI = async (latitude, longitude) => {
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
    // color: red;
    font-family: $defaultFontFamily;
  }
}
</style>