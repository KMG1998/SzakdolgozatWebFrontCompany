<template>
  <div class="relative pr-8 max-md:pr-5 bg-gradient-to-b from-taxi-blue via-taxi-to-color via-75% to-white flex flex-row justify-start">
    <CompanyAdminMenu/>
    <CompanyAdminOrdersContent/>
  </div>
</template>

<script setup>
import CompanyAdminMenu from "@/components/commons/menu/CompanyAdminMenu.vue";
import CompanyAdminOrdersContent from "@/components/pageContent/ordersPage/CompanyAdminOrdersContent.vue";
</script>
