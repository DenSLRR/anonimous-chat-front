<template>
  <div>
    <div v-if="!userStore.access_token" class="flex gap-[20px]">
      <router-link
        class="px-[20px] text-white rounded hover:bg-opacity-0 transition duration-200 font-bold uppercase py-[10px] bg-teal-700"
        to="/sign-in"
      >
        sign in
      </router-link>
      <router-link
        class="px-[20px] text-white rounded hover:bg-teal-700 transition duration-200 font-bold uppercase py-[10px] bg-teal-800"
        to="/sign-up"
      >
        sign up
      </router-link>
    </div>
    <div v-if="userStore.access_token" class="text-white font-bold text-[22px]">
      Hello {{ userStore.userName }}!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/entities/user/store.ts";

const userStore = useUserStore();
</script>

<style scoped></style>
