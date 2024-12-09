<template>
  <div class="relative h-[100vh] pr-8 max-md:pr-5 bg-gradient-to-b from-taxi-blue via-taxi-to-color via-75% to-white flex flex-row justify-start">
    <CompanyAdminMenu/>
    <HomePageContent/>
  </div>
</template>

<script setup>
import HomePageContent from "@/components/pageContent/homePage/HomePageContent.vue";
import CompanyAdminMenu from "@/components/commons/menu/CompanyAdminMenu.vue";
</script>
