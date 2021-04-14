<template>
  <section class="user-location border border-gray-400 rounded p-4">
    <div class="form-wrap flex flex-col">
      <h2 class="title text-black-500 text-lg uppercase ">Google map direction 🌍</h2>
      
      <TextForm :id="'form-address'" :isBlind="true" :label="'Enter Your Address'" />
      <TextButton :title="'Go'" />
    </div>
    <div class="map">
      
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