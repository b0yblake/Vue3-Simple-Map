<template>
  <div class="form-text flex flex-col justify-start ">
    <label for="{{ id }}" class="" v-show="!isBlind">{{ label }}</label>
    <input type="text" id="{{ id }}" class="">
  </div>
</template>

<script>
export default {
  name: 'TextForm',
  props: {
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    isBlind: {
      type: Boolean,
    }
  }
}
</script>

<style>

</style>