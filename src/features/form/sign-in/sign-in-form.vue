<template>
  <div class="w-full">
    <form @submit="handleSubmit" class="flex flex-col mx-auto max-w-[500px] gap-[20px]">
      <my-input
          :value="values.email"
          :error="errors.email"
          @on-input="(value) => setFieldValue('email', value)"
          label="Email"
          name="email"
      />

      <my-input
          :value="values.password"
          :error="errors.password"
          @on-input="(value) => setFieldValue('password', value)"
          label="Password"
          name="password"/>
      <my-button>
        Sign-in!
      </my-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import MyInput from "@/shared/ui/my-input.vue";
import MyButton from "@/shared/ui/my-button.vue";
import {useLogin} from "@/features/form/sign-in/index.ts";


const { handleSubmit, errors, values, setFieldValue } =
    useLogin();





</script>

<style scoped>

</style>