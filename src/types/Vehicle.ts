import * as VehicleInsurance from "@/types/VehicleInsurance";

type Vehicle = undefined | {
    id: string,
    seats: number,
    color: string,
    type: string,
    plateNumber: string,
    insurance: VehicleInsurance
}

export {Vehicle}
