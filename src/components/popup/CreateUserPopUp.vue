<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <Form @submit.prevent>
      <div class="w-full min-w-[500px] max-md:max-w-full px-[10px]">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
          <div
            class="flex flex-col items-stretch w-[100%] min-w-[450px] max-md:ml-0 max-md:w-full"
          >
            <div class="flex flex-col grow items-stretch max-md:mt-10">
              <p class="text-xl text-black">új felhasználó adatai</p>
              <div class="flex flex-col items-stretch mt-9 max-md:pl-5">
                <InputField
                  field-id="email"
                  label="felhasználó e-mail"
                  type="text"
                  v-model=email
                  v-bind=emailProps
                  :meta="meta"
                  :error="errors.email"
                  :readonly=false
                />
                <InputField
                  field-id="name"
                  label="felhasználó neve"
                  type="text"
                  v-model=nameOfUser
                  v-bind=nameOfUserProps
                  :meta="meta"
                  :error="errors.nameOfUser"
                  :readonly=false
                />
                <Selector
                  field-id="userType"
                  label="típus"
                  v-model=userType
                  v-bind=userTypeProps
                  :meta="meta"
                  :error="errors.userType"
                  :elements=selectorElements
                  :disabled=false
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
              @click="createUser"
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
    </Form>
  </div>
</template>

<script setup lang="ts">
import UserService from "@/services/userService";
import {ref} from "vue";
import {SemipolarSpinner} from "epic-spinners";
import {toast, ToastOptions} from "vue3-toastify";
import {useI18n} from "vue-i18n";
import ToastConfigs from "@/utils/toastConfigs";
import {Form, useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/yup";
import {object} from "yup";
import Validators from "@/utils/valdiators";
import InputField from "@/components/commons/inputs/InputField.vue"
import Selector from "@/components/commons/inputs/ListSelector.vue"

const {t} = useI18n()

const schema = toTypedSchema(object({
  userType: Validators.userTypeValidator(),
  email: Validators.emailValidator(),
  nameOfUser: Validators.minLength(3),
}));

const {errors, meta, defineField} = useForm({validationSchema: schema})
const [email, emailProps] = defineField('email')
const [nameOfUser, nameOfUserProps] = defineField('nameOfUser',)
const [userType, userTypeProps] = defineField('userType',)

userType.value = 0;
const selectorElements = [
  {value:0,label:'Kérjük, válasszon értéket!'},
  {value:1,label:'Rendszer adminisztrátor'},
  {value:2,label:'Céges adminisztrátor'},
  {value:3,label:'Magán sofőr'},
  {value:4,label:'Céges sofőr'},
]
const createInProgress = ref<boolean>(false)

async function createUser() {
  createInProgress.value = true
  const newUser = await UserService.createUser(email.value,nameOfUser.value, userType.value);
  createInProgress.value = false
  if (newUser) {
    toast(t("toastMessages.createSuccess"), ToastConfigs.successToastConfig as ToastOptions)
    return
  }
  toast(t("toastMessages.createFail"), ToastConfigs.errorToastConfig)
}

</script>
