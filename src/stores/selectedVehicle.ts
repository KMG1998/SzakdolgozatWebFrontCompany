import {defineStore} from 'pinia'
import * as User from "@/types/User";
import * as Vehicle from "@/types/Vehicle";
import * as Company from "@/types/Company";

export const  useSelectedVehicleStore = defineStore('selectedVehicle', {
  state: () => ({
    selectedVehicle: undefined as Vehicle,
    vehicleDriver: undefined as User,
    vehicleCompany: undefined as Company,
    saveInProgress: false,
    editStarted: false,
    deleteStarted: false,
    unlinkStarted: false,
    popUpVisible: false,
    popUpToggleFunction:Function
  }),
})
