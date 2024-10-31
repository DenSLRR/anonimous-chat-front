<template>
  <div class="input">
    <div>
      <label :for="name" v-if="label" class="input_label">{{ label }}</label>
      <div class="relative">
        <component
            :is="tag"
            :value="value"
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            @input="(event: Event) => handleInput(event)"
            @keyup.enter="(event: Event) => handleEnter(event)"
            :class="[
            { 'input-item !border-red-700': error !== '' },]"
        />
      </div>
    </div>

    <div v-if="error" class="input-error">
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref("");

interface IProps {
  value?: string | number;
  error?: string;
  type?: "text" | "password" | "number" | "email";
  label?: string;
  placeholder?: string;
  name: string;
  tag?: "input" | "textarea";
}

interface IEmits {
  (event: "onInput", value: string): void;
  (event: "onEnter", value: string): void;
  (event: "onFocusOut"): void;
}

withDefaults(defineProps<IProps>(), {
  type: "text",
  error: "",
  value: "",
  placeholder: "",
  tag: "input",
});
const emits = defineEmits<IEmits>();

const handleInput = (e: Event) => {
  const { value } = <HTMLInputElement>e.target;
  inputValue.value = value;
  emits("onInput", value);
};

const handleEnter = (e: Event) => {
  const { value } = <HTMLInputElement>e.target;
  inputValue.value = value;
  emits("onEnter", value);
};
</script>
<style lang="scss" scoped>
.input {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;



  &-error {
    position: absolute;
    top: 67%;
    transform: translateY(-50%);
    right: 10px;
    text-transform: uppercase;
    color: rgb(185, 28, 28);
    font-size: 12px;
    font-weight: 700;

  }

  &_label {
    padding-left: 3px;
    font-size: 14px;
    font-weight: 700;
    color: white;

  }

  input,
  textarea {
    outline: none;
    width: 100%;
    height: 40px;
    padding-left: 15px;
    font-size: 16px;
    font-weight: 400;
    resize: none;
    border: 2px solid #b9b9b9;
    border-radius: 8px;
    &::placeholder {
      text-align: left;
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  textarea {
    height: 120px !important;
    padding-top: 10px;
  }

  input {
    &:disabled {
      cursor: default;
      color: #c9c9c9;
      border-color: #c9c9c9;
      text-transform: uppercase;
    }
  }
}


</style>
