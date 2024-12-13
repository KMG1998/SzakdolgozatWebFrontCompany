<template>
  <div class="flex flex-row items-center gap-2 ml-6 max-w-[300px] max-md:ml-2.5">
    <input type="text"
           :id=props.fieldId
           :placeholder="props.placeholder"
           :value="props.modelValue"
           @input="$emit('update:modelValue',$event.target.value)"
           @keyup.enter="props.searchFunction()"
           class="shadow-sm bg-white self-stretch flex shrink-0 h-12  w-full flex-col mt-3 rounded-3xl border-2 border-solid border-black text-center">
    <img
      loading="lazy"
      src="@/assets/images/search_button.png"
      class="w-[55px] cursor-pointer border-2 border-black rounded-full"
      @click="props.searchFunction()"
    />
    <img
      loading="lazy"
      src="@/assets/images/reset_search.png"
      class="w-[55px] cursor-pointer border-2 border-black rounded-full"
      @click="() => {$emit('update:modelValue',undefined); props.searchFunction()}"
    />

  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  fieldId: string,
  placeholder: undefined | string
  modelValue: string | undefined
  searchFunction: Function
}>()

defineEmits(['update:modelValue']);
</script>

<script lang="ts">
export default {
  name: "SearchInput"
}
</script>
