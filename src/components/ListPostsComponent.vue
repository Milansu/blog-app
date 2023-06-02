<template>
    <div v-if="getFilteredPosts.length !== 0" class="q-pa-md">
        <q-list v-for="post, p in getFilteredPosts" :key="p" separator>

            <div class="row flex">
                <q-expansion-item clickable expand-separator :label="post.title" :caption="post.body" class="col salma "
                    @click="filterCommentsByPostId(post.id)">

                    <q-card>
                        <q-card-section v-if="post.id === getSelectedPost">
                            <q-list v-for="comment in getComments(post.id)" :key="comment.id" separator
                                class="rounded-borders" style="max-width: 600px">
                                <q-item-section top class="q-pa-md roboto">
                                    <q-item-label lines="1">
                                        <span class="text-weight-medium">• {{ comment.email }}</span>
                                        <span class="text-grey-8"> - commented</span>
                                    </q-item-label>
                                    <q-item-label caption lines="1">
                                        {{ comment.name }}
                                    </q-item-label>
                                    <q-item-label class="q-mt-xs text-body2">
                                        <span class="cursor-pointer">{{ comment.body }}</span>
                                    </q-item-label>
                                </q-item-section>
                            </q-list>


                        </q-card-section>
                    </q-card>



                </q-expansion-item>
                <div class="row justify-center items-center">
                    <q-icon color="accent" name="delete" @click="deletePost(post.id)"
                        style="font-size: 1.5em; text-align: center;" />
                    <q-separator vertical inset class="q-mx-sm" />
                    <q-icon color="accent" name="edit" @click="showDialog(post.id, BlogAction.UPDATE)"
                        style="font-size: 1.5em; text-align: center;" />
                </div>
            </div>

        </q-list>
    </div>
</template>


<script setup>
import { usePostStore } from '../stores/posts';
import { computed } from 'vue';
import { useQuasar } from 'quasar'
import FormDialog from '../components/FormDialog'
import { BlogAction } from 'src/enums';

const store = usePostStore();

const $q = useQuasar()

const getFilteredPosts = computed(() => {
    return store.filteredPosts;
});

const getComments = computed(() => (postId) => {
    return store.getCommentForPost(postId);
});

const getSelectedPost = computed(() => {
    return store.getSelectedPost;
});

const filterCommentsByPostId = (postId) => {
    return store.filterCommentsByPostId(postId);
};

const deletePost = (id) => {
    store.deletePost(id);
}

function showDialog(id, formType) {
    $q.dialog({
        component: FormDialog,
        componentProps: {
            id: id,
            type: formType
        }
    });
}

</script>