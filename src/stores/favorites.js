import { defineStore } from 'pinia';
import { ref } from '@vue/composition-api';

export const useFavoritesStore = defineStore('favorites', () => {
  // Загрузка избранного из localStorage
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
  
  // Сохранение в localStorage
  function saveToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }
  
  // Переключение избранного
  function toggleFavorite(photo) {
    const index = favorites.value.findIndex(p => p.id === photo.id);
    if (index !== -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(photo);
    }
    saveToLocalStorage();
  }
  
  // Удаление из избранного
  function removeFavorite(id) {
    favorites.value = favorites.value.filter(p => p.id !== id);
    saveToLocalStorage();
  }
  
  // Проверка, есть ли фото в избранном 
  function isFavorite(id) {
    return favorites.value.some(p => p.id === id);
  }
  
  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite 
  };
});

// Глобальное состояние загрузки и ошибки
export const useGlobalStore = defineStore('global', () => {
  const loading = ref(false);
  const error = ref(null);
  
  const setLoading = (value) => (loading.value = value);
  const setError = (message) => (error.value = message);
  const clearError = () => (error.value = null);

  return { loading, error, setLoading, setError, clearError };
});