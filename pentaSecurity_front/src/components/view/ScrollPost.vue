<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="loadMore" :offset="200" :disable="!postStore.infinite.hasMore">
      <q-list>
        <q-item v-for="post in postStore.getInfinitePosts" :key="post.id">
          <q-item-section>
            <div class="font-bold">{{ post.title }}</div>
            <div class="text-sm text-gray-500">{{ post.author }}</div>
            <div class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</div>
          </q-item-section>
        </q-item>
      </q-list>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots v-if="postStore.infinite.hasMore" color="primary" size="40px" />
          <div v-else class="text-caption text-grey-6">마지막 페이지입니다</div>
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import dayjs from 'dayjs'

const postStore = usePostStore()

function formatDate(dateString) {
  return dayjs(dateString).format('YYYY.MM.DD HH:mm:ss')
}

const loadMore = async (done) => {
  await postStore.fetchInfinitePosts()
  done(!postStore.infinite.hasMore)
}

onMounted(() => {
  postStore.resetInfinite()
  postStore.fetchInfinitePosts()
})
</script>
