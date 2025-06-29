<template>
  <q-card class="w-[450px] min-w-[450px] px-8 pb-8 pt-4 border-l-8 border-brand-purple shadow-lg !rounded-2xl">
    <q-card-section class="text-center text-[27px] text-bold text-gray-600">글 수정</q-card-section>
    <q-btn
      color="deep-purple-4"
      icon="close"
      flat
      v-close-popup
      size="16px"
      class="absolute right-[10px] top-[30px]"
    />

    <q-form @submit.prevent="beforeUpdate" @keydown.enter.prevent class="space-y-6">
      <q-input v-model="postInfo.title" color="deep-purple-4" label="제목" outlined dense required stack-label class="q-mb-md" />
      <q-input v-model="postInfo.content" label="내용" type="textarea" outlined dense required color="deep-purple-4" class="q-mb-md" stack-label />
      <q-input v-model="postInfo.author" color="deep-purple-4" label="작성자" outlined dense required stack-label class="q-mb-md" />

      <div class="flex justify-end">
        <q-btn @click="beforeDelete" label="삭제" color="purple-4" />

        <q-space />
        <q-btn v-close-popup label="닫기" color="white" text-color="purple-4" class="px-8 !mr-4" />
        <q-btn type="submit" label="수정" color="purple-4"  />
      </div>
    </q-form>
    <q-dialog v-model="dialogStore.isConfirm">
      <confirm-check @confirm="onConfirm" :confirmData="confirmData" />
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePostStore } from '@/stores/post'
import { useDialogStore } from '@/stores/dialog'
import ConfirmCheck from './ConfirmCheck.vue'



const postStore = usePostStore()
const dialogStore = useDialogStore()
const postInfo = ref({ title: '', content: '', author: '', id: null })

watch(() => postStore.getSelectPost, (val) => {
  postInfo.value = { ...val }
}, { immediate: true })

const confirmData = ref({
  title: '',
  message1: '',
  message2: '',
  eventId: null,
})

let actionType = ref('update')

const beforeUpdate = () => {
  actionType.value = 'update'
  confirmData.value = {
    title: '글 수정',
    message1: '수정하시겠습니까?',
    message2: '확인을 누르면 수정됩니다.',
    eventId: null,
  }
  dialogStore.onConfirm()
}

const beforeDelete = () => {
  actionType.value = 'delete'
  confirmData.value = {
    title: '글 삭제',
    message1: '삭제하시겠습니까?',
    message2: '확인을 누르면 삭제됩니다.',
    eventId: null,
  }
  dialogStore.onConfirm()
}

const onConfirm = async () => {
  if (actionType.value === 'update') {
    await postStore.updatePost(postInfo.value.id, postInfo.value)
  } else if (actionType.value === 'delete') {
    await postStore.deletePost(postInfo.value.id)
  }
  dialogStore.offSelectPost()
}
</script>
