<template>
  <div class="min-h-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col">
    <div class="flex justify-end items-center h-15">
      <div class="text-[24px] text-center w-full text-bold text-gray-500 underline">
        무한스크롤 게시글
      </div>
      <q-btn
        icon="edit_note"
        label="새 글 등록"
        color="deep-purple-4"
        @click="newPost"
        class="h-9 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition fixed !mr-8"
        size="13px"
      />
    </div>

    <div
      class="bg-white rounded-t-3xl pt-15 px-8 pb-12 flex-col !h-[calc(100%-60px)] scrollbar overflow-y-scroll scroll-smooth"
    >
      <scroll-post />
    </div>
  </div>
</template>

<script setup>
import ScrollPost from '@/components/view/ScrollPost.vue'
import { useDialogStore } from '@/stores/dialog'
const dialogStore = useDialogStore()

const newPost = () => {
  dialogStore.onNewPost()
}
</script>

<style scoped></style>
