<template>
  <div class="form-text flex flex-col justify-start ">
    <label for="{{ id }}" class="" v-show="!isBlind">{{ label }}</label>
    <input type="text" id="{{ id }}" v-model="address" class="border border-gray-400 p-2">

    <!-- slot after input -->
    <slot name="get_location"></slot>

    <!-- slot spin -->
    <slot name="spin"></slot>
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
    },
    address: {
      type: String,
    }
  }
}
</script>

<style>

</style>