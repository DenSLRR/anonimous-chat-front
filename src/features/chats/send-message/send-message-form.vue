<template>
  <form
    @submit="handleSubmit"
    class="flex w-full items-center gap-[30px] justify-between"
  >
    <div class="w-full">
      <my-input
        :value="values.encryptedContent"
        :error="errors.encryptedContent"
        @on-input="(value) => setFieldValue('encryptedContent', value)"
        placeholder="Your message"
        name="text"
      />
    </div>
    <my-button> Send </my-button>
  </form>
</template>

<script setup lang="ts">
import MyInput from "@/shared/ui/my-input.vue";
import MyButton from "@/shared/ui/my-button.vue";
import { sendMessage } from "@/features/chats/send-message/index.ts";

const { handleSubmit, errors, values, setFieldValue } = sendMessage();
</script>

<style scoped></style>
