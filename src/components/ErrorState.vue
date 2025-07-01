<template>
  <div :class="['error-state', customClass]">
    <img :src="errorIcon" alt="Ошибка сервера" />
  </div>
</template>

<script>
import ErrorIcon from "@/assets/icons/server-dont-answer.svg";

export default {
  name: "ErrorState",
  props: {
    customClass: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {
      errorIcon: ErrorIcon
    };
  }
};
</script>
