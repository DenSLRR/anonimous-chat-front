<template>
  <div class="flex p-[20px] flex-col gap-[10px]">
    <div class="flex flex-col gap-[10px]">
      <button
        @click="handleActive"
        class="py-[20px] text-white font-bold hover:scale-[1.1] transition duration-200 bg-teal-800"
      >
        {{ isAddChatOpen ? "Close" : "Create New Chat! " }}
      </button>
      <div :class="[isAddChatOpen ? 'addMenu addMenu-active' : 'addMenu']">
        <form @submit="handleSubmit">
          <MyInput
            :value="values.name"
            :error="errors.name"
            @on-input="(value) => setFieldValue('name', value)"
            placeholder="Enter name"
            name="name"
          />
          <button
            @click="handleClose"
            class="flex mt-[10px] uppercase text-white font-bold items-center w-full py-[10px] justify-center bg-teal-800"
          >
            Create
          </button>
        </form>
      </div>
    </div>

    <aside-item-chat
      :chat-id="item.id"
      :private-key="item.encryptedChatKey"
      :name="item.name"
      v-for="item in userStore.chats"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/entities/user/store.ts";
import AsideItemChat from "@/shared/ui/aside-item-chat.vue";
import { ref } from "vue";
import MyInput from "@/shared/ui/my-input.vue";
import { useCreateChat } from "@/features/chats/aside/index.ts";
const userStore = useUserStore();

const isAddChatOpen = ref(false);

const { handleSubmit, errors, values, setFieldValue } = useCreateChat();

const handleClose = () => {
  isAddChatOpen.value = false;
};
const handleActive = () => {
  isAddChatOpen.value = !isAddChatOpen.value;
};
</script>

<style lang="scss" scoped>
.addMenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.addMenu-active {
  max-height: 500px;
}
</style>
