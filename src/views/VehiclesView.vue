<template>
  <div
      class="relative pr-8 max-md:pr-5 bg-gradient-to-b from-taxi-blue via-taxi-to-color via-75% to-white flex flex-row justify-start">
    <CompanyAdminMenu/>
    <CompanyAdminVehiclesContent/>
  </div>
</template>

<script setup lang="ts">
import CompanyAdminMenu from "@/components/commons/menu/CompanyAdminMenu.vue";
import CompanyAdminVehiclesContent from "@/components/pageContent/vehiclesPage/CompanyAdminVehiclesContent.vue";
</script>
