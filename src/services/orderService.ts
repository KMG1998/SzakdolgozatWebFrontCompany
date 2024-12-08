import axios from "axios";
import {useCookies} from "vue3-cookies";
import * as Order from "@/types/Order";
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
      return error;
    })
  }

  async getAllOrders() {
    try {
      const response = await axiosClient
        .get(API_URL + 'allOrders');
      if (response.data) {
        const orders = Array<Order>();
        response.data.map(function (value) {
          orders.push(value as Order)
        });
        return orders;
      }
    } catch (err) {
      return []
      (err);
    }
  }
}

export default new OrderService()
