<template>
    <q-page>
        <ListUsersComponent />

        <ListPostsComponent />

        <div class="window-width row justify-center items-center q-pb-lg">
            <PaginationComponent />
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-tooltip>
                Post
            </q-tooltip>
            <q-btn fab icon="add" color="dark" @click="showDialog(null, BlogAction.POST)" />
        </q-page-sticky>


    </q-page>
</template>
  
<script setup>

import { computed, onMounted } from 'vue'
import { watch } from 'vue';
import { usePostStore } from '../stores/posts';
import { usePaginationStore } from '../stores/pagination';
import PaginationComponent from '../components/PaginationComponent';
import ListUsersComponent from '../components/ListUsersComponent';
import ListPostsComponent from '../components/ListPostsComponent';
import FormDialog from '../components/FormDialog'
import { useQuasar } from 'quasar'
import { BlogAction } from 'src/enums';

const $q = useQuasar()

const store = usePostStore();

const pagination = usePaginationStore();

const currentPage = computed(() => {
    return pagination.currentPage;
});

const getSelectedUser = computed(() => {
    return store.selectedUserId;
});

const getPosts = computed(() => {
    return store.getPosts;
});

const getFilteredPosts = computed(() => {
    return store.filteredPosts;
});

function showDialog(id, formType) {
    $q.dialog({
        component: FormDialog,
        componentProps: {
            id: id,
            type: formType
        }
    });
}

watch([currentPage, getSelectedUser], () => {
    onPageChanged();
});

function onPageChanged() {
    const start = pagination.startIndex;
    const end = pagination.endIndex;

    if (getSelectedUser.value === -1) {
        store.filteredPosts = getPosts.value.slice(start, end);
        pagination.setTotalItems(getPosts.value.length);
    } else {
        store.filteredPosts = getFilteredPosts.value.slice(start, end);
        pagination.setTotalItems(getFilteredPosts.value.length);
    }
}

onMounted(async () => {
    await Promise.all([
        store.fetchPosts(),
        store.fetchUsers(),
        store.fetchComments(),
    ])
    onPageChanged();
})

</script>
