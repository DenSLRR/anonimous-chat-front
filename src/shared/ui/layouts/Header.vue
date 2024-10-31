<template>
  <div class="py-[10px] bg-teal-600 w-full">
    <div class="container">
      <div class="flex justify-between items-center">
        <header-auth-block />
        <Logout />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logout from "@/shared/ui/logout.vue";
import HeaderAuthBlock from "@/shared/ui/header-auth-block.vue";
</script>

<style scoped></style>
