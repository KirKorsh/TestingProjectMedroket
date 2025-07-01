<template>
  <div class="user-list">
    <div
      v-for="(user, index) in users"
      :key="user.id"
      class="user-item"
    >
      <div 
        class="user-header" 
        tabindex="0"
        @click="$emit('toggle-user', user.id)"
        @keydown.enter="$emit('toggle-user', user.id)"
        @keydown.space.prevent="$emit('toggle-user', user.id)"
        @keydown.down.prevent="focusNextUser($event, index)"
        @keydown.up.prevent="focusPreviousUser($event, index)"
      >
        <img
          :src="openedUsers.includes(user.id) ? minusIcon : plusIcon"
          alt="toggle"
          class="toggle-icon"
        />
        <h1>{{ user.name }}</h1>
      </div>

      <AlbumList 
        v-if="openedUsers.includes(user.id)" 
        :userId="user.id" 
        :key="user.id"
      />
    </div>
  </div>
</template>

<script>
import AlbumList from "@/views/AlbumList.vue";
import plusIcon from "@/assets/icons/open-plus.svg";
import minusIcon from "@/assets/icons/close-mine.svg";

export default {
  name: "UserList",
  components: {
    AlbumList
  },
  props: {
    users: {
      type: Array,
      required: true
    },
    openedUsers: {
      type: Array,
      required: true
    }
  },
  setup() {
    const focusNextUser = (event, currentIndex) => {
      const items = event.currentTarget.parentElement.parentElement.querySelectorAll('.user-header');
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    };

    const focusPreviousUser = (event, currentIndex) => {
      const items = event.currentTarget.parentElement.parentElement.querySelectorAll('.user-header');
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    };

    return {
      focusNextUser,
      focusPreviousUser,
      plusIcon,
      minusIcon
    };
  }
};
</script>