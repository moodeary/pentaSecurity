<template>
  <div class="min-h-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col">
    <div class="flex justify-end items-center h-15">
      <div class="text-[24px] text-center w-full text-bold text-gray-500 underline">
        <q-btn-toggle
          v-model="PostViewType"
          toggle-color="deep-purple-4"
          :options="toggleLabel"

        />
      </div>
      <q-btn
        icon="edit_note"
        label="게시글 작성하기"
        color="deep-purple-4"
        @click="newPost"
        class="h-9 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition fixed !mr-8"
        size="13px"
      />
    </div>

    <div
      class="bg-white rounded-t-3xl pt-15 px-8 pb-12 flex-col !h-[calc(100%-60px)] scrollbar overflow-y-scroll scroll-smooth"
    >
      <div v-if="PostViewType === 'paging'">
        <page-post />
      </div>
      <div v-else-if="PostViewType === 'infinite'">
        <scroll-post />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDialogStore } from '@/stores/dialog'
import PagePost from '@/components/view/PagePost.vue'
import ScrollPost from '@/components/view/ScrollPost.vue'
import { ref } from 'vue'

const dialogStore = useDialogStore()
const PostViewType = ref('paging')

const newPost = () => {
  dialogStore.onNewPost()
}

const toggleLabel = ref([
   {
    label: '페이지네이션',
    value: 'paging',
  },
  {
    label: '무한스크롤',
    value: 'infinite',
  },

])

</script>

<style scoped></style>
