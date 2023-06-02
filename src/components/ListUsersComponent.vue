<template>
    <div v-if="getUsers.length !== 0">
        <div class="q-pa-md q-gutter-sm" style="height: 80px">
            <q-avatar v-for="user, n  in getUsers" :key="user.id" size="45px"
                :class="`amazingmother overlapping shadow-2 ${getSelectedUser === user.id ? 'avatar_border' : ''}`" glossy
                color="primary" @click="filterPostByUserId(user.id)" :style="`left: ${n * 36}px;`">
                <q-tooltip> {{ user.name }}</q-tooltip>
                {{ getInitialsFromName(user.name) }}
            </q-avatar>
        </div>
    </div>
</template>

<script setup>
import { getInitialsFromName } from '../helpers';
import { usePostStore } from '../stores/posts';
import { computed } from 'vue'

const store = usePostStore();

const getUsers = computed(() => {
    return store.getUsers;
});

const filterPostByUserId = (userId) => {
    store.filterPostByUserId(userId);
}

const getSelectedUser = computed(() => {
    return store.selectedUserId;
});

</script>

<style lang="sass" scoped>
.overlapping
  border: 2px solid white
  position: absolute

.avatar_border
  border: 1px solid $secondary


</style>