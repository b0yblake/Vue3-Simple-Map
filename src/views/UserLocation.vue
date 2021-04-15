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
        >
          <template #get_location>
            <button type="button" @click="getLocator()" class="flex w-20 bg-red-400 p-1 mt-2 text-white text-lg">Get location</button>
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

export default {
  name: "UserLocation",
  setup() {
    const errorMessage = ref('');

    const submitForm = () => {
      console.log('submit form');
    }

    const getLocator = () => {
      if(!navigator && !navigator.geolocation) {
        console.log('Your browser does not support geolocation API');
      }
      navigator.geolocation.getCurrentPosition(showPosition, catchError);
    }

    const showPosition = position => {
      console.log('latitude: ', position.coords.latitude);
      console.log('longitude: ', position.coords.longitude);
    }

    const catchError = error => {
      errorMessage.value = `ERROR(${error.code}): ${error.message}`;
      
      setTimeout(() => { errorMessage.value = '' }, 3000);

    }
    return {
      errorMessage,
      submitForm,
      getLocator,
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