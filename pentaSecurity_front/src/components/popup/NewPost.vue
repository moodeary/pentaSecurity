<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-card
    class="w-[605px] min-w-[605px] px-8 pb-8 pt-4 border-l-8 border-brand-purple shadow-lg !rounded-2xl"
  >
    <q-card-section class="text-center text-[27px] text-bold text-gray-600"> 새 글</q-card-section>
    <q-btn
      color="deep-purple-4"
      icon="close"
      flat
      v-close-popup
      size="16px"
      class="absolute right-[10px] top-[30px]"
    />

    <q-form @submit.prevent="beforeCreate" @keydown.enter.prevent class="space-y-6">
      <q-input
        v-model="postInfo.title"
        color="deep-purple-4"
        label="제목"
        outlined
        dense
        required
        stack-label
        class="q-mb-md"
      />
      <q-input
        v-model="postInfo.content"
        label="내용"
        type="textarea"
        outlined
        dense
        required
        color="deep-purple-4"
        class="q-mb-md"
        stack-label
      />
      <q-input
        v-model="postInfo.author"
        color="deep-purple-4"
        label="작성자"
        outlined
        dense
        required
        stack-label
        class="q-mb-md"
      />

      <!-- 저장 버튼 -->
      <div class="flex justify-end">
        <q-btn v-close-popup label="닫기" color="white" text-color="purple-4" class="px-8 !mr-4" />
        <q-btn type="submit" label="저장" color="purple-4" class="px-8" />
      </div>
    </q-form>
    <q-dialog v-model="dialogStore.isConfirm">
      <confirm-check @confirm="createPost" :confirmData="confirmData" />
    </q-dialog>
  </q-card>
</template>
<script setup>
import { ref } from 'vue'
import { usePostStore } from '@/stores/post'
import { useDialogStore } from '@/stores/dialog'
import ConfirmCheck from './ConfirmCheck.vue'

const postStore = usePostStore()
const dialogStore = useDialogStore()
const postInfo = ref({
  title: '',
  content: '',
  author: '',
})

const confirmData = ref({
  title: '새 글 생성',
  message1: '생성하시겠습니까?',
  message2: '확인을 누르면 생성됩니다.',
  eventId: null,
})

const beforeCreate = () => {
  dialogStore.onConfirm()
}

const createPost = async () => {
  await postStore.createPost(postInfo.value)
  postInfo.value = { title: '', content: '', author: '' }
  dialogStore.offNewPost()
}
</script>
