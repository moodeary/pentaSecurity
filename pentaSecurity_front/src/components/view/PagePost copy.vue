<template>
  <div class="q-pa-md">
    <q-list>
      <q-item v-for="post in postStore.getPaginationPosts" :key="post.id">
        <q-item-section>
          <div class="font-bold">{{ post.title }}</div>
          <div class="text-sm text-gray-500">{{ post.author }}</div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination v-model="currentPage" @update:model-value="changePage" color="primary" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const currentPage = ref(1)

const changePage = (page) => {
  postStore.fetchPaginationPosts(page)
}

watch(currentPage, (page) => {
  postStore.fetchPaginationPosts(page)
})

onMounted(() => {
  postStore.fetchPaginationPosts(currentPage.value)
})
</script>
