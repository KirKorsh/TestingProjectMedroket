<template>
  <div class="tab">
    <button
      v-for="tabOption in tabOptions"
      :key="tabOption.value"
      :class="[
        'tab-button', 
        { 
          active: isActive(tabOption.value),
          'catalog-tab': tabOption.value === 'catalog',
          'favorites-tab': tabOption.value === 'favorites'
        }
      ]"
      @click="changeTab(tabOption.value)"
    >
      {{ tabOption.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabButtons',
  data() {
    return {
      tabOptions: [
        { value: 'catalog', label: 'Каталог' },
        { value: 'favorites', label: 'Избранное' }
      ]
    };
  },
  computed: {
    //Возвращает имя текущего маршрута 
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    isActive(tabValue) {
      return this.currentRoute === tabValue;
    },
    changeTab(tabValue) {
      // Проверка не является ли целевой маршрут текущим
      if (this.currentRoute !== tabValue) {
        this.$router.push({ name: tabValue });
      }
    }
  }
};
</script>