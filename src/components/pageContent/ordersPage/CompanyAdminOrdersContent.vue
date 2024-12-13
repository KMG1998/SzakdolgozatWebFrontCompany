<template>
  <PopUp :visibility-variable="selectedOrderStore.popUpVisible" @toggle="selectedOrderStore.popUpToggleFunction">
    <OrderDetailsPopUp/>
  </PopUp>
  <div
    class="flex flex-col grow shrink-0 mt-6 basis-0 w-fit max-md:max-w-full"
  >
    <SearchInput
      field-id="orderId-search"
      placeholder="foglalás azonosító"
      v-model="searchValue"
      :search-function="searchOrders"
    />
    <div
      class="flex flex-col px-6 pt-8 pb-20 mt-2 rounded-3xl bg-white bg-opacity-80 max-h-[730px] max-w-[1600px] h-max mb-10 overflow-x-auto"
    >
      <div class="max-md:max-w-full text-left">Foglalások</div>
      <div>
        <DataTable :table-data="orderData"
                   header-class="orderTable"
                   button-img-file-name="details_eye.png"
                   :field-list="['id','startDateTime','startAddress','destinationAddress']"
                   :on-details-click="toggleDetailsPopUp"
                   :field-transformers=fieldTransformers
        />
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
import dateFormatter from "@/utils/dateFormatter.ts";
import SearchInput from "@/components/commons/inputs/SearchInput.vue";


const searchValue = ref(undefined)
const orderData = ref(undefined)
const selectedOrderStore = useSelectedOrderStore()

const fieldTransformers = {
  'startDateTime': (dateString) => dateFormatter(dateString)
}

onBeforeMount(() => {
  getOrders()
  selectedOrderStore.popUpToggleFunction = toggleDetailsPopUp
})


async function searchOrders(){
  orderData.value = undefined
  orderData.value = await OrderService.getAllOrders(searchValue.value);
}

async function getOrders() {
  orderData.value = await OrderService.getAllOrders()
}

function toggleDetailsPopUp(selectedOrder) {
  selectedOrderStore.selectedOrder = selectedOrder
  selectedOrderStore.popUpVisible = !selectedOrderStore.popUpVisible
  if (!selectedOrderStore.popUpVisible) {
    searchValue.value = undefined
    getOrders()
  }
}
</script>
