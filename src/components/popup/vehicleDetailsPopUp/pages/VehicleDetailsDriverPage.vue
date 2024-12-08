<template>
  <div
    class="flex self-stretch min-w-[500px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
    <div class="w-full" v-if="selectedVehicleStore.vehicleDriver != undefined">
      <div
        class="flex flex-col items-center w-full max-md:ml-0 max-md:w-full"
        v-if="!selectedVehicleStore.unlinkStarted"
      >
        <div class="flex flex-row justify-center items-center">
          <p class="text-xl font-bold text-black w-full">Sofőr adatai</p>
          <div
            class="w-[40px] h-[40px] absolute left-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
            v-if="!selectedVehicleStore.unlinkStarted">
            <img src="@/assets/images/unlink.png"
                 @click="selectedVehicleStore.unlinkStarted = true">
          </div>
        </div>
        <DataWithLabel label="Sofőr ID" :data="selectedVehicleStore.vehicleDriver.id"/>
        <DataWithLabel label="sofőr e-mail" :data="selectedVehicleStore.vehicleDriver.email"/>
        <DataWithLabel label="sofőr neve" :data="selectedVehicleStore.vehicleDriver.name"/>
        <DataWithLabel label="sofőr típusa" :data="convertUserType(selectedVehicleStore.vehicleDriver.typeId)"/>
      </div>
      <div v-else class="flex flex-col justify-around items-center px-2">
        <p class="text-xl font-bold text-black w-full">Biztos leválasztja a sofőrt?</p>
        <div class="flex flex-row w-full justify-around gap-2">
          <button type="button"
                  @click="unlinkUser"
                  class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-warning-red rounded-3xl border-2 border-black border-solid"
          >Leválasztás
          </button>
          <button type="button"
                  @click="selectedVehicleStore.unlinkStarted = false"
                  class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-black border-solid"
          >Mégse
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-stretch px-[10px]">
      <div class="text-xl text-black font-bold">Sofőr hozzárendelése</div>
      <DataTable :table-data="users" header-class="userTable" button-img-file-name="link.png"
                 :on-details-click="onLinkClicked" :field-list="['id','name','email']"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useI18n} from "vue-i18n";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import {useSelectedVehicleStore} from "@/stores/selectedVehicle";
import {convertUserType} from "@/utils/valueConverter";
import {onBeforeMount, ref} from "vue";
import * as User from "@/types/User";
import DataTable from "@/components/commons/DataTable.vue";
import UserService from "@/services/userService";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import VehicleService from "@/services/vehicleService";

const {t} = useI18n()
const selectedVehicleStore = useSelectedVehicleStore()

const users = ref<Array<User>>()

onBeforeMount(async () => {
  console.log(selectedVehicleStore.vehicleDriver)
  if (selectedVehicleStore.vehicleDriver === undefined) {
    users.value = await UserService.getAllDrivers()
  }
})

async function onLinkClicked(selectedUser: User) {
  selectedVehicleStore.saveInProgress = true
  const success = await VehicleService.connectUserToVehicle(selectedUser.id, selectedVehicleStore.selectedVehicle.id)
  if (success) {
    selectedVehicleStore.vehicleDriver = selectedUser
    selectedVehicleStore.saveInProgress = false
    toast(t('toastMessages.linkSuccess'), ToastConfigs.successToastConfig)
    return
  }
  toast(t('toastMessages.linkFail'), ToastConfigs.errorToastConfig)
  selectedVehicleStore.saveInProgress = false
}

async function unlinkUser() {
  selectedVehicleStore.saveInProgress = true
  const success = await VehicleService.unlinkVehicleFromUser(selectedVehicleStore.selectedVehicle.id)
  if (!success) {
    toast(t('toastMessages.unlinkFail'), ToastConfigs.errorToastConfig)
    return
  }
  selectedVehicleStore.vehicleDriver = undefined
  selectedVehicleStore.unlinkStarted = false
  selectedVehicleStore.saveInProgress = false
  toast(t('toastMessages.unlinkSuccess'), ToastConfigs.successToastConfig)
}

</script>
