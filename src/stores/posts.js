import { defineStore } from "pinia";
import axios from "axios";
import { Loading } from "quasar";
import { usePaginationStore } from "../stores/pagination";
import { searchInsert } from '../helpers';

const pagination = usePaginationStore();

const baseUrl = "https://jsonplaceholder.typicode.com";

export const usePostStore = defineStore("post", {
  state: () => ({
    selectedUserId: -1,
    selectedPost: -1,
    posts: [],
    filteredPosts: [],
    users: [],
    comments: [],
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getFilteredPosts(state) {
      return state.filteredPosts;
    },
    getUsers(state) {
      return state.users;
    },
    getSelectedUserId(state) {
      return state.selectedUserId;
    },
    getCommentForPost: (state) => (postId) => {
      return state.comments.filter((e) => e.postId === postId);
    },
    getSelectedPost(state) {
      return state.selectedPost;
    },
  },
  actions: {
    async fetchPosts() {
      try {
        Loading.show();
        const data = await axios.get(`${baseUrl}/posts`);
        this.posts = data.data;
        this.filteredPosts = this.posts;
      } catch (error) {
        alert(error);
      } finally {
        Loading.hide();
      }
    },
    async deletePost(id) {
      try {
        Loading.show();
        await axios.delete(`${baseUrl}/posts/${id}`);

        this.posts = this.posts.filter((e) => e.id !== id);
        this.filteredPosts = this.filteredPosts.filter((e) => e.id !== id);
      } catch (error) {
        alert(error);
      } finally {
        Loading.hide();
      }
    },
    async createPost(title, body) {
      try {
        Loading.show();
        const data = await axios.post(`${baseUrl}/posts`, {
          title: title,
          body: body,
        });
        this.selectedUserId = -1;

        const n = this.posts.push(data.data);

        if (pagination.totalItems % 10 != 0) {
          this.filteredPosts = this.posts.slice(
            pagination.startIndex,
            pagination.endIndex
          );
        }

        pagination.setTotalItems(n);
      } catch (error) {
        alert(error);
      } finally {
        Loading.hide();
      }
    },
    async updatePost(id, title, body) {
      try {
        Loading.show();

        const data = await axios.put(`${baseUrl}/posts/${id}`, {
          title: title,
          body: body,
        });

        const filteredIds = this.filteredPosts.map((e) => e.id);
        const postIds = this.posts.map((e) => e.id);

        //!!! Assuming the id's are always in the ascending order, if not use findIndex
        const fid = searchInsert(filteredIds, id);
        const pid = searchInsert(postIds, id);

        this.filteredPosts[fid] = data.data;
        this.posts[pid] = data.data;
      } catch (error) {
        alert(error);
      } finally {
        Loading.hide();
      }
    },

    async fetchUsers() {
      try {
        const data = await axios.get(`${baseUrl}/users`);

        this.users = data.data;

        return this.users;
      } catch (error) {
        alert(error);
      }
    },

    async fetchComments() {
      try {
        const response = await axios.get(`${baseUrl}/comments`);
        this.comments = response.data;
      } catch (error) {
        alert(error);
      }
    },

    filterPostByUserId(userId) {
      if (this.selectedUserId === userId) {
        this.selectedUserId = -1;
        this.filteredPosts = this.posts.slice();
      } else {
        this.selectedUserId = userId;
        this.filteredPosts = this.posts.filter((post) => post.userId === userId);
        pagination.setPage(1);
      }
      pagination.setTotalItems(this.filteredPosts.length);
    },


    filterCommentsByPostId(postId) {
      this.selectedPost = postId;
    },
  },
});
