<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="column q-gutter-md">
                <q-input label-color="dark" label="Title *" v-model="title" :rules="nonEmptyRule"></q-input>
                <q-input label-color="dark" label="Body *" v-model="body" :rules="nonEmptyRule"></q-input>
            </q-card-section>

            <q-card-actions>
                <q-btn color="accent" :label="props.type" @click="onOKClick" />
                <q-btn color="accent" label="Cancel" @click="onDialogCancel" />
            </q-card-actions>

            <div v-if="error" class="q-px-md text-secondary text-center q-mb-md text-bold"
                style="white-space: break-spaces"> {{ error }}
            </div>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { useDialogPluginComponent } from 'quasar'
import { usePostStore } from '../stores/posts';
import { ref } from 'vue'
import { BlogAction } from 'src/enums';

const store = usePostStore();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const title = ref('');
const body = ref('');
const error = ref('');


const nonEmptyRule = [
    (val) => (val && val.length > 0) || 'The field must be filled in.',
];

const props = defineProps({
    id: Number,
    type: String
})

defineEmits([
    ...useDialogPluginComponent.emits
])
function onOKClick() {
    if (validateForm()) {
        if (props.type === BlogAction.UPDATE) {
            store.updatePost(props.id, title.value, body.value);
        }
        else if (props.type === BlogAction.POST) {
            store.createPost(title.value, body.value);
        }
        else {
            alert('Condition not handled');
        }
        onDialogOK()

    }
    else {
        showErrorMessage(error, title, body);
    }

}

function validateForm() {
    const isTitleValid = title.value && title.value.length > 0;
    const isBodyValid = body.value && body.value.length > 0;
    return isTitleValid && isBodyValid;
}

function showErrorMessage(error, title, body) {
    error.value = '';
    if (title.value === '') {
        error.value += '\nPlease enter a valid title';
    }
    if (body.value === '') {
        error.value += '\nPlease enter a valid body';
    }
}
</script>