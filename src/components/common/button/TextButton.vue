<template>
  <button type="submit" class="w-4/4 bg-red-400 p-1 mt-2 text-white text-lg">{{ title }}</button>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    title: {
      type: String,
    }
  }
}
</script>

<style>

</style>