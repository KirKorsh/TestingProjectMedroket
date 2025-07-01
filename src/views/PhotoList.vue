<template>
  <div class="photo-list" @mousemove="updateTooltip">
    <ErrorState 
      v-if="error" 
      customClass="photo-error"
    />
    
    <div v-else-if="loading" class="photo-loading">
      <PreloaderView />
    </div>

    <div v-else>
      <ul class="photo-grid">
        <li
          v-for="(photo, index) in photos"
          :key="photo.id"
          class="photo-item-container"
          tabindex="0"
          @mouseenter="hoveredId = photo.id"
          @mouseleave="hoveredId = null"
          @keydown.enter="openModal(photo)"
          @keydown.space.prevent="openModal(photo)"
          @keydown.down.prevent="focusNextPhoto($event, index)"
          @keydown.up.prevent="focusPreviousPhoto($event, index)"
          @keydown.left.prevent="focusPreviousPhoto($event, index)"
          @keydown.right.prevent="focusNextPhoto($event, index)"
        >
          <PhotoItem 
            :photo="photo" 
            @open="openModal"
          />
        </li>
      </ul>

      <div
        v-if="hoveredId !== null"
        class="tooltip"
        :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }"
        @click.stop
      >
        {{ getPhotoTitle(hoveredId) }}
      </div>

      <PhotoModal
        v-if="modalPhoto"
        :visible="true"
        :photo="modalPhoto"
        @close="closeModal"  
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { getPhotos } from "@/services/api";
import PhotoItem from "@/components/PhotoItem.vue";
import PhotoModal from "@/components/PhotoModal.vue";
import PreloaderView from "@/components/PreloaderView.vue";
import ErrorState from "@/components/ErrorState.vue";

export default {
  name: "PhotoList",
  components: {
    PhotoItem,
    PhotoModal,
    PreloaderView,
    ErrorState
  },
  props: {
    albumId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const photos = ref([]);
    const modalPhoto = ref(null);
    const hoveredId = ref(null);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const loading = ref(true);
    const error = ref(false);
    const lastFocusedElement = ref(null);

    const loadPhotos = async () => {
      loading.value = true;
      error.value = false;
      
      try {
        const res = await getPhotos(props.albumId);
        photos.value = res.data;
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    const openModal = (photo) => {
      lastFocusedElement.value = document.activeElement;
      modalPhoto.value = photo;
    };

    const closeModal = () => {
      modalPhoto.value = null;
      if (lastFocusedElement.value) {
        setTimeout(() => {
          lastFocusedElement.value.focus();
        }, 10);
      }
    };

    const updateTooltip = (e) => {
      tooltipX.value = e.clientX + 10;
      tooltipY.value = e.clientY + 10;
    };

    const getPhotoTitle = (id) => {
      const photo = photos.value.find((p) => p.id === id);
      return photo ? photo.title : "";
    };

    const focusNextPhoto = (event, currentIndex) => {
      const items = event.currentTarget.parentElement.querySelectorAll('.photo-item-container');
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    };

    const focusPreviousPhoto = (event, currentIndex) => {
      const items = event.currentTarget.parentElement.querySelectorAll('.photo-item-container');
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    };

    onMounted(loadPhotos);

    return {
      photos,
      modalPhoto,
      hoveredId,
      openModal,
      tooltipX,
      tooltipY,
      updateTooltip,
      getPhotoTitle,
      focusNextPhoto,
      focusPreviousPhoto,
      loading,
      error,
      closeModal,
      lastFocusedElement
    };
  },
};
</script>