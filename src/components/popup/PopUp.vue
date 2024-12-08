<template>
  <div v-if="props.visibilityVariable" class="fixed z-10 w-full h-full flex items-center justify-center">
    <div @click="$emit('toggle')" class="flex items-center justify-center bg-gray-500 opacity-60 w-full h-full z-20"/>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  visibilityVariable: boolean
}>()
defineEmits(['toggle']);
</script>
<script lang="ts">
export default {
  name: 'PopUp',
}
</script>
