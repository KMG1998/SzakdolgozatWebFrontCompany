import * as User from "@/types/User";

type Order = undefined | {
  id: string
  startAddress: string
  destinationAddress: string
  startDateTime: string
  finishDateTime: string | undefined
  price: number
  closureType: number
  driver: User
  customer: User
}

export default Order

