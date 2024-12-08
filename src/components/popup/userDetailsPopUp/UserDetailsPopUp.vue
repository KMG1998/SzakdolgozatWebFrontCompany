<template>
  <div v-if="!selectedUserStore.saveInProgress"
       class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <div
      class="gap-5 flex flex-row mb-2 max-md:items-stretch max-md:gap-0"
      v-if="shouldShowMenu"
    >
      <div class="flex grow flex-col items-center" @click="selectedPage = modalPages.userPage">
        <img
          loading="lazy"
          src="@/assets/images/user_button.png"
          class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
        />
      </div>
      <div
        class="flex flex-col items-stretch"
        @click="selectedPage = modalPages.companyPage"
        v-if="shouldShowMenu"
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
        v-if="[3,4].includes(selectedUserStore.selectedUser.typeId)"
      >
        <img
          loading="lazy"
          src="@/assets/images/vehicle_button.png"
          class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
        />
      </div>
    </div>
    <UserDetailsUserPage v-if="selectedPage === modalPages.userPage"/>
    <UserDetailsVehiclePage v-if="selectedPage === modalPages.vehiclePage"/>
    <UserDetailsCompanyPage v-if="selectedPage === modalPages.companyPage"/>
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
import UserDetailsUserPage from "@/components/popup/userDetailsPopUp/pages/UserDetailsUserPage.vue";
import UserDetailsVehiclePage from "@/components/popup/userDetailsPopUp/pages/UserDetailsVehiclePage.vue";
import UserDetailsCompanyPage from "@/components/popup/userDetailsPopUp/pages/UserDetailsCompanyPage.vue";
import {useSelectedUserStore} from "@/stores/selectedUser";
import VehicleService from "@/services/vehicleService";
import CompanyService from "@/services/companyService";
import {onBeforeMount, ref} from "vue";
import {SemipolarSpinner} from 'epic-spinners'

enum modalPages {
  userPage = 1,
  vehiclePage = 2,
  companyPage = 3
}


let selectedPage = ref(modalPages.userPage)
const selectedUserStore = useSelectedUserStore()
const shouldShowMenu = [1,2,3,4].includes(selectedUserStore.selectedUser.typeId)
  &&!selectedUserStore.deleteStarted && !selectedUserStore.editStarted

onBeforeMount(() => {
  getAdditionalData()
})

async function getAdditionalData() {
  if([3,4].includes(selectedUserStore.selectedUser.typeId)){
    selectedUserStore.userVehicle = await VehicleService.findVehicleByDriver(selectedUserStore.selectedUser.id)
  }
  if (shouldShowMenu) {
    selectedUserStore.userCompany = await CompanyService.getCompanyByWorker(selectedUserStore.selectedUser.id)
  }
}
</script>
