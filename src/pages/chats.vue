<template>
  <div class="container p-[40px]">
    <div class="flex justify-between gap-[40px] items-center">
      <div class="w-3/12 bg-teal-600 h-[80vh]">
        <aside-menu />
      </div>
      <div class="w-9/12 bg-teal-600 h-[80vh]">
        <div class="h-full relative">
          <div class="px-[10px] py-[10px] bg-teal-800 absolute top-0 w-full">
            <add-user />
          </div>
          <div class="px-[10px] bg-teal-800 absolute bottom-0 w-full py-[10px]">
            <send-message-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AsideMenu from "@/features/chats/aside/aside-menu.vue";
import SendMessageForm from "@/features/chats/send-message/send-message-form.vue";
import AddUser from "@/shared/ui/add-user.vue";
</script>

<style scoped></style>
