<template>
  <PopUp :visibility-variable="selectedVehicleStore.popUpVisible" @toggle="selectedVehicleStore.popUpToggleFunction">
    <VehicleDetailsPopUp/>
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
      class="flex flex-col px-6 pt-8 pb-20 mt-16 rounded-3xl bg-white bg-opacity-80 max-md:pl-5 max-md:mt-10 max-md:max-w-full"
    >
      <div class="max-md:max-w-full text-left">Járművek</div>
      <div>
        <DataTable :table-data="vehicleData" header-class="vehicleTable" button-img-file-name="details_eye.png"
                   :on-details-click="toggleDetailsPopUp" :field-list="tableFields"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VehicleService from "@/services/vehicleService";
import DataTable from "@/components/commons/DataTable.vue";
import {onBeforeMount, ref} from "vue";
import {useSelectedVehicleStore} from "@/stores/selectedVehicle.ts";
import VehicleDetailsPopUp from "@/components/popup/vehicleDetailsPopUp/VehicleDetailsPopUp.vue"
import PopUp from "@/components/popup/PopUp.vue";

const vehicleData = ref(undefined)
const selectedVehicleStore = useSelectedVehicleStore()
const tableFields = ['id','seats','color','type','plateNumber']

async function getVehicles() {
  vehicleData.value = await VehicleService.getAllVehicles();
}

onBeforeMount(() => {
  getVehicles()
  selectedVehicleStore.popUpToggleFunction = toggleDetailsPopUp
})


function toggleDetailsPopUp(selectedVehicle) {
  selectedVehicleStore.selectedVehicle = selectedVehicle
  selectedVehicleStore.popUpVisible = !selectedVehicleStore.popUpVisible
  if (!selectedVehicleStore.popUpVisible) {
    getVehicles()
  }
}

</script>
