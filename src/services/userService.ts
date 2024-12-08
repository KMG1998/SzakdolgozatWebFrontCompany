import axios, {AxiosError} from "axios";
import * as User from "../types/User";
import {toast} from 'vue3-toastify';
import ToastConfigs from "@/utils/toastConfigs";
import {useCookies} from "vue3-cookies";
import * as Vehicle from "@/types/Vehicle";
import * as Company from "@/types/Company";

const API_URL = 'http://localhost:8085/user/';
const axiosClient = axios.create({withCredentials: true})
const {cookies} = useCookies();

class UserService {
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

  async login(email: string, password: string): Promise<boolean | null> {
    let success = false
    await axiosClient.post(API_URL + 'signInCompany', {
      email: email,
      password: password
    }).then(response => {
      console.log(response)
      if (response.status === 200 && response.data) {
        sessionStorage.setItem('userData', JSON.stringify(response.data['userData'] as User))
        sessionStorage.setItem('companyData', JSON.stringify(response.data['companyData'] as Company))
        success = true;
      }
      if (response.status === 400) {
        toast('Hibás adatok', ToastConfigs.errorToastConfig);
      }
    }, error => {
      toast(error.toString(), ToastConfigs.errorToastConfig);
    }).catch((err) => {
        console.log(err)
      }
    )
    return success
  }

  async createUser(email: string, name: string, userType: number): Promise<string | undefined> {
    let newUserId = undefined
    await axiosClient.post(API_URL + 'create', {
      email: email,
      name: name,
      type: userType
    })
      .then(response => {
        if (response.data) {
          newUserId = response.data
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      });
    return newUserId
  }

  async getCompanyUsers() {
    try {
      const response = await axiosClient
        .get(API_URL + 'getAllByCompany');
      if (response.data) {
        const users = Array<User>();
        response.data.map(function (value) {
          users.push(value['worker'] as User)
        });
        return users;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllDrivers() {
    try {
      const response = await axiosClient
        .get(API_URL + 'allDrivers');
      if (response.data) {
        const users = Array<User>();
        response.data.map(function (value: User) {
          users.push(value as User)
        });
        return users;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(userId: string): Promise<User | null> {
    let ret = null
    await axiosClient.post(API_URL + 'getUser', {userId: userId}).then(response => {
        if (response.data) {
          ret = response.data as User
        }
      }
    ).catch(err => {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 400) {
          toast(err.response.statusText, ToastConfigs.errorToastConfig);
        }
      }
    })
    return ret
  }

  async updateUser(user: User): Promise<User | undefined> {
    let updatedUser = undefined
    await axiosClient.post(API_URL + 'updateUser', {userData: JSON.stringify(user)}).then(
      resp => {
        if (resp.data) {
          updatedUser = resp.data as User;
        }
      }
    ).catch(err => console.log(err))
    return updatedUser
  }

  async deleteUser(userId: string): Promise<boolean | undefined> {
    let success = false;
    await axiosClient.post(API_URL + 'deleteUser', {userId: userId}).then((resp) => {
      console.log(resp.data)
      if (resp.data === true) {
        success = true
      }
    }).catch(err => toast(err.message, ToastConfigs.errorToastConfig))
    return success;
  }

  async logOut(): Promise<boolean> {
    try {
      const resp = await axiosClient.post(API_URL + 'logOut')
      if (resp.status === 200) {
        sessionStorage.clear()
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  async getOwnData(): Promise<void> {
    const resp = await axiosClient.get(API_URL + 'getOwnData')
    if (resp.data) {
      const data = resp.data as User
      if (data.typeId != 2) {
        cookies.remove('authenticated')
        cookies.remove('token')
        return
      }
      sessionStorage.setItem('userData', JSON.stringify(resp.data as User))
    }
  }

  async checkToken() {
    try {
      console.log("in checktoken")
      const resp = await axiosClient.post(API_URL + 'checkToken')
      if (resp.status === 200 && sessionStorage.getItem('userData') == null) {
        await this.getOwnData();
      }
      return resp.status === 200
    } catch (e) {
      return false
    }
  }

  async findByVehicle(vehicleId: string) {
    try {
      const resp = await axiosClient.post(API_URL + 'findByVehicle', {vehicleId: vehicleId})
      console.log(resp.data)
      if (resp.status === 200 && resp.data) {
        console.log()
        return resp.data as Vehicle;
      }
      return undefined
    } catch (e) {
      return undefined
    }
  }

  async changePass(currentPass: string, newPass: string) {
    try{
      const resp = await axiosClient.post(API_URL + 'changePassword', {currentPass: currentPass, newPass: newPass})
      return resp.status === 200
    }catch (e){
      return false
    }
  }

}

export default new UserService()
