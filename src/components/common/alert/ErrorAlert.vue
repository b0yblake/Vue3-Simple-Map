<template>
  <div v-show="isError" class="error-alert border border-red-700 bg-red-200 p-2 my-2">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    isError: {
      type: Boolean,
    },
    content: {
      type: String,
      default: "Oops!! Some thing went wrong!"
    }
  }
}
</script>

<style>

</style>