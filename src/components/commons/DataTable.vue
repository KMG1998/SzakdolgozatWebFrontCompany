<template>
  <table v-if="tableData !== undefined && tableData.length > 0" class="border-2 border-collapse border-black w-full">
    <thead>
    <tr>
      <th
        v-for="(header, i) in (fieldList === undefined ? Object.keys(tableData[0]) : fieldList)"
        :key="`${header}${i}`"
        class="border-2 border-black px-2"
      >
        {{ $t(`tableHeaders.${headerClass}.${header}`) }}
      </th>
      <th v-if="buttonImgFileName !== undefined" class="border-2 border-black"/>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="entity in tableData"
      :key="`entity-${entity.id}`"
      class="border-2 border-black"
    >
      <td v-if="fieldList === undefined" v-for="(data, dataKey) in entity" :key="`${data}-${dataKey}`" class="border-2 border-black px-2 text-ellipsis">
        {{printData(data,dataKey)}}
      </td>
      <td v-else v-for="(field, i) in fieldList" :key="`${field}-${i}`" class="border-2 border-black px-2 text-ellipsis">
        {{ printData(entity[field],field)}}
      </td>
      <td v-if="buttonImgFileName !== undefined" class="min-w-[40px]">
        <img :src="getImageUrl()" @click="onDetailsClick(entity)" class="m-auto cursor-pointer p-2">
      </td>
    </tr>
    </tbody>
  </table>
  <div v-else-if="tableData === undefined" class="flex items-center justify-center pt-2">
    <semipolar-spinner
      :animation-duration="2000"
      :size="80"
      color="#57A3EF"
    />
  </div>
</template>
<script setup lang="ts">
import {SemipolarSpinner} from "epic-spinners";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

// noinspection TypeScriptValidateTypes
const props = defineProps({
  tableData: Array,
  headerClass: String,
  onDetailsClick: Function,
  buttonImgFileName: String,
  fieldList: Array,
  fieldTransformers: Object
})

function printData(data: any, fieldKey:string): string {
  if(data === null || data === 'null'){
    return ''
  }
  if(props.fieldTransformers != undefined && Object.keys(props.fieldTransformers).includes(fieldKey)){
    return props.fieldTransformers[fieldKey](data)
  }
  switch (typeof data) {
    case "boolean" :
      return t(data.toString());
    default:
      return data;
  }
}

function getImageUrl() {
  return new URL(`../../assets/images/${props.buttonImgFileName}`, import.meta.url)
}
</script>

<script lang="ts">
export default {
  name:'DataTable'
}
</script>
