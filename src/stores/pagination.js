import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  }),
  getters: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },

  },
  actions: {
    setTotalItems(totalItems) {
      this.totalItems = totalItems;
    },
    setPage(page) {
      this.currentPage = page;
    },
    setItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
    }
  },
});