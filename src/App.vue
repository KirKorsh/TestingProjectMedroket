<template>
  <div class="app">
    <TabButtons />
    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TabButtons from '@/components/TabButtons.vue';

export default {
  name: 'App',
  components: {
    TabButtons,
  }
};
</script>