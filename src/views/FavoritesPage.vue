<template>
  <div class="favorites-page">
    <div v-if="favoritePhotos.length === 0" class ="empty-state">
      <img 
        :src="emptyIcon" 
        alt="Нет избранных фотографий"
        class="empty-icon"
      />
    </div>
    <div v-else class="favorites-grid">
      <PhotoItem 
        v-for="photo in favoritePhotos"
        :key="photo.id"
        :photo="photo"
        :show-title="true" 
        @open="openModal"
      />
    </div>
    
    <PhotoModal
      v-if="modalPhoto"
      :visible="true"
      :photo="modalPhoto"
      @close="modalPhoto = null"
    />
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import { useFavoritesStore } from '@/stores/favorites';
import PhotoItem from '@/components/PhotoItem.vue';
import PhotoModal from '@/components/PhotoModal.vue';
import emptyIcon from '@/assets/icons/favorite-not-choos.svg';

export default {
  name: 'FavoritesPage',
  components: {
    PhotoItem,
    PhotoModal
  },
  setup() {
    const favoritesStore = useFavoritesStore();
    const favoritePhotos = computed(() => favoritesStore.favorites);
    const modalPhoto = ref(null);

    const openModal = (photo) => {
      modalPhoto.value = photo;
    };

    return {
      favoritePhotos,
      modalPhoto,
      openModal,
      emptyIcon
    };
  },
};
</script>
