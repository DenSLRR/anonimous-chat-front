<template>
 <div class="h-[100vh] flex items-center justify-center w-full">
   <div class="p-5 w-full shadow shadow-white  border border-white rounded-[16px] max-w-[500px]">
     <div class="py-[10px] w-full flex items-center justify-center">
       <div>
         <img class="w-[100px] h-[100px]" src="/logo.svg" alt="">
         <p class="text-center text-[22px] text-white">Sign-up!</p>
       </div>
     </div>
     <slot></slot>
   </div>
 </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>