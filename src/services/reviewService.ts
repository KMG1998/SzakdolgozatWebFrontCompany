import axios from "axios";
import {useCookies} from "vue3-cookies";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import * as Review from "@/types/Review";

const API_URL = 'http://localhost:8085/review/';
const axiosClient = axios.create({withCredentials: true})
const {cookies} = useCookies();

class ReviewService{
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

  async getReviewsForDriver(userId:string){
    try {
      const resp = await axiosClient.post(API_URL + 'listForUser', {
        userId: userId,
      })
      if(resp.status === 200 && resp.data){
        console.log(resp.data)
        return Array<Review>.from(resp.data)
      }
      return undefined
    }catch (e){
      toast('Sikertelen értékelés betöltés',ToastConfigs.errorToastConfig)
      return undefined
    }
  }
}

export default new ReviewService()
