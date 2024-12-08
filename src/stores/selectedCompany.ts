import {defineStore} from 'pinia'
import * as User from "@/types/User";
import * as Vehicle from "@/types/Vehicle";
import * as Company  from "@/types/Company";

export const  useSelectedCompanyStore = defineStore('selectedCompany', {
  state: () => ({
    selectedCompany: undefined as Company,
    companyWorkers: undefined as Array<User>,
    companyVehicles: undefined as Array<Vehicle>,
    saveInProgress: false,
    editStarted: false,
    deleteStarted: false,
    unlinkStarted: false,
    popUpVisible: false,
    popUpToggleFunction:Function
  }),
})
