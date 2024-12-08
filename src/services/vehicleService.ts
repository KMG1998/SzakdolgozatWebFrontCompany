import axios, {AxiosError} from "axios";
import * as Vehicle from "../types/Vehicle";
import {toast} from "vue3-toastify";
import ToastConfigs from "@/utils/toastConfigs";
import {useCookies} from "vue3-cookies";

const API_URL = 'http://localhost:8085/vehicle/';
const axiosClient = axios.create({withCredentials: true})
const {cookies} = useCookies();

class VehicleService {
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

  createVehicle(companyId:string,seats: number, plateNum: string, carType: string, color: string,
                insuranceValidUntil: string, insuranceIssuer: string, insuranceNumber: string, registrationValidUntil: string
  ): Promise<Vehicle | void> {
    return axiosClient
      .post(API_URL + 'create', {
        companyId:companyId,
        seats: seats,
        plateNumber: plateNum,
        type: carType,
        color: color,
        insuranceValidUntil: insuranceValidUntil,
        insuranceIssuer: insuranceIssuer,
        insuranceNumber: insuranceNumber,
        registrationValidUntil: registrationValidUntil
      })
      .then(response => {
        if (response.data) {
          return response.data as Vehicle;
        }
      }).catch(err => console.log(err));
  }

  async connectUserToVehicle(userId: string, vehicleId: string): Promise<boolean> {
    let success = false
    await axiosClient
      .post(API_URL + 'connectToUser', {
        userId: userId,
        vehicleId: vehicleId
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

  async getAllVehicles(): Promise<Vehicle[] | undefined> {
    let allVehicles = undefined
    await axiosClient.get(API_URL + 'allVehicles',)
      .then(response => {
        if (response.data) {
          const vehicles = Array<Vehicle>();
          response.data.map(function (value: Vehicle, _: number) {
            vehicles.push(value as Vehicle)
          });
          allVehicles = vehicles;
        }
      }).catch(err => {
        if (err instanceof AxiosError && err.response) {
          if (err.response.status === 400) {
            toast(err.response.statusText, ToastConfigs.errorToastConfig);
          }
        }
      })
    return allVehicles
  }

  async findVehicleByDriver(driverId: string): Promise<Vehicle | undefined> {
    let vehicle = undefined
    await axiosClient
      .post(API_URL + 'findByDriver', {
        driverId: driverId,
      }).then(response => {
        if (response.data) {
          vehicle = response.data as Vehicle
        }
      }).catch(err => {
        console.log(err)
      })
    return vehicle
  }

  async findNonUserLinkedVehicles(): Promise<Vehicle[] | undefined> {
    let vehicles = undefined
    await axiosClient.post(API_URL + 'nonUserLinked',).then((response) => {
        if (response.data) {
          vehicles = response.data.map((value) => value['vehicle'] as Vehicle)
        }
      }
    )
    return vehicles
  }

  async findVehicleById(vehicleId: string): Promise<Vehicle | undefined> {
    let vehicle = undefined
    await axiosClient.post(API_URL + 'findById', {vehicleId: vehicleId})
      .then((response) => {
        if (response.data) {
          vehicle = response.data as Vehicle
        }
      }).catch(err => console.log(err))
    return vehicle
  }

  async unlinkVehicleFromUser(vehicleId: string) {
    let success = false
    await axiosClient.post(API_URL + 'unlinkFromUser', {vehicleId: vehicleId}).then((response) => {
      if (response.status === 200) {
        success = true
      }
    }).catch((err) => console.log(err))
    return success
  }

  async updateVehicle(insuranceId: string, vehicleId: string, seats: number, plateNum: string, carType: string, color: string,
                      insuranceValidUntil: string, insuranceIssuer: string, insuranceNumber: string, registrationValidUntil: string) {
    let result = undefined
    const resp = await axiosClient.post(API_URL + 'update', {
      insuranceId: insuranceId, vehicleId: vehicleId, seats: seats, plateNumber: plateNum, type: carType,
      color: color, insuranceValidUntil: insuranceValidUntil, insuranceIssuer: insuranceIssuer, insuranceNumber: insuranceNumber,
      registrationValidUntil: registrationValidUntil
    })
    if (resp.data) {
      result = resp.data as Vehicle;
    }
    return result;
  }

  async deleteVehicle(vehicleId){
    try {
      const resp = await axiosClient.post(API_URL + 'delete', {
        vehicleId: vehicleId
      });
      return resp.status === 200
    }catch (e){
      return false
    }
  }
}

export default new VehicleService()
