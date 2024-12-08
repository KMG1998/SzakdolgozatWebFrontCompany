<template>
  <div
      class="relative h-[100vh] pr-8 max-md:pr-5 bg-gradient-to-b from-taxi-blue via-taxi-to-color via-75% to-white flex flex-row justify-start">
    <CompanyAdminMenu/>
    <CompanyAdminUsersContent/>
  </div>
</template>

<script setup lang="ts">
import CompanyAdminMenu from "@/components/commons/menu/CompanyAdminMenu.vue";
import CompanyAdminUsersContent from "@/components/pageContent/usersPage/CompanyAdminUserContent.vue";
</script>

<style scoped>

</style>
