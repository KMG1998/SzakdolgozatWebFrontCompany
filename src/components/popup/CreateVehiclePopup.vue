<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <form @submit.prevent>
      <div class="w-full min-w-[1000px] max-w-[1100px] max-md:max-w-full px-[10px]">
        <p class="text-xl text-black">új jármű adatai</p>
        <div class="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
          <div class="flex grow items-stretch w-[100%] max-md:ml-0 max-md:w-full">
            <div class="flex grow flex-col items-stretch mt-9 max-md:pl-5 mr-2">
              <InputField
                field-id="seats"
                label="ülések száma"
                type="number"
                v-model="seats"
                v-bind=seatsProps
                :meta="meta"
                :error="errors.seats"
                :readonly = false
              />
              <InputField
                field-id="plateNum"
                label="rendszám"
                type="text"
                v-model="plateNum"
                v-bind=plateNumProps
                :meta="meta"
                :error="errors.plateNum"
                :readonly = false
              />
              <InputField
                field-id="carType"
                label="jármű típus"
                type="text"
                v-model="carType"
                v-bind=carTypeProps
                :meta="meta"
                :error="errors.carType"
                :readonly = false
              />
              <InputField
                field-id="carColor"
                label="jármű színe"
                type="text"
                v-model="color"
                v-bind=colorProps
                :meta="meta"
                :error="errors.color"
                :readonly = false
              />
              <InputField
                field-id="companyId"
                label="Cég azonosító"
                type="text"
                v-model="companyId"
                v-bind=companyIdProps
                :meta="meta"
                :error="errors.companyId"
                :readonly = false
              />
            </div>
            <div class="flex grow flex-col items-stretch mt-9 max-md:pl-5">
              <DateSelector
                field-id="insuranceValidUntil"
                label="Biztosítás lejárati dátum"
                v-model="insuranceValidUntil"
                v-bind=insuranceValidUntilProps
                :meta="meta"
                :error="errors.insuranceValidUntil"
                :readonly = false
              />
              <InputField
                field-id="insuranceIssuer"
                label="Biztosító neve"
                type="text"
                v-model="insuranceIssuer"
                v-bind=insuranceIssuerProps
                :meta="meta"
                :error="errors.insuranceIssuer"
                :readonly = false
              />
              <InputField
                field-id="insuranceNumber"
                label="Biztosítás száma"
                type="text"
                v-model="insuranceNumber"
                v-bind=insuranceNumberProps
                :meta="meta"
                :error="errors.insuranceNumber"
                :readonly = false
              />
              <DateSelector
                field-id="registrationValidUntil"
                label="Forgalmi engedély lejárata"
                v-model="registrationValidUntil"
                v-bind=registrationValidUntilProps
                :meta="meta"
                :error="errors.registrationValidUntil"
                :readonly=false
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="self-stretch mt-9 w-full bg-black min-h-[2px] max-md:max-w-full"
      ></div>
      <button type="button"
              @click="createVehicle"
              v-if="!createInProgress"
              class="justify-center items-center px-16 py-2 mt-7 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-black border-solid w-[403px] max-md:px-5"
      >Létrehozás
      </button>
      <div v-else class="flex items-center justify-center pt-2">
        <semipolar-spinner
          :animation-duration="2000"
          :size="40"
          color="#57A3EF"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/yup";
import {object} from "yup";
import Validators from "@/utils/valdiators";
import {useI18n} from "vue-i18n";
import {useForm} from "vee-validate";
import {ref} from "vue";
import {SemipolarSpinner} from "epic-spinners";
import VehicleService from "@/services/vehicleService";
import ToastConfigs from "@/utils/toastConfigs";
import {toast} from "vue3-toastify";
import InputField from "@/components/commons/inputs/InputField.vue";
import DateSelector from "@/components/commons/inputs/DateSelector.vue";

const {t} = useI18n()

const schema = toTypedSchema(object({
  seats: Validators.minAmount(2),
  plateNum: Validators.minLength(6),
  carType: Validators.minLength(3),
  color: Validators.minLength(3),
  companyId: Validators.exactLength(36),
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
const [companyId, companyIdProps] = defineField('companyId')
const [insuranceValidUntil, insuranceValidUntilProps] = defineField('insuranceValidUntil')
const [insuranceIssuer, insuranceIssuerProps] = defineField('insuranceIssuer')
const [insuranceNumber, insuranceNumberProps] = defineField('insuranceNumber')
const [registrationValidUntil, registrationValidUntilProps] = defineField('registrationValidUntil')
const createInProgress = ref<boolean>(false)

async function createVehicle() {
  if (meta.value.valid) {
    createInProgress.value = true
    const newVehicle = await VehicleService.createVehicle(companyId.value,seats.value, plateNum.value, carType.value, color.value,
      insuranceValidUntil.value,insuranceIssuer.value,insuranceNumber.value,registrationValidUntil.value);
    createInProgress.value = false
    if (newVehicle !== undefined) {
      toast("Sikeres létrehozás", ToastConfigs.successToastConfig)
      return
    }
    toast("Sikertelen létrehozás", ToastConfigs.errorToastConfig)
  }
}


</script>
