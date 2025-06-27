<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="loadMore" :offset="200" :disable="!postStore.infinite.hasMore">
      <q-list>
        <q-item v-for="post in postStore.getInfinitePosts" :key="post.id">
          <q-item-section>
            <div class="font-bold">{{ post.title }}</div>
            <div class="text-sm text-gray-500">{{ post.author }}</div>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 데이터 없을 때 메시지 -->
      <template v-if="postStore.getInfinitePosts.length === 0 && !loading">
        <div class="text-center q-pa-md text-grey-6">게시글이 없습니다</div>
      </template>

      <!-- 로딩 슬롯 -->
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
import { usePostStore } from '@/stores/post'
import { ref, onMounted } from 'vue'

const postStore = usePostStore()
const loading = ref(false)

const loadMore = async (done) => {
  if (!postStore.infinite.hasMore) {
    done(true) // 더 이상 데이터 없음
    return
  }

  try {
    loading.value = true
    await postStore.fetchInfinitePosts()
  } catch (e) {
    console.error('게시글 로드 실패:', e)
  } finally {
    loading.value = false
    done(!postStore.infinite.hasMore) // true 전달 시 더 이상 로드 안함
  }
}

onMounted(() => {
  // 기존 데이터 초기화
  postStore.resetInfinite()

  // 첫 페이지는 수동 로드 (스크롤 컴포넌트가 자동 로드하지 않도록)
  loadMore(() => {})
})
</script>
