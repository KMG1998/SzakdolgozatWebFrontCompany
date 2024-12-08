<template>
  <p class="w-max p-2 text-red-500 font-bold">
    {{ error }}
  </p>
</template>

<script setup lang="ts">
defineProps({
  error: String,
})
</script>
