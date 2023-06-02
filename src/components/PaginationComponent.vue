<template>
    <div>
        <q-pagination v-model="page" direction-links gutter="md" :max="totalPages" @click="pagination.setPage(page)"
            color="accent" active-design="push" active-color="dark" />
    </div>
</template>
  
<script setup>
import { usePaginationStore } from '../stores/pagination';
import { ref, computed } from 'vue';

const pagination = usePaginationStore();

const currentPage = computed(() => {
    return pagination.currentPage;
});

const totalPages = computed(() => {
    return pagination.totalPages;
});

const page = ref(currentPage.value);

</script>
  