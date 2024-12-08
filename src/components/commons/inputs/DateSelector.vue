<template>
  <div class="flex flex-col items-center">
    <label v-if="props.label != undefined" class="mt-6 text-xl text-center text-black">
      {{ props.label }}
    </label>
    <input
      class="shadow-sm bg-white self-stretch flex shrink-0 h-12 w-full flex-col mt-3 pt-2 px-2 rounded-3xl border-2 border-solid border-black text-center"
      :id=props.fieldId
      type='date'
      v-bind="$attrs"
      :value="props.modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
      :readonly="props.readonly"
    >
    <FieldError :error="error" v-if="error && meta.touched"/>
  </div>
</template>

<script setup lang="ts">
import FieldError from "@/components/commons/FieldError.vue";


defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  fieldId: string,
  label: undefined | string
  modelValue: string | number | undefined
  error: string | undefined
  meta: object
  readonly: boolean
}>()

defineEmits(['update:modelValue']);
</script>
