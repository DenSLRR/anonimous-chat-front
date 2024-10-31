<template>
  <div>
    <div
      @click="handleActive"
      class="flex h-full hover:text-white items-center justify-center"
    >
      <icon-add-user class="h-[30px] w-[30px]" />
    </div>
    <add-user-form v-if="isActive" />
  </div>
</template>

<script setup lang="ts">
import AddUserForm from "@/features/chats/add-user/add-user-form.vue";
import IconAddUser from "@/shared/icons/icon-add-user.vue";
import { ref } from "vue";

const isActive = ref(false);

const handleActive = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped></style>
