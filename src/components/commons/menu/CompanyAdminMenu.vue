<template>
  <div class="relative z-0 h-[100vh] min-h-[800px] gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 mr-7">
    <div
      class="bg-white h-full bg-opacity-80 flex flex-col items-center text-xl text-black whitespace-nowrap w-full pt-6 pb-12 px-4 max-md:mt-6">
      <img
        @click="router.push('/home')"
        loading="lazy"
        src="@/assets/images/magantaxi_logo.png"
        class="aspect-square object-contain object-center w-[200px] cursor-pointer"
      >
      <div class="text-center mt-10">{{ userName }}</div>
      <a :class="getNavClass('/users')" @click="router.push('/users')">
        {{ $t("sideMenu.usersPage") }}
      </a>
      <p :class="getNavClass('/vehicles')" @click="router.push('/vehicles')">
        {{ $t("sideMenu.vehiclesPage") }}
      </p>
      <p :class="getNavClass('/reserves')" @click="router.push('/reserves')">
        {{ $t("sideMenu.reservationsPage") }}
      </p>
      <div class="h-full"/>
      <img
        class="object-contain object-center w-[92px] fill-black cursor-pointer"
        loading="lazy"
        src="@/assets/images/log_out.png"
        @click="logOut"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import UserService from "@/services/userService.ts";
import {toast, ToastOptions} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs.ts";
import router from "@/router/index.js";

const userName = JSON.parse(sessionStorage.getItem('userData')).name


async function logOut() {
  if (await UserService.logOut()) {
    sessionStorage.clear()
    await router.push('/login')
    return
  }
  toast(t('toastMessages.logOutFail'), ToastConfigs.errorToastConfig)
}

function getNavClass(navPath: string): string {
  if (router.currentRoute.value.path == navPath) {
    return 'mt-11 max-md:mt-10 bg-taxi-blue py-2 px-4 border-black border-solid border-2 text-white rounded-full'
  }
  return 'mt-11 max-md:mt-10 py-2 px-4 cursor-pointer'
}

</script>
