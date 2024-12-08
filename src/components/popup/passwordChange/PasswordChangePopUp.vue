<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <form class="flex flex-col min-w-[500px] p-2" @submit.prevent>
      <p class="text-xl text-black">Jelszó csere</p>
      <InputField
        field-id="currentPass"
        label="Jelenlegi jelszó"
        type="password"
        v-model=currentPass
        v-bind=currentPassProps
        :meta="meta"
        :error="errors.currentPass"
        :readonly="false"
      />
      <InputField
        field-id="newPass"
        label="Új jelszó"
        type="password"
        v-model=newPass
        v-bind=newPassProps
        :meta="meta"
        :error="errors.newPass"
        :readonly="false"/>
      <InputField
        field-id="newPassAgain"
        label="Új jelszó ismét"
        type="password"
        v-model=newPassAgain
        v-bind=newPassAgainProps
        :meta="meta"
        :error="errors.newPassAgain"
        :readonly="false"/>

      <button type="button"
              @click="changePass"
              class="justify-center items-center self-center px-16 py-2 mt-3 w-[300px] text-xl text-black bg-green-400 rounded-3xl border-2 border-black border-solid"
      >Mentés
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputField from "@/components/commons/inputs/InputField.vue";
import {toTypedSchema} from "@vee-validate/yup";
import Validators from "@/utils/valdiators";
import {TypedSchema, useForm} from "vee-validate";
import {ref} from "vue";
import UserService from "@/services/userService";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import {object} from "yup";
import {useI18n} from "vue-i18n";
import router from "@/router";

let schema = ref<TypedSchema>()
const {validate,errors, meta, defineField} = useForm({validationSchema: schema})
const [newPass, newPassProps] = defineField('newPass')
const [currentPass, currentPassProps] = defineField('currentPass')
const [newPassAgain, newPassAgainProps] = defineField('newPassAgain')

schema.value = toTypedSchema(object({
  currentPass: Validators.passwordValidator(),
  newPass: Validators.passwordValidator(),
  newPassAgain: Validators.passwordValidator()
}));

const {t} = useI18n()
const saveInProgress = ref<boolean>(false)

async function changePass() {
  console.log(await validate())
  if (!meta.value.valid) {
    return
  }
  if (newPass.value != newPassAgain.value) {
    toast(t("inputValidation.passwordMismatch"), ToastConfigs.errorToastConfig)
    return
  }
  saveInProgress.value = true
  const saveSuccess = await UserService.changePass(currentPass.value, newPass.value)
  saveInProgress.value = false
  if (!saveSuccess) {
    toast(t("toastMessages.saveFail"), ToastConfigs.errorToastConfig)
    return
  }
  if (await UserService.logOut()) {
    await router.push('login')
    return
  }
  toast(t("toastMessages.logOutFail"), ToastConfigs.errorToastConfig)
}
</script>

<script lang="ts">
export default {
  name: "PasswordChangePopUp"
}
</script>
