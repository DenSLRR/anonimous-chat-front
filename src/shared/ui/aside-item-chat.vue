<template>
  <div
    @click="handleActiveChat"
    :class="[
      'border-white hover:scale-[1.1] transition duration-200 cursor-pointer flex  items-center gap-[20px] rounded border p-[10px]',
      chatId == userStore.activeChat?.id ? 'bg-teal-700' : '',
    ]"
  >
    <div>
      <img class="h-[40px] w-[40px]" src="/logo.svg" alt="" />
    </div>
    <div>
      <p class="text-white">{{ name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/entities/user/store.ts";

interface IProps {
  name: string;
  chatId: number;
  privateKey: string;
}

const props = defineProps<IProps>();

const userStore = useUserStore();

const handleActiveChat = () => {
  const data = {
    id: props.chatId,
    key: props.privateKey,
  };

  userStore.activeChat = data;
  console.log(userStore.activeChat);
};
</script>

<style scoped></style>
