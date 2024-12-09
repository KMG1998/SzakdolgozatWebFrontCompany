<template>
  <div
    class="flex flex-col h-[100vh] pb-10 justify-start items-center max-md:px-5 bg-gradient-to-b from-taxi-blue via-taxi-to-color via-75% to-white"
  >
    <PopUp :visibility-variable="isResetPopUpVisible" @toggle="toggleResetPopUp">
      <PasswordResetPopUp :toggle-func="toggleResetPopUp"/>
    </PopUp>
    <img
      loading="lazy"
      src="../assets/images/magantaxi_logo.png"
      class="object-contain object-center mt-7 w-[319px] max-w-full"
    />
    <form @submit.prevent>
      <InputField
        field-id="email"
        label="E-mail"
        type="text"
        v-model="email"
        v-bind=emailProps
        :meta="meta"
        :error="errors.email"
        :readonly="false"
      />
      <InputField
        field-id="password"
        label="Jelszó"
        type="password"
        v-model="password"
        v-bind=passwordProps
        :meta="meta"
        :error="errors.password"
        :readonly="false"
      />
      <button
        class="cursor-pointer text-black text-sm justify-center items-center bg-white w-[269px] max-w-full mt-8 px-16 py-1.5 rounded-3xl border-2 border-solid border-black max-md:px-5 hover:shadow-lg"
        v-if="!authInProgress"
        @click="auth">Belépés
      </button>
      <div v-else class="flex items-center justify-center pt-2">
        <semipolar-spinner
          :animation-duration="2000"
          :size="40"
          color="#57A3EF"
        />
      </div>
    </form>
    <div
      class="text-black text-sm underline whitespace-nowrap mt-14 max-md:mt-10 cursor-pointer"
      @click="toggleResetPopUp"
    >
      Elfelejtett jelszó
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {SemipolarSpinner} from 'epic-spinners'
import {Form, useForm} from "vee-validate"
import {toTypedSchema} from '@vee-validate/yup';
import Validators from "@/utils/valdiators"
import {useI18n} from "vue-i18n"
import {object} from "yup"
import UserService from "@/services/userService";
import router from "@/router";
import InputField from "@/components/commons/inputs/InputField.vue";
import PasswordResetPopUp from "@/components/popup/passwordReset/PasswordResetPopUp.vue";
import PopUp from "@/components/popup/PopUp.vue";

const {t} = useI18n()
const authInProgress = ref(false)
const schema = toTypedSchema(object({
  email: Validators.emailValidator(),
  password: Validators.passwordValidator(),
}));

const {errors, meta, defineField} = useForm({validationSchema: schema})
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const isResetPopUpVisible = ref(false)

async function auth() {
  if (meta.value.valid) {
    authInProgress.value = true
    const loginSuccess = await UserService.login(email.value, password.value)
    if (loginSuccess === true) {
      await router.push('home')
    }
    authInProgress.value = false
  }
}

function toggleResetPopUp() {
  isResetPopUpVisible.value = !isResetPopUpVisible.value
}

</script>
