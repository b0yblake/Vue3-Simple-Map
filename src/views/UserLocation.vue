<template>
  <section class="user-location flex flex-col border border-gray-400 rounded p-4">
    <h2 class="title text-black-500 text-lg uppercase ">Google map direction 🌍</h2>
    <div class="form-wrap flex flex-col justify-start ">
      <label for="inp-map" class="">Enter your Address</label>
      <input type="text" id="inp-map" name="" class="">
      <button type="submit" class="w-16 bg-red-400 p-1 mt-2 text-white text-lg">Go</button>
    </div>
  </section>
</template>

<script>
export default {

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