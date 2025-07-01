<template>
  <div 
    class="modal"
    v-if="visible"
    tabindex="-1"
    @keydown.esc="$emit('close')"
    @keydown.tab="handleTab"
  >
    <div class="modal-content">
      <img
        ref="closeButton"
        :src="CloseIcon"
        alt="Закрыть"
        class="modal-close-icon"
        tabindex="0"
        @click="$emit('close')"
        @keydown.enter="$emit('close')"
        @keydown.space.prevent="$emit('close')"
      />

      <img 
        ref="modalImage"
        :src="photo.url" 
        :alt="photo.title" 
        class="modal-image"
        tabindex="0"
      />
    </div>
  </div>
</template>

<script>
import CloseIcon from "@/assets/icons/close_modal.svg";

export default {
  name: "PhotoModal",
  props: {
    visible: Boolean,
    photo: Object,
  },
  setup() {
    return { CloseIcon };
  },
  mounted() {
    this.$refs.closeButton.focus();
  },
  
  //Автоматический фокус при открытии
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.closeButton.focus();
        });
      }
    }
  },
  methods: {
    handleTab(event) {
      const focusableElements = [
        this.$refs.closeButton,
        this.$refs.modalImage
      ];
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Если Shift + Tab на первом элементе
      if (event.shiftKey && event.target === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } 
      // Если Tab на последнем элементе
      else if (!event.shiftKey && event.target === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
};
</script>