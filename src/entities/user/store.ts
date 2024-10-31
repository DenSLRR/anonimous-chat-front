import { defineStore } from "pinia";
import { ref } from "vue";
import { ChatDtoRes } from "@/shared/api/generated.ts";
import { getAllUserChats } from "@/features/chats/aside";
import { activeChat } from "@/shared/utils/types.ts";

export const useUserStore = defineStore(
  "auth",
  () => {
    const access_token = ref<string | null>(null);
    const userId = ref<number | null>(null);
    const userName = ref<string | null>(null);
    const chats = ref<ChatDtoRes[]>([]);
    const activeChat = ref<activeChat | null>(null);

    const getChats = async () => {
      if (access_token.value) {
        chats.value = await getAllUserChats();
      } else {
        console.log("Sorry");
      }
    };

    const clearAll = () => {
      access_token.value = null;
      userId.value = null;
      userName.value = null;
      chats.value = [];
      activeChat.value = null;
    };

    return {
      access_token,
      userId,
      userName,
      chats,
      getChats,
      activeChat,
      clearAll,
    };
  },
  {
    persist: true,
  },
);
