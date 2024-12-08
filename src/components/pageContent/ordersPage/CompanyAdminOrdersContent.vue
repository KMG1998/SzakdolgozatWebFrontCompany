<template>
  <PopUp :visibility-variable="selectedOrderStore.popUpVisible" @toggle="selectedOrderStore.popUpToggleFunction">
    <OrderDetailsPopUp/>
  </PopUp>
  <div
      class="flex flex-col grow shrink-0 mt-6 whitespace-nowrap basis-0 w-fit max-md:max-w-full"
  >
    <div class="flex flex-col ml-6 max-w-full w-[100px] max-md:ml-2.5">
      <img
          loading="lazy"
          src="@/assets/images/search_button.png"
          class="self-center w-full aspect-square fill-white"
      />
    </div>
    <div
        class="flex flex-col px-6 pt-8 pb-20 mt-16 rounded-3xl bg-white bg-opacity-80 max-w-[1600px] h-max mb-10 overflow-x-auto"
    >
      <div class="max-md:max-w-full text-left">Foglalások</div>
      <div>
        <DataTable :table-data="orderData" header-class="orderTable" :field-list="['id','startDateTime','startAddress','finishDateTime','destinationAddress']" :on-details-click="toggleDetailsPopUp"
                   button-img-file-name="details_eye.png"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderService from "@/services/orderService";
import DataTable from "@/components/commons/DataTable.vue";
import {onBeforeMount, ref} from "vue";
import {useSelectedOrderStore} from "@/stores/selectedOrder.ts";
import PopUp from "@/components/popup/PopUp.vue";
import OrderDetailsPopUp from "@/components/popup/orderDetailsPopUp/OrderDetailsPopUp.vue";

const orderData = ref(undefined)
const selectedOrderStore = useSelectedOrderStore()

async function getVehicles() {
  orderData.value = await OrderService.getAllOrders()
}

onBeforeMount(() => {
  getVehicles()
  selectedOrderStore.popUpToggleFunction = toggleDetailsPopUp
})

function toggleDetailsPopUp(selectedOrder) {
  selectedOrderStore.selectedOrder = selectedOrder
  selectedOrderStore.popUpVisible = !selectedOrderStore.popUpVisible
  if (!selectedOrderStore.popUpVisible) {
    getVehicles()
  }
}
</script>
