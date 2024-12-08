<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <form @submit.prevent>
      <div class="w-full min-w-[500px] max-w-[1100px] max-md:max-w-full px-[10px]">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
          <div
            class="flex flex-col items-stretch w-[100%] min-w-[450px] max-md:ml-0 max-md:w-full"
          >
            <div class="flex flex-col grow items-stretch max-md:mt-10">
              <p class="text-xl text-black">új cég adatai</p>
              <div class="flex flex-col items-stretch mt-9 max-md:pl-5">
                <InputField
                  field-id="companyEmail"
                  label="céges e-mail"
                  type="email"
                  v-model=companyEmail
                  v-bind=companyEmailProps
                  :meta="meta"
                  :error="errors.companyEmail"
                  :readonly="false"
                />
                <InputField
                  field-id="companyName"
                  label="cég neve"
                  type="text"
                  v-model=companyName
                  v-bind=companyNameProps
                  :meta="meta"
                  :error="errors.companyName"
                  :readonly="false"
                />
                <InputField
                  field-id="companyName"
                  label="cég telefonszáma"
                  type="tel"
                  v-model=companyPhone
                  v-bind=companyPhoneProps
                  :meta="meta"
                  :error="errors.companyPhone"
                  :readonly="false"
                />
                <InputField
                  field-id="companyAddress"
                  label="cég telephelye"
                  type="text"
                  v-model=companyAddress
                  v-bind=companyAddressProps
                  :meta="meta"
                  :error="errors.companyAddress"
                  :readonly="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="self-stretch mt-9 w-full bg-black min-h-[2px] max-md:max-w-full"
      ></div>
      <button type="button"
              @click="createCompany"
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
import CompanyService from "@/services/companyService";
import {SemipolarSpinner} from 'epic-spinners'
import {toTypedSchema} from "@vee-validate/yup";
import Validators from "@/utils/valdiators";
import {useForm} from "vee-validate";
import {object} from "yup";
import {ref} from "vue";
import InputField from "@/components/commons/inputs/InputField.vue"
import {toast, ToastOptions} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";

const schema = toTypedSchema(object({
  companyEmail: Validators.emailValidator(),
  companyName: Validators.minLength(3),
  companyPhone: Validators.phoneValidator(),
  companyAddress: Validators.minLength(6)
}));

const {errors, meta, defineField} = useForm({validationSchema: schema})
const [companyEmail, companyEmailProps] = defineField('companyEmail')
const [companyName, companyNameProps] = defineField('companyName')
const [companyPhone, companyPhoneProps] = defineField('companyPhone')
const [companyAddress, companyAddressProps] = defineField('companyAddress')
const createInProgress = ref(false)


async function createCompany() {
  createInProgress.value = true
  const success = await CompanyService.createCompany(companyName.value, companyAddress.value, companyPhone.value, companyEmail.value)
  createInProgress.value = false
  if(success){
    toast('Sikeres létrehozás',ToastConfigs.successToastConfig as ToastOptions)
    return
  }
  toast('Sikertelen létrehozás',ToastConfigs.errorToastConfig)
}


</script>
