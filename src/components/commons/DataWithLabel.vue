<template>
  <div class="flex flex-col items-stretch mt-3 max-md:pl-5">
    <label class="self-center text-center text-xl text-black  whitespace-nowrap">
      {{props.label}}
    </label>
    <p class="mt-3 text-center">
      {{ props.data }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label:string,
  data: string | number,
}>()
</script>
<script lang="ts">
export default {
  name: "DataWithLabel"
}
</script>
