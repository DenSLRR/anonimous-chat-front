<template>
  <div>
    <Header />
    <div>
      <router-view :key="route.fullPath" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { useUserStore } from "@/entities/user/store.ts";
import Header from "./shared/ui/layouts/Header.vue";

const route = useRoute();
const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.getChats();
  userStore.activeChat = userStore.chats[0].id;
});
</script>

<style scoped></style>
