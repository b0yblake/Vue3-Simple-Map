<template>
  <section class="user-location border border-gray-400 rounded p-4">
    <form @click.prevent="submitForm()">
      <div class="form-wrap flex flex-col">
        <h2 class="title text-black-500 text-lg uppercase ">Google map direction 🌍</h2>
        <ErrorAlert :isError="error" :content="'Oops!! Some thing went wrong!'" />
        <TextForm :id="'form-address'" :isBlind="true" :label="'Enter Your Address'" />
        <TextButton :title="'Go'" />
      </div>
    </form>
    <div class="map">

    </div>
  </section>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      error: false,
    }
  },
  methods: {
    submitForm() {
      console.log('submit form - not reload form');
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