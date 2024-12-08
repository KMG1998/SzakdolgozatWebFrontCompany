<template>
  <form @submit.prevent class="flex flex-col" v-if="!userDataStore.deleteStarted">
    <div
      class="flex self-stretch min-w-[500px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
      <div
        class="flex flex-col items-stretch w-full max-md:ml-0 max-md:w-full"
      >
        <div class="flex flex-col grow items-stretch max-md:mt-10">
          <div class="flex flex-row justify-center items-center">
            <p class="text-xl font-bold text-black w-full">felhasználó adatai</p>
            <div
              class="w-[40px] h-[40px] absolute right-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
              v-if="!userDataStore.selectedUser.disabled && !userDataStore.editStarted && !userDataStore.deleteStarted">
              <img src="@/assets/images/edit_button.png"
                   @click="userDataStore.editStarted = true">
            </div>
            <div
              class="w-[40px] h-[40px] absolute left-4 z-10 bg-white border-solid rounded-full border-black border-2 p-[5px] cursor-pointer"
              v-if="!userDataStore.selectedUser.disabled && !userDataStore.editStarted && !userDataStore.deleteStarted">
              <img src="@/assets/images/delete_button.png"
                   @click="userDataStore.deleteStarted = true">
            </div>
          </div>
          <DataWithLabel label="ID" :data="userDataStore.selectedUser.id"/>
          <DataWithLabel :data="$t(userDataStore.selectedUser.disabled.toString())" label="zárolt"/>
          <div class="flex flex-col items-stretch mt-3 max-md:pl-5">
            <InputField
              field-id="email"
              label="felhasználó e-mail"
              type="text"
              v-model=email
              v-bind=emailProps
              :meta="meta"
              :error="errors.email"
              :readonly="!userDataStore.editStarted"
            />
            <InputField
              field-id="name"
              label="felhasználó neve"
              type="text"
              v-model=nameOfUser
              v-bind=nameOfUserProps
              :meta="meta"
              :error="errors.nameOfUser"
              :readonly="!userDataStore.editStarted"
            />
            <Selector
              field-id="userType"
              label="típus"
              v-model=userType
              v-bind=userTypeProps
              :meta="meta"
              :error="errors.userType"
              :elements=selectorElements
              :disabled="true"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="self-stretch mt-9 w-full bg-black min-h-[2px] max-md:max-w-full"
      v-if="userDataStore.editStarted"
    ></div>
    <div class="flex flex-row justify-around items-center" v-if="userDataStore.editStarted">
      <button type="button"
              @click="saveUserChanges"
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
    <p class="text-xl font-bold text-black w-full">Biztos törli a felhasználót?</p>
    <div class="flex flex-row w-full justify-around gap-2">
      <button type="button"
              @click="deleteUser"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-warning-red rounded-3xl border-2 border-black border-solid"
      >Törlés
      </button>
      <button type="button"
              @click="userDataStore.deleteStarted = false"
              class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black bg-white rounded-3xl border-2 border-black border-solid"
      >Mégse
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useSelectedUserStore} from "@/stores/selectedUser.ts";
import UserService from "@/services/userService.ts";
import * as User from "@/types/User";
import {toast, ToastOptions} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import {useI18n} from "vue-i18n";
import {toTypedSchema} from "@vee-validate/yup";
import Validators from "@/utils/valdiators";
import {useForm} from "vee-validate";
import {object} from "yup";
import InputField from "@/components/commons/inputs/InputField.vue"
import Selector from "@/components/commons/inputs/ListSelector.vue"
import DataWithLabel from "@/components/commons/DataWithLabel.vue";

const {t} = useI18n()
const userDataStore = useSelectedUserStore()

const schema = toTypedSchema(object({
  userType: Validators.userTypeValidator(),
  email: Validators.emailValidator(),
  nameOfUser: Validators.minLength(3),
}));

const {errors, meta, defineField} = useForm({validationSchema: schema})
const [email, emailProps] = defineField('email')
const [nameOfUser, nameOfUserProps] = defineField('nameOfUser',)
const [userType, userTypeProps] = defineField('userType',)
const selectorElements = [
  {value:1,label:'Rendszer adminisztrátor'},
  {value:2,label:'Céges adminisztrátor'},
  {value:3,label:'Magán sofőr'},
  {value:4,label:'Céges sofőr'},
  {value:5,label:'Utas'},
]
email.value = userDataStore.selectedUser.email
nameOfUser.value = userDataStore.selectedUser.name
userType.value = userDataStore.selectedUser.typeId

async function saveUserChanges() {
  userDataStore.saveInProgress = true;
  const newData = {
    id: userDataStore.selectedUser.id,
    email: email.value,
    name: nameOfUser.value,
    typeId: userType.value
  } as User
  const updatedUser = await UserService.updateUser(newData)
  userDataStore.saveInProgress = false;
  if (updatedUser) {
    userDataStore.selectedUser = updatedUser
    userDataStore.editStarted = false
    toast(t('toastMessages.saveSuccess'), ToastConfigs.successToastConfig as ToastOptions)
    return
  }
  toast(t('toastMessages.saveFail'), ToastConfigs.errorToastConfig)
}

async function deleteUser() {
  userDataStore.saveInProgress = true;
  const deleteSuccess = await UserService.deleteUser(userDataStore.selectedUser.id)
  userDataStore.saveInProgress = false
  if (deleteSuccess) {
    userDataStore.popUpToggleFunction()
    toast(t('toastMessages.deleteSuccess'), ToastConfigs.successToastConfig as ToastOptions)
    userDataStore.$reset()
    return
  }
  deleteStarted.value = false;
  toast(t('toastMessages.deleteFail'), ToastConfigs.errorToastConfig)
}

function cancelEdit(){
  userDataStore.editStarted = false
  email.value = userDataStore.selectedUser.email
  nameOfUser.value = userDataStore.selectedUser.name
  userType.value = userDataStore.selectedUser.typeId
}

</script>
