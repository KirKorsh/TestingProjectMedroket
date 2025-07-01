<template>
  <div class="catalog-page">
    <ErrorState 
      v-if="error" 
      customClass="user-error"
    />
    
    <div 
      v-else-if="loading" 
      class="loading-state"
    >
      <PreloaderView />
    </div>

    <UserList 
      v-else
      :users="users"
      :openedUsers="openedUsers"
      @toggle-user="toggleUser"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { getUsers } from "@/services/api";
import UserList from "@/views/UserList.vue";
import PreloaderView from "@/components/PreloaderView.vue";
import ErrorState from "@/components/ErrorState.vue"; 

export default {
  name: "CatalogPage",
  components: {
    ErrorState,
    UserList,
    PreloaderView
  },
  setup() {
    const users = ref([]);
    const openedUsers = ref([]);
    const loading = ref(true);
    const error = ref(false);

    const loadUsers = async () => {
      loading.value = true;
      error.value = false;
      
      try {
        const response = await getUsers();
        users.value = response.data;
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    const toggleUser = (userId) => {
      if (openedUsers.value.includes(userId)) {
        openedUsers.value = openedUsers.value.filter((id) => id !== userId);
      } else {
        openedUsers.value.push(userId);
      }
    };

    onMounted(loadUsers);

    return {
      users,
      openedUsers,
      toggleUser,
      loading,
      error
    };
  }
};
</script>