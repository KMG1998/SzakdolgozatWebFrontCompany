import {defineStore} from 'pinia'
import * as User from "@/types/User";
import * as Vehicle from "@/types/Vehicle";
import * as Company  from "@/types/Company";
import {ref} from "vue";

export const useSelectedUserStore = defineStore('selectedUser', {
  state: () => ({
    selectedUser: undefined as User,
    userVehicle: undefined as Vehicle,
    userCompany: undefined as Company,
    saveInProgress: false,
    editStarted: ref(false),
    deleteStarted: false,
    unlinkStarted: false,
    popUpVisible: false,
    popUpToggleFunction: Function
  }),
})
