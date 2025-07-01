<template>
  <div class="album-list">
    <ErrorState 
      v-if="error" 
      customClass="album-error"
    />
    
    <div v-else-if="loading" class="loading-state">
      <PreloaderView />
    </div>

    <div v-else>
      <div
        v-for="album in albums"
        :key="album.id"
        class="album-item"
      >
        <div 
          class="album-header"
          tabindex="0"
          @click.stop="toggleAlbum(album.id)"
          @keydown.enter="toggleAlbum(album.id)"
          @keydown.space.prevent="toggleAlbum(album.id)"
          @keydown.down.prevent="focusNext($event)"
          @keydown.up.prevent="focusPrevious($event)"
        >
          <img
            :src="openedAlbums.includes(album.id) ? minusIcon : plusIcon"
            alt="toggle"
            class="toggle-icon"
          />
          <h2>
            {{ album.title }}
          </h2>
        </div>
        
        <div v-if="openedAlbums.includes(album.id)">
          <PhotoList
            :albumId="album.id"
            :key="album.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { getAlbums } from "@/services/api";
import PhotoList from "@/views/PhotoList.vue";
import PreloaderView from "@/components/PreloaderView.vue";
import plusIcon from "@/assets/icons/open-plus.svg";
import minusIcon from "@/assets/icons/close-mine.svg";
import ErrorState from "@/components/ErrorState.vue";

export default {
  name: "AlbumList",
  components: {
    PhotoList,
    PreloaderView,
    ErrorState
  },
  props: {
    userId: Number,
  },
  setup(props) {
    const albums = ref([]);
    const openedAlbums = ref([]);
    const loading = ref(true);
    const error = ref(false);

    const loadAlbums = async () => {
      loading.value = true;
      error.value = false;
      
      try {
        const response = await getAlbums(props.userId);
        albums.value = response.data;
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    const toggleAlbum = (id) => {
      if (openedAlbums.value.includes(id)) {
        openedAlbums.value = openedAlbums.value.filter((a) => a !== id);
      } else {
        openedAlbums.value.push(id);
      }
    };

    const focusNext = (event) => {
      const items = event.currentTarget.parentElement.parentElement.querySelectorAll('.album-header');
      const currentIndex = Array.from(items).indexOf(event.currentTarget);
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    };

    const focusPrevious = (event) => {
      const items = event.currentTarget.parentElement.parentElement.querySelectorAll('.album-header');
      const currentIndex = Array.from(items).indexOf(event.currentTarget);
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    };

    onMounted(loadAlbums);

    return {
      albums,
      openedAlbums,
      toggleAlbum,
      focusNext,
      focusPrevious,
      plusIcon,
      minusIcon,
      loading,
      error
    };
  },
};
</script>