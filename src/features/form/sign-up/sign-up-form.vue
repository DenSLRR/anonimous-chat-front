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
          :value="values.username"
          :error="errors.username"
          @on-input="(value) => setFieldValue('username', value)"
          label="Username"
          name="username"
      />
      <my-input
          :value="values.password"
          :error="errors.password"
          @on-input="(value) => setFieldValue('password', value)"
          label="Password"
          name="password"/>
      <my-button>
        Sign-up
      </my-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import MyInput from "@/shared/ui/my-input.vue";
import MyButton from "@/shared/ui/my-button.vue";
import {useRegister} from "@/features/form/sign-up/index.ts";


const { handleSubmit, errors, values, setFieldValue, isLoading } =
    useRegister();
</script>

<style scoped>

</style>