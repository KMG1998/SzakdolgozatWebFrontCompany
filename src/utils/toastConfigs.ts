import {toast} from "vue3-toastify";

const successToastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2500,
  type: "success",
  transition: "slide",
  hideProgressBar: true,
  icon: false,
  toastStyle: {"background-color": "#00DE80", "color": "#ffffff"}
}

const errorToastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000,
  type: "error",
  transition: "slide",
  hideProgressBar: true,
  icon: false,
  toastStyle: {"background-color": "#f0291a", "color": "#ffffff"}
}


export default {successToastConfig,errorToastConfig}
