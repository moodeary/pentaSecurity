<template>
  <div class="min-h-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col">
    <div class="flex justify-end items-center h-15">
      <div class="text-[24px] text-center w-full text-bold text-gray-500 underline">
        페이징 게시글
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
      <page-post />
    </div>
  </div>
</template>

<script setup>
import PagePost from '@/components/view/PagePost.vue'
import { useDialogStore } from '@/stores/dialog'
const dialogStore = useDialogStore()

const newPost = () => {
  dialogStore.onNewPost()
}
</script>

<style scoped></style>
