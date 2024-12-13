<template>
  <PopUp :visibility-variable="selectedUserStore.popUpVisible" @toggle="selectedUserStore.popUpToggleFunction">
    <UserDetailsPopUp/>
  </PopUp>
  <div
    class="flex flex-col grow shrink-0 mt-6 basis-0 w-fit max-md:max-w-full"
  >
    <SearchInput
      field-id="email-search"
      placeholder="Alkalmazott e-mail"
      v-model="searchValue"
      :search-function="searchUsers"
    />
    <div
      class="flex flex-col px-6 pt-8 pb-20 mt-2 rounded-3xl bg-white bg-opacity-80 max-md:pl-5 max-md:mt-10 max-md:max-w-full"
    >
      <div class="max-md:max-w-full text-left">Alkalmazottak</div>
      <div>
        <DataTable :table-data="usersData" header-class="userTable" :on-details-click="toggleDetailsPopUp"
                   :field-transformers="tableFieldTransformers"
                   button-img-file-name="details_eye.png"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserService from "@/services/userService";
import PopUp from "@/components/popup/PopUp.vue";
import UserDetailsPopUp from "@/components/popup/userDetailsPopUp/UserDetailsPopUp.vue";
import DataTable from "@/components/commons/DataTable.vue";
import {useSelectedUserStore} from "@/stores/selectedUser.ts";
import {onBeforeMount, ref} from "vue";
import {convertUserType} from "@/utils/valueConverter";
import SearchInput from "@/components/commons/inputs/SearchInput.vue";

const usersData = ref(undefined)
const selectedUserStore = useSelectedUserStore()

const searchValue = ref(undefined)

const tableFieldTransformers = {
  'typeId': (typeId) => convertUserType(typeId)
}

async function getAllCompanyUsers() {
  usersData.value = await UserService.getCompanyUsers();
}

function toggleDetailsPopUp(selectedUser) {
  selectedUserStore.selectedUser = selectedUser
  selectedUserStore.popUpVisible = !selectedUserStore.popUpVisible
  if (!selectedUserStore.popUpVisible) {
    searchValue.value = undefined
    getAllCompanyUsers()
  }
}

async function searchUsers(){
  usersData.value = undefined
  usersData.value = await UserService.getCompanyUsers(searchValue.value);
}

onBeforeMount(() => {
  getAllCompanyUsers();
  selectedUserStore.popUpToggleFunction = toggleDetailsPopUp
})
</script>
