<template>
  <div
    class="flex self-stretch min-w-[500px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
    <div
      class="flex flex-col items-stretch w-full max-md:ml-0 max-md:w-full"
    >
      <div class="flex flex-col grow items-stretch max-md:mt-10 p-5">
        <div class="flex flex-row justify-center items-center">
          <div class="flex flex-col justify-center items-center mr-5">
            <p class="text-xl font-bold text-black w-full">Utas adatai</p>
            <DataWithLabel label="utas azonosító" :data="selectedOrderStore.selectedOrder.customer.id"/>
            <DataWithLabel label="utas neve" :data="selectedOrderStore.selectedOrder.customer.name"/>
            <DataWithLabel label="utas e-mail" :data="selectedOrderStore.selectedOrder.customer.email"/>
          </div>
          <div class="flex flex-col justify-center items-center">
            <p class="text-xl font-bold text-black w-full">Sofőr adatai</p>
            <DataWithLabel label="sofőr azonosító" :data="selectedOrderStore.selectedOrder.driver.id"/>
            <DataWithLabel label="sofőr neve" :data="selectedOrderStore.selectedOrder.driver.name"/>
            <DataWithLabel label="sofőr e-mail" :data="selectedOrderStore.selectedOrder.driver.email"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useI18n} from "vue-i18n";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import {useSelectedOrderStore} from "@/stores/selectedOrder";

const {t} = useI18n()
const selectedOrderStore = useSelectedOrderStore()


</script>
