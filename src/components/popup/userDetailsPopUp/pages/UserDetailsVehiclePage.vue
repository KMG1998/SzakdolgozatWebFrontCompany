<template>
  <form v-if="!selectedUserStore.unlinkStarted">
    <div
      class="flex flex-col items-stretch w-[50%] min-w-[500px] max-md:ml-0 max-md:w-full px-[10px]"
      v-if="selectedUserStore.userVehicle !== undefined"
    >
      <div class="flex flex-col items-stretch max-md:mt-10">
        <div class="text-xl text-black font-bold">jármű adatai</div>
        <div
          class="w-[40px] h-[40px] absolute left-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
          v-if="!selectedUserStore.editStarted && !selectedUserStore.unlinkStarted">
          <img src="@/assets/images/unlink.png"
               @click="selectedUserStore.unlinkStarted = true">
        </div>
        <div class="flex flex-col items-center mt-3">
          <DataWithLabel label="ülések száma" :data="selectedUserStore.userVehicle.seats"/>
          <DataWithLabel label="rendszám" :data="selectedUserStore.userVehicle.plateNumber"/>
          <DataWithLabel label="jármű típus" :data="selectedUserStore.userVehicle.type"/>
          <DataWithLabel label="jármű színe" :data="selectedUserStore.userVehicle.color"/>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-stretch px-[10px]">
      <div class="text-xl text-black font-bold">jármű hozzárendelése</div>
      <DataTable :table-data="nonLinkedVehicles" header-class="vehicleTable" button-img-file-name="link.png"
                 :on-details-click="onLinkClicked"/>
    </div>
  </form>
  <div v-else class="flex flex-col justify-around items-center px-2">
    <p class="text-xl font-bold text-black w-full">Biztos leválasztja a járművet?</p>
    <div class="flex flex-row w-full justify-around gap-2">
      <button type="button"
              @click="unlinkVehicle"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-warning-red rounded-3xl border-2 border-black border-solid"
      >Leválasztás
      </button>
      <button type="button"
              @click="selectedUserStore.unlinkStarted = false"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-black border-solid"
      >Mégse
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSelectedUserStore} from "@/stores/selectedUser.ts";
import {onBeforeMount, ref} from "vue";
import {Vehicle} from "@/types/Vehicle";
import DataTable from "@/components/commons/DataTable.vue";
import VehicleService from "@/services/vehicleService";
import {toast} from "vue3-toastify";
import {useI18n} from "vue-i18n";
import ToastConfigs from "@/utils/toastConfigs";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";

const nonLinkedVehicles = ref<Array<Vehicle>>()
const selectedUserStore = useSelectedUserStore()
const {t} = useI18n()

onBeforeMount(async () => {
  if (selectedUserStore.userVehicle === undefined) {
    nonLinkedVehicles.value = await VehicleService.findNonUserLinkedVehicles()
  }
})

async function onLinkClicked(selectedVehicle: Vehicle) {
  selectedUserStore.saveInProgress = true
  const success = await VehicleService.connectUserToVehicle(selectedUserStore.selectedUser.id, selectedVehicle.id)
  if (success) {
    selectedUserStore.userVehicle = await VehicleService.findVehicleById(selectedVehicle.id)
    selectedUserStore.saveInProgress = false
    toast(t('toastMessages.linkSuccess'),ToastConfigs.successToastConfig)
    return
  }
  toast(t('toastMessages.linkFail'),ToastConfigs.errorToastConfig)
  selectedUserStore.saveInProgress = false
}

async function unlinkVehicle() {
  selectedUserStore.saveInProgress = true
  const success = await VehicleService.unlinkVehicleFromUser(selectedUserStore.userVehicle.id)
  if (!success) {
    toast(t('toastMessages.unlinkFail'),ToastConfigs.errorToastConfig)
    return
  }
  selectedUserStore.userVehicle = undefined
  selectedUserStore.unlinkStarted = false
  selectedUserStore.saveInProgress = false
  toast(t('toastMessages.unlinkSuccess'),ToastConfigs.successToastConfig)
}
</script>
