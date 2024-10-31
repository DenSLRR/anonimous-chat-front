<template>
  <div>
    <form
      @submit="handleSubmit"
      class="flex w-full items-center gap-[30px] justify-between"
    >
      <div class="w-full">
        <my-input
          :value="values.userId"
          :error="errors.userId"
          @on-input="(value) => setFieldValue('userId', Number(value))"
          placeholder="user id"
          name="userId"
        />
      </div>
      <my-button class="text-nowrap"> Add User </my-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import MyInput from "@/shared/ui/my-input.vue";
import MyButton from "@/shared/ui/my-button.vue";
import { addUserToChat } from "@/features/chats/add-user/index.ts";

const { handleSubmit, errors, values, setFieldValue } = addUserToChat();
</script>

<style scoped></style>
