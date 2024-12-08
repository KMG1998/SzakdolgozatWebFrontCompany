import {defineStore} from 'pinia'
import * as Order from "@/types/Order";

export const  useSelectedOrderStore = defineStore('selectedOrder', {
  state: () => ({
    selectedOrder: undefined as Order,
    popUpVisible: false,
    popUpToggleFunction:Function
  }),
})
