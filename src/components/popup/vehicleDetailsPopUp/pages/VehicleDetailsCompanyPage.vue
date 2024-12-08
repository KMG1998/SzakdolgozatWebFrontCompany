<template>
  <form v-if="!selectedVehicleStore.unlinkStarted">
    <div
      class="flex flex-col items-stretch w-[50%] min-w-[500px] max-md:ml-0 max-md:w-full px-[10px]"
      v-if="selectedVehicleStore.vehicleCompany !== undefined"
    >
      <div class="flex flex-col items-stretch max-md:mt-10">
        <div class="text-xl text-black font-bold">jármű cég adatai</div>
        <div
          class="w-[40px] h-[40px] absolute left-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
          v-if="!selectedVehicleStore.unlinkStarted">
          <img src="@/assets/images/unlink.png"
               @click="selectedVehicleStore.unlinkStarted = true">
        </div>
        <div class="flex flex-col items-center mt-3">
         <DataWithLabel label="cég azonosító" :data="selectedVehicleStore.vehicleCompany.id"/>
         <DataWithLabel label="cég neve" :data="selectedVehicleStore.vehicleCompany.companyName"/>
         <DataWithLabel label="cég telephelye" :data="selectedVehicleStore.vehicleCompany.officeAddress"/>
         <DataWithLabel label="cég telefonszáma" :data="selectedVehicleStore.vehicleCompany.officeTel"/>
         <DataWithLabel label="cég e-mail" :data="selectedVehicleStore.vehicleCompany.officeEmail"/>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-stretch px-[10px]">
      <div class="text-xl text-black font-bold">Cég hozzárendelése</div>
      <DataTable :table-data="companies" header-class="companiesTable" button-img-file-name="link.png"
                 :on-details-click="onLinkClicked" :field-list="['id','companyName','officeAddress']" />
    </div>
  </form>
  <div v-else class="flex flex-col justify-around items-center px-2">
    <p class="text-xl font-bold text-black w-full">Biztos leválasztja a céget?</p>
    <div class="flex flex-row w-full justify-around gap-2">
      <button type="button"
              @click="unlinkCompany"
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
</template>

<script setup lang="ts">
import * as Company  from "@/types/Company";
import {useSelectedUserStore} from "@/stores/selectedUser";
import {useI18n} from "vue-i18n";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import CompanyService from "@/services/companyService";
import {onBeforeMount,ref} from "vue";
import DataTable from "@/components/commons/DataTable.vue";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import {useSelectedVehicleStore} from "@/stores/selectedVehicle";

const selectedVehicleStore = useSelectedVehicleStore()
const {t} = useI18n()
const companies = ref<Array<Company>>()

onBeforeMount(async () => {
  if (selectedVehicleStore.vehicleCompany === undefined) {
    companies.value = await CompanyService.getAllCompany()
  }
})

async function onLinkClicked(selectedCompany: Company) {
  selectedVehicleStore.saveInProgress = true
  const success = await CompanyService.connectCompanyToVehicle(selectedVehicleStore.selectedVehicle.id, selectedCompany.id)
  if (success) {
    selectedVehicleStore.vehicleCompany = selectedCompany
    selectedVehicleStore.saveInProgress = false
    toast(t('toastMessages.linkSuccess'),ToastConfigs.successToastConfig)
    return
  }
  toast(t('toastMessages.linkFail'),ToastConfigs.errorToastConfig)
  selectedVehicleStore.saveInProgress = false
}

async function unlinkCompany() {
  selectedVehicleStore.saveInProgress = true
  const success = await CompanyService.unlinkCompanyFromVehicle(selectedVehicleStore.selectedVehicle.id)
  if (!success) {
    toast(t('toastMessages.unlinkFail'),ToastConfigs.errorToastConfig)
    return
  }
  selectedVehicleStore.vehicleCompany = undefined
  selectedVehicleStore.unlinkStarted = false
  selectedVehicleStore.saveInProgress = false
  toast(t('toastMessages.unlinkSuccess'),ToastConfigs.successToastConfig)
}
</script>

<script lang="ts">
export default {
  name: "UserDetailsCompanyPage",
}
</script>
