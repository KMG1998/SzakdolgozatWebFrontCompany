import axios from "axios";
import {useCookies} from "vue3-cookies";
import * as Order from "@/types/Order";
import {toast} from "vue3-toastify";
import i18n from "@/utils/lang";
import ToastConfigs from "@/utils/toastConfigs";

const API_URL = 'http://localhost:8085/order/';
const axiosClient = axios.create({withCredentials: true})
const {cookies} = useCookies();

class OrderService {
  constructor() {
    axiosClient.interceptors.response.use(response => {
      return response;
    }, (error) => {
      if (error.status === 401) {
        cookies.remove('authenticated')
        cookies.remove('token')
      }
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
        toast('Sikertelen csatlakozás', ToastConfigs.errorToastConfig);
      }
      return error;
    })
  }

  async getAllOrders(orderIdSearch?:string|undefined) {
    try {
      const response = await axiosClient
        .get(API_URL + 'ordersForCompany',{params:{
            orderIdSearch:orderIdSearch
          }});
      if (response.data) {
        const orders = Array<Order>();
        response.data.map(function (value) {
          orders.push(value as Order)
        });
        return orders;
      }
    } catch (err) {
      toast(i18n.global.t('toastMessages.unknownError'), ToastConfigs.errorToastConfig)
      return undefined
    }
  }
}

export default new OrderService()
