<template>
  <PopUp :visibility-variable="isUserPopupVisible" @toggle="toggleUserPopUp">
    <CreateUserPopUp :toggle-function="toggleUserPopUp"/>
  </PopUp>
  <PopUp :visibility-variable="isCompanyPopupVisible" @toggle="toggleCompanyPopUp">
    <CreateCompanyPopUp/>
  </PopUp>
  <PopUp :visibility-variable="isVehiclePopupVisible" @toggle="toggleVehiclePopUp">
    <CreateVehiclePopup/>
  </PopUp>
  <div class="flex flex-row">
    <div class="flex flex-col lg:flex-row">
      <div
        class="flex flex-col items-stretch w-full max-md:w-full max-md:ml-0"
      >
        <div
          class="bg-white bg-opacity-80 flex flex-col items-stretch w-full mt-6 pt-4 pb-12 rounded-3xl max-md:mt-10"
        >
          <div class="text-black text-xl ml-4 self-start max-md:ml-2.5">
            {{ $t("mainPage.quickActions") }}
          </div>
          <div class="bg-black shrink-0 h-0.5 mt-3 max-md:max-w-full"></div>
          <div class="self-center w-[100%] max-w-full mt-3.5 pl-2 pr-2">
            <div
              class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0"
            >
              <div
                class="flex flex-col items-stretch max-md:w-full max-md:ml-0"
              >
                <div class="flex grow flex-col items-center max-md:mt-10">
                  <img
                    loading="lazy"
                    src="@/assets/images/user_button.png"
                    class="object-contain object-center w-[100px] fill-white self-center max-w-full cursor-pointer"
                    @click='toggleUserPopUp'
                  />
                  <div class="text-black text-xl whitespace-nowrap mt-6">
                    <p>új felhasználó</p>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col items-stretch ml-5 max-md:w-full max-md:ml-0"
              >
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAdminMenu from "@/components/commons/menu/CompanyAdminMenu.vue";
import CreateUserPopUp from "@/components/popup/CreateUserPopUp.vue";
import CreateCompanyPopUp from "@/components/popup/CreateCompanyPopUp.vue";
import CreateVehiclePopup from "@/components/popup/CreateVehiclePopup.vue";
import PopUp from "@/components/popup/PopUp.vue";

export default {
  name: "HomePageContent",
  components: {CompanyAdminMenu, PopUp, CreateUserPopUp, CreateCompanyPopUp, CreateVehiclePopup},
  methods: {
    toggleUserPopUp() {
      this.isUserPopupVisible = !this.isUserPopupVisible
    },
    toggleCompanyPopUp() {
      this.isCompanyPopupVisible = !this.isCompanyPopupVisible
    },
    toggleVehiclePopUp() {
      this.isVehiclePopupVisible = !this.isVehiclePopupVisible
    },
  }, data: function () {
    return {
      isUserPopupVisible: false,
      isCompanyPopupVisible: false,
      isVehiclePopupVisible: false,
      userName: JSON.parse(sessionStorage.getItem('userData')).name,
      userEmail: JSON.parse(sessionStorage.getItem('userData')).email
    }
  },
}
</script>
