<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <form class="flex flex-col min-w-[500px] p-2 gap-5" @submit.prevent>
      <p class="text-xl text-black">Jelszó visszaállítás</p>
      <div class="flex flex-col text-md text-black">
        <p>Kérjük, adja meg a belépéshez használt e-mail címét!</p>
        <p>Amennyiben létezik egy, a megadott e-mail címhez tartozó</p>
        <p>profil, küldeni fogunk a címre egy e-mailt további utasításokkal.</p>
      </div>
      <InputField
        field-id="currentPass"
        label="E-mail cím"
        type="email"
        v-model=email
        v-bind=emailProps
        :meta="meta"
        :error="errors.email"
        :readonly="false"
      />
      <button type="button"
              @click="resetPass"
              class="justify-center items-center self-center px-16 py-2 mt-3 w-[400px] text-xl text-black bg-green-400 rounded-3xl border-2 border-black border-solid"
      >Jelszó visszaállítása
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useForm} from "vee-validate";
import UserService from "@/services/userService";
import {toast} from "vue3-toastify";
import {toTypedSchema} from "@vee-validate/yup";
import Validators from "@/utils/valdiators";
import InputField from "@/components/commons/inputs/InputField.vue";
import {object} from "yup";
import {useI18n} from "vue-i18n";
import ToastConfigs from "@/utils/toastConfigs";

const schema = toTypedSchema(object({
  email: Validators.emailValidator(),
}));
const {validate, errors, meta, defineField} = useForm({validationSchema: schema})
const [email, emailProps] = defineField('email')

const props = defineProps({
  toggleFunc: Function,
})

const {t} = useI18n()

async function resetPass() {
  await validate()
  if (meta.value.valid) {
    const success = await UserService.resetPass(email.value);
    if (success) {
      toast(t('toastMessages.passwordResetSuccess'), ToastConfigs.successToastConfig)
      props.toggleFunc()
      return
    }
    toast(t('toastMessages.passwordResetFail'), ToastConfigs.errorToastConfig)
  }
}
</script>

<script lang="ts">
export default {
  name: "PasswordResetPopUp"
}
</script>

