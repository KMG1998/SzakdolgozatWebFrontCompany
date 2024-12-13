<template>
  <PopUp :visibility-variable="isUserPopupVisible" @toggle="toggleUserPopUp">
    <CreateUserPopUp :toggle-function="toggleUserPopUp"/>
  </PopUp>
  <PopUp :visibility-variable="isVehiclePopupVisible" @toggle="toggleVehiclePopUp">
    <CreateVehiclePopup/>
  </PopUp>
  <PopUp :visibility-variable="isPasswordPopupVisible" @toggle="togglePasswordPopUp">
    <PasswordChangePopUp/>
  </PopUp>
  <div class="flex flex-row">
    <div class="flex flex-col lg:flex-row">
      <div
        class="flex flex-row items-stretch gap-5 w-full max-md:w-full max-md:ml-0"
      >
        <div
          class="bg-white bg-opacity-80 flex flex-col items-stretch w-full h-min mt-6 pt-4 pb-12 rounded-3xl max-md:mt-10"
        >
          <div class="text-black text-xl ml-4 self-start max-md:ml-2.5">
            {{ $t("mainPage.createActions") }}
          </div>
          <div class="bg-black shrink-0 h-0.5 mt-3 max-md:max-w-full"></div>
          <div class="self-center w-[100%] max-w-full mt-3.5 pl-2 pr-2">
            <div class="gap-5 flex justify-around max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div class="flex grow flex-col items-center max-md:mt-10">
                <img
                  loading="lazy"
                  src="@/assets/images/user_button.png"
                  class="object-contain object-center w-[100px] fill-white self-center max-w-full cursor-pointer"
                  @click='toggleUserPopUp'
                />
                <div class="text-black text-xl whitespace-nowrap mt-6">
                  <p>új alkalmazott</p>
                </div>
              </div>
              <div class="flex grow flex-col items-stretch max-md:mt-10">
                <img
                  loading="lazy"
                  src="@/assets/images/vehicle_button.png"
                  class="object-contain object-center w-[100px] fill-white self-center max-w-full cursor-pointer"
                  @click='toggleVehiclePopUp'
                />
                <div class="text-black text-xl whitespace-nowrap mt-6">
                  <p>új jármű</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-white bg-opacity-80 flex flex-col items-stretch w-full h-min mt-6 pt-4 pb-12 px-2 rounded-3xl max-md:mt-10"
        >
          <div class="text-black text-xl ml-4 self-start max-md:ml-2.5">
            {{ $t("mainPage.companyData") }}
          </div>
          <div class="bg-black shrink-0 h-0.5 mt-3 max-md:max-w-full"></div>
          <div class="w-full max-w-full mt-3.5">
            <div class="flex flex-row w-full justify-around gap-5">
              <DataWithLabel label="cég neve" :data="companyData.companyName"/>
              <DataWithLabel label="cég telefonszám" :data="companyData.officeTel"/>
            </div>
            <div class="flex flex-row w-full justify-around gap-5">
              <DataWithLabel label="cég telephely" :data="companyData.officeAddress"/>
              <DataWithLabel label="cég e-mail" :data="companyData.officeEmail"/>
            </div>
          </div>
        </div>
        <div
          class="bg-white bg-opacity-80 flex flex-col justify-around items-stretch w-full h-min mt-6 pt-4 pb-12 px-2 rounded-3xl max-md:mt-10"
        >
          <div class="text-black text-xl ml-4 self-start max-md:ml-2.5">
            {{ $t("mainPage.ownData") }}
          </div>
          <div class="bg-black shrink-0 h-0.5 mt-3 max-md:max-w-full"></div>
          <div class="flex flex-col w-full max-w-full mt-3.5">
            <DataWithLabel label="e-mail" :data="userEmail"/>
            <DataWithLabel label="név" :data="userName"/>
            <button type="button"
                    @click="togglePasswordPopUp"
                    class="justify-center items-center px-16 py-2 mt-3 max-w-full text-xl text-black rounded-3xl border-2 border-black border-solid"
            >Jelszó megváltoztatása
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateUserPopUp from "@/components/popup/CreateUserPopUp.vue";
import CreateVehiclePopup from "@/components/popup/CreateVehiclePopup.vue";
import PopUp from "@/components/popup/PopUp.vue";
import DataWithLabel from "@/components/commons/DataWithLabel.vue";
import * as Company from "@/types/Company";
import {ref} from "vue";
import PasswordChangePopUp from "@/components/popup/passwordChange/PasswordChangePopUp.vue";

const isUserPopupVisible = ref(false)
const isVehiclePopupVisible = ref(false)
const isPasswordPopupVisible = ref(false)
const companyData: Company = JSON.parse(sessionStorage.getItem('companyData')) as Company
const userName = JSON.parse(sessionStorage.getItem('userData')).name
const userEmail = JSON.parse(sessionStorage.getItem('userData')).email

function toggleUserPopUp() {
  isUserPopupVisible.value = !isUserPopupVisible.value
}

function toggleVehiclePopUp() {
  isVehiclePopupVisible.value = !isVehiclePopupVisible.value
}

function togglePasswordPopUp() {
  isPasswordPopupVisible.value = !isPasswordPopupVisible.value
}

</script>
