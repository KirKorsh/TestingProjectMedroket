<template>
  <div class="photo-container">
    <div class="image-wrapper">
      <img 
        :src="photo.thumbnailUrl" 
        :alt="photo.title" 
        class="photo-thumbnail"
        @click="$emit('open', photo)"
      />
      <div class="favorite-overlay">
        <img
          :src="isFavorite(photo.id) ? FavAdded : FavNo"
          alt="Добавить в избранное"
          class="favorite-icon"
          @click.stop="toggleFavorite"
        />
      </div>
    </div>
    <div v-if="showTitle" class="photo-title">{{ photo.title }}</div>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites';
import FavNo from '@/assets/icons/fav-no.svg';
import FavAdded from '@/assets/icons/fav-added.svg';

export default {
  name: 'PhotoItem',
  props: {
    photo: Object,
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open'],
  setup(props) {
    const favoritesStore = useFavoritesStore();
    const isFavorite = (id) => favoritesStore.isFavorite(id);

    const toggleFavorite = () => {
      favoritesStore.toggleFavorite(props.photo);
    };

    return {
      isFavorite,
      toggleFavorite,
      FavNo,
      FavAdded
    };
  },
};
</script>
