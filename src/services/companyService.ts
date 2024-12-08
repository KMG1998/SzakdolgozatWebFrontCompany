import axios, {AxiosError} from "axios";
import {useCookies} from "vue3-cookies";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import * as Company from "@/types/Company";

const API_URL = 'http://localhost:8085/company/';
const axiosClient = axios.create({withCredentials: true})
const {cookies} = useCookies();

class CompanyService {
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

  async createCompany(name: string,
                      officeAddress: string,
                      officeTel: string,
                      officeEmail: string) {
    try {
      const resp = await axiosClient.post(API_URL + 'create', {
        name: name,
        officeAddress: officeAddress,
        officeTel: officeTel,
        officeEmail: officeEmail
      })
      return resp.status === 200
    } catch (e) {
      return false
    }
  }

  async getAllCompany(): Promise<Array<Company> | void> {
    return axiosClient
      .get(API_URL + 'allCompany')
      .then(response => {
        if (response.data) {
          const companies = Array<Company>();
          response.data.map(function (value: Company, key: number) {
            companies.push(value as Company)
          });
          return companies
        }
      }).catch(err => {
        (err);
      });
  }

  async getCompanyByWorker(workerId: string): Promise<Company | undefined> {
    let company = undefined
    await axiosClient
      .post(API_URL + 'getByWorker', {
        workerId: workerId,
      })
      .then(response => {
        if (response.status === 200 && response.data) {
          company = response.data as Company
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return company
  }


  async getCompanyForVehicle(vehicleId: string) {
    let ret = undefined
    await axiosClient.post(API_URL + 'getByVehicle', {vehicleId: vehicleId}).then(response => {
        if (response.data) {
          ret = response.data as Company
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

  async connectCompanyToWorker(userId: string, companyId: string): Promise<boolean> {
    let success = false
    await axiosClient
      .post(API_URL + 'connectToWorker', {
        userId: userId,
        companyId: companyId
      })
      .then(response => {
        if (response.status === 200) {
          success = true;
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return success
  }

  async unlinkCompanyFromUser(userId: string): Promise<boolean> {
    let success = false
    await axiosClient
      .post(API_URL + 'unlinkFromWorker', {
        userId: userId,
      })
      .then(response => {
        if (response.status === 200) {
          success = true;
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return success
  }

  async connectCompanyToVehicle(vehicleId: string, companyId: string): Promise<boolean> {
    let success = false
    await axiosClient
      .post(API_URL + 'connectToVehicle', {
        vehicleId: vehicleId,
        companyId: companyId
      })
      .then(response => {
        if (response.status === 200) {
          success = true;
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return success
  }

  async unlinkCompanyFromVehicle(vehicleId: string): Promise<boolean> {
    let success = false
    await axiosClient
      .post(API_URL + 'unlinkFromVehicle', {
        vehicleId: vehicleId,
      })
      .then(response => {
        if (response.status === 200) {
          success = true;
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return success
  }
}

export default new CompanyService()
