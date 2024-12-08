<template>
  <div class="flex flex-col items-center">
    <label v-if="props.label != undefined" class="mt-6 text-xl text-center text-black">
      {{ props.label }}
    </label>
    <select
      class="shadow-sm bg-white self-stretch flex shrink-0 h-12  w-full rounded-3xl border-2 border-solid border-black text-center disabled: text-black disabled:opacity-100 disabled:appearance-none"
      :id=props.fieldId
      v-bind="$attrs"
      :value="props.modelValue"
      :disabled="props.disabled"
      @input="$emit('update:modelValue',$event.target.value)"
    >
      <option v-for="(data) in props.elements" :value="data['value']">{{ data['label'] }}</option>
    </select>
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
  modelValue: any
  elements: { value: any, label: string }[]
  error: string | undefined
  meta: object
  disabled: boolean
}>()

defineEmits(['update:modelValue']);
</script>
