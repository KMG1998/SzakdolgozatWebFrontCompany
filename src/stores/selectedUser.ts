import {defineStore} from 'pinia'
import * as User from "@/types/User";
import * as Vehicle from "@/types/Vehicle";
import * as Review from "@/types/Review";
import {ref} from "vue";

export const useSelectedUserStore = defineStore('selectedUser', {
  state: () => ({
    selectedUser: undefined as User,
    userVehicle: undefined as Vehicle,
    userReviews: undefined as Array<Review>,
    saveInProgress: false,
    editStarted: ref(false),
    deleteStarted: false,
    unlinkStarted: false,
    popUpVisible: false,
    popUpToggleFunction: Function
  }),
})
