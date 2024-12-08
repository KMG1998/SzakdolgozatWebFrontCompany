<template>
  <form @submit.prevent class="flex flex-col" v-if="!selectedVehicleStore.deleteStarted">
    <div
      class="flex flex col self-stretch min-w-[1000px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
      <div class="flex flex-col grow items-stretch max-md:mt-10">
        <div class="flex flex-row justify-center items-center">
          <p class="text-xl font-bold text-black w-full">Jármű adatai</p>
          <div
            class="w-[40px] h-[40px] absolute right-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
            v-if="!selectedVehicleStore.editStarted && !selectedVehicleStore.deleteStarted">
            <img src="@/assets/images/edit_button.png"
                 @click="selectedVehicleStore.editStarted = true">
          </div>
          <div
            class="w-[40px] h-[40px] absolute left-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
            v-if="!selectedVehicleStore.editStarted && !selectedVehicleStore.deleteStarted">
            <img src="@/assets/images/delete_button.png"
                 @click="selectedVehicleStore.deleteStarted = true">
          </div>
        </div>
        <div class="flex flex-row"></div>
        <div class="flex grow items-stretch w-[100%] max-md:ml-0 max-md:w-full">
          <div class="flex grow flex-col items-stretch mt-3 max-md:pl-5 mr-2">
            <DataWithLabel label="ID" :data="selectedVehicleStore.selectedVehicle.id"/>
            <InputField
              field-id="seats"
              label="ülések száma"
              type="number"
              v-model="seats"
              v-bind=seatsProps
              :meta="meta"
              :error="errors.seats"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <InputField
              field-id="plateNum"
              label="rendszám"
              type="text"
              v-model="plateNum"
              v-bind=plateNumProps
              :meta="meta"
              :error="errors.plateNum"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <InputField
              field-id="carType"
              label="jármű típus"
              type="text"
              v-model="carType"
              v-bind=carTypeProps
              :meta="meta"
              :error="errors.carType"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <InputField
              field-id="carColor"
              label="jármű színe"
              type="text"
              v-model="color"
              v-bind=colorProps
              :meta="meta"
              :error="errors.color"
              :readonly="!selectedVehicleStore.editStarted"
            />
          </div>
          <div class="flex grow flex-col items-stretch mt-3 max-md:pl-5">
            <DataWithLabel label="Biztosítás ID" :data="selectedVehicleStore.selectedVehicle.insurance.id"/>
            <DateSelector
              field-id="insuranceValidUntil"
              label="Biztosítás lejárati dátum"
              v-model="insuranceValidUntil"
              v-bind=insuranceValidUntilProps
              :meta="meta"
              :error="errors.insuranceValidUntil"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <InputField
              field-id="insuranceIssuer"
              label="Biztosító neve"
              type="text"
              v-model="insuranceIssuer"
              v-bind=insuranceIssuerProps
              :meta="meta"
              :error="errors.insuranceIssuer"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <InputField
              field-id="insuranceNumber"
              label="Biztosítás száma"
              type="text"
              v-model="insuranceNumber"
              v-bind=insuranceNumberProps
              :meta="meta"
              :error="errors.insuranceNumber"
              :readonly="!selectedVehicleStore.editStarted"
            />
            <DateSelector
              field-id="registrationValidUntil"
              label="Forgalmi engedély lejárata"
              v-model="registrationValidUntil"
              v-bind=registrationValidUntilProps
              :meta="meta"
              :error="errors.registrationValidUntil"
              :readonly="!selectedVehicleStore.editStarted"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="self-stretch mt-9 w-full bg-black min-h-[2px] max-md:max-w-full"
      v-if="selectedVehicleStore.editStarted"
    ></div>
    <div class="flex flex-row justify-around items-center" v-if="selectedVehicleStore.editStarted">
      <button type="button"
              @click="saveVehicleChanges"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-green-400 border-solid w-[200px] max-md:px-5"
      >Mentés
      </button>
      <button type="button"
              @click="cancelEdit"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-red-600 border-solid w-[200px] max-md:px-5"
      >Mégse
      </button>
    </div>
  </form>
  <div v-else class="flex flex-col justify-around items-center px-2">
    <p class="text-xl font-bold text-black w-full">Biztos törli a járművet?</p>
    <div class="flex flex-row w-full justify-around gap-2">
      <button type="button"
              @click="deleteVehicle"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-warning-red rounded-3xl border-2 border-black border-solid"
      >Törlés
      </button>
      <button type="button"
              @click="selectedVehicleStore.deleteStarted = false"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-black border-solid"
      >Mégse
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useSelectedVehicleStore} from "@/stores/selectedVehicle";
import {toTypedSchema} from "@vee-validate/yup";
import Validators from "@/utils/valdiators";
import {useForm} from "vee-validate";
import {object} from "yup";
import InputField from "@/components/commons/inputs/InputField.vue"
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import {onBeforeMount} from "vue";
import DateSelector from "@/components/commons/inputs/DateSelector.vue";
import VehicleService from "@/services/vehicleService";
import {toast, ToastOptions} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";

const selectedVehicleStore = useSelectedVehicleStore()
const {t} = useI18n()

const schema = toTypedSchema(object({
  seats: Validators.minAmount(2),
  plateNum: Validators.minLength(6),
  carType: Validators.minLength(3),
  color: Validators.minLength(3),
  insuranceValidUntil: Validators.dateRequired(),
  insuranceIssuer: Validators.minLength(3),
  insuranceNumber: Validators.minLength(3),
  registrationValidUntil: Validators.dateRequired(),
}));

const {errors, meta, defineField} = useForm({validationSchema: schema})
const [seats, seatsProps] = defineField('seats')
const [plateNum, plateNumProps] = defineField('plateNum')
const [carType, carTypeProps] = defineField('carType')
const [color, colorProps] = defineField('color')
const [insuranceValidUntil, insuranceValidUntilProps] = defineField('insuranceValidUntil')
const [insuranceIssuer, insuranceIssuerProps] = defineField('insuranceIssuer')
const [insuranceNumber, insuranceNumberProps] = defineField('insuranceNumber')
const [registrationValidUntil, registrationValidUntilProps] = defineField('registrationValidUntil')

onBeforeMount(() => {
  setDefaultValues()
})

async function saveVehicleChanges() {
  selectedVehicleStore.saveInProgress = true;
  const updatedVehicle = await VehicleService.updateVehicle(selectedVehicleStore.selectedVehicle.insurance.id, selectedVehicleStore.selectedVehicle.id,
    seats.value, plateNum.value, carType.value, color.value,
    insuranceValidUntil.value, insuranceIssuer.value, insuranceNumber.value, registrationValidUntil.value)
  selectedVehicleStore.saveInProgress = false;
  if (updatedVehicle) {
    selectedVehicleStore.selectedVehicle = updatedVehicle
    selectedVehicleStore.editStarted = false
    toast(t('toastMessages.saveSuccess'), ToastConfigs.successToastConfig as ToastOptions)
    return
  }
  toast(t('toastMessages.saveFail'), ToastConfigs.errorToastConfig)
}

async function deleteVehicle() {
  selectedVehicleStore.saveInProgress = true;
  const deleteSuccess = await VehicleService.deleteVehicle(selectedVehicleStore.selectedVehicle.id)
  selectedVehicleStore.saveInProgress = false
  if (deleteSuccess) {
    selectedVehicleStore.popUpToggleFunction()
    toast(t('toastMessages.deleteSuccess'), ToastConfigs.successToastConfig as ToastOptions)
    selectedVehicleStore.$reset()
    return
  }
  selectedVehicleStore.deleteStarted.value = false;
  toast(t('toastMessages.deleteFail'), ToastConfigs.errorToastConfig)
}

function cancelEdit() {
  selectedVehicleStore.editStarted = false
  setDefaultValues()
}

function setDefaultValues() {
  seats.value = selectedVehicleStore.selectedVehicle.seats
  plateNum.value = selectedVehicleStore.selectedVehicle.plateNumber
  carType.value = selectedVehicleStore.selectedVehicle.type
  color.value = selectedVehicleStore.selectedVehicle.color
  insuranceValidUntil.value = selectedVehicleStore.selectedVehicle.insurance.insuranceValidUntil
  insuranceIssuer.value = selectedVehicleStore.selectedVehicle.insurance.issuer
  registrationValidUntil.value = selectedVehicleStore.selectedVehicle.insurance.registrationValidUntil
  insuranceNumber.value = selectedVehicleStore.selectedVehicle.insurance.insuranceNumber
}
</script>
