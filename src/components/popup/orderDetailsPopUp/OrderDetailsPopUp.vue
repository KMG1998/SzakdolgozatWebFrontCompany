<template>
  <div class="fixed flex flex-col items-center py-4 bg-white rounded-3xl opacity-100 z-50">
    <div
      class="gap-5 flex flex-row mb-2 max-md:items-stretch max-md:gap-0"
    >
      <div class="flex grow flex-col items-center" @click="selectedPage = modalPages.orderPage">
        <img
          loading="lazy"
          src="@/assets/images/data_thumb.png"
          class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
        />
      </div>
      <div
        class="flex flex-col items-stretch"
        @click="selectedPage = modalPages.customerDriverPage"
      >
        <div
          class="flex grow flex-col items-center"
        >
          <img
            loading="lazy"
            src="@/assets/images/user_button.png"
            class="rounded-full border-2 border-black drop-shadow-md w-[70px] fill-white self-center cursor-pointer"
          />
        </div>
      </div>
    </div>
    <OrderDetailsPage v-if="selectedPage === modalPages.orderPage"/>
    <DriverCustomerDetailsPage v-if="selectedPage === modalPages.customerDriverPage"/>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import DriverCustomerDetailsPage from "@/components/popup/orderDetailsPopUp/pages/DriverCustomerDetailsPage.vue";
import OrderDetailsPage from "@/components/popup/orderDetailsPopUp/pages/OrderDetailsPage.vue"

enum modalPages {
  orderPage = 1,
  customerDriverPage = 2,
}

let selectedPage = ref(modalPages.orderPage)
</script>

<script lang="ts">
export default {
  name: 'OrderDetailsPopUp',
}
</script>
