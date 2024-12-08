<template>
  <div v-if="!selectedVehicleStore.saveInProgress"
       class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <div
      class="gap-5 flex flex-row mb-2 max-md:items-stretch max-md:gap-0"
      v-if="!selectedVehicleStore.deleteStarted && !selectedVehicleStore.editStarted"
    >
      <div class="flex grow flex-col items-center" @click="selectedPage = modalPages.driverPage">
        <img
          loading="lazy"
          src="@/assets/images/user_button.png"
          class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
        />
      </div>
      <div
        class="flex flex-col items-stretch"
        @click="selectedPage = modalPages.companyPage"
      >
        <div
          class="flex grow flex-col items-center"
        >
          <img
            loading="lazy"
            src="@/assets/images/company_button.png"
            class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
          />
        </div>
      </div>
      <div
        class="flex flex-col items-stretch max-md:w-full max-md:ml-0"
        @click="selectedPage = modalPages.vehiclePage"
      >
        <img
          loading="lazy"
          src="@/assets/images/vehicle_button.png"
          class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
        />
      </div>
    </div>
    <VehicleDetailsVehiclePage v-if="selectedPage === modalPages.vehiclePage"/>
    <VehicleDetailsCompanyPage v-if="selectedPage === modalPages.companyPage"/>
    <VehicleDetailsDriverPage v-if="selectedPage === modalPages.driverPage"/>
  </div>
  <div v-else class="fixed flex items-center bg-white rounded-full p-2 justify-center opacity-100 z-50">
    <semipolar-spinner
      :animation-duration="2000"
      :size="70"
      color="#57A3EF"
    />
  </div>
</template>
<script setup lang="ts">
import CompanyService from "@/services/companyService";
import {onBeforeMount, ref} from "vue";
import {SemipolarSpinner} from 'epic-spinners'
import {useSelectedVehicleStore} from "@/stores/selectedVehicle";
import UserService from "@/services/userService";
import VehicleDetailsVehiclePage from "@/components/popup/vehicleDetailsPopUp/pages/VehicleDetailsVehiclePage.vue";
import VehicleDetailsCompanyPage from "@/components/popup/vehicleDetailsPopUp/pages/VehicleDetailsCompanyPage.vue";
import VehicleDetailsDriverPage from "@/components/popup/vehicleDetailsPopUp/pages/VehicleDetailsDriverPage.vue";

enum modalPages {
  driverPage = 1,
  vehiclePage = 2,
  companyPage = 3
}

let selectedPage = ref(modalPages.vehiclePage)
const selectedVehicleStore = useSelectedVehicleStore()

onBeforeMount(() => {
  getAdditionalData()
})

async function getAdditionalData() {
  selectedVehicleStore.vehicleDriver = await UserService.findByVehicle(selectedVehicleStore.selectedVehicle.id)
  selectedVehicleStore.vehicleCompany = await CompanyService.getCompanyForVehicle(selectedVehicleStore.selectedVehicle.id)
}
</script>
