<template>
  <div
    class="flex self-stretch min-w-[500px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
    <div class="flex flex-col grow items-stretch max-md:mt-10">
      <p class="text-xl font-bold text-black w-full">Fuvar adatai</p>
      <DataWithLabel label="fuvar azonosító" :data="selectedOrderStore.selectedOrder.id"/>
      <DataWithLabel label="Létrehozás időpontja" :data="formatDate(selectedOrderStore.selectedOrder.startDateTime)"/>
      <DataWithLabel label="Lezárás időpontja" :data="formatDate(selectedOrderStore.selectedOrder.finishDateTime)"/>
      <DataWithLabel label="Indulási pozíció" :data="selectedOrderStore.selectedOrder.startAddress"/>
      <DataWithLabel label="Úticél" :data="selectedOrderStore.selectedOrder.destinationAddress"/>
      <DataWithLabel label="Fuvar költség" :data="selectedOrderStore.selectedOrder.price"/>
      <DataWithLabel label="Állapot" :data="convertClosure(selectedOrderStore.selectedOrder.closureType)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSelectedOrderStore} from "@/stores/selectedOrder";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import {convertClosure} from "@/utils/valueConverter";
import formatDate from '@/utils/dateFormatter'

const selectedOrderStore = useSelectedOrderStore()
</script>

<script lang="ts">
export default {
  name: "OrderDetailsPage"
}
</script>
