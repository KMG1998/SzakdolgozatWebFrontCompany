<template>
  <div
    class="flex self-stretch min-w-[500px] max-w-[1100px] px-[10px] gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch text-center">
    <div class="flex flex-col grow items-stretch max-md:mt-10">
      <p class="text-xl font-bold text-black w-full">alkalmazott kapott értékelései</p>
      <DataTable :table-data="selectedUserStore.userReviews" header-class="reviewTable" :field-transformers="fieldTransformers"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/commons/DataTable.vue";
import {useSelectedUserStore} from "@/stores/selectedUser";
import dateFormatter from "@/utils/dateFormatter";

const selectedUserStore = useSelectedUserStore()

const fieldTransformers = {
  'createdAt': (dateString) => dateFormatter(dateString)
}

</script>

<script lang="ts">
export default {
  name: "UserDetailsReviewsPage"
}
</script>
