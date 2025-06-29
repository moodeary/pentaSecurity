<template>

  <div>
    <q-input
      stacked
      v-model="filter"
      debounce="300"
      placeholder="검색어를 입력하세요"
      class="w-[200px] q-mb-md"
      color="teal-4"
      dense
      @keyup.enter="newSearch"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div id="my-scroll-target" class="h-[calc(100vh-330px)] overflow-auto border-1 border-purple-400" >
      <q-infinite-scroll
        v-if="postStore.getInfinitePosts.length > 0"
        @load="loadMorePosts"
        :offset="200"
        scroll-target="#my-scroll-target"
      >
        <q-list bordered separator v-for="item in postStore.getInfinitePosts" :key="item.id" >
          <q-item clickable @click="postStore.setSelectPost(item); dialogStore.onSelectPost()" class="cursor-pointer">

            <q-item-section class="col-2">
              <q-item-label class="text-bold">{{ item.id }}</q-item-label>
            </q-item-section>

            <q-item-section >
              <q-item-label lines="1">
                <span class="text-grey-8 text-[14px] text-weight-semibold"> {{ item.title }}</span>
              </q-item-label>
              <q-item-label caption lines="2">
                {{ item.content }}
              </q-item-label>
              <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-deep-purple-4 ">
                <span class="cursor-pointer text-[12px]">[mock 데이터입니다.]</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label lines="1" class="q-mt-xs  text-weight-bold text-[13px] text-gray-4 text-uppercase">
                <q-item-label class="cursor-pointer text-right">  {{ formatDateTime(item.createdAt) }}</q-item-label>
                <q-item-label class="q-mt-sm text-right"><q-chip class="glossy" size="11px" outline color="teal-4" icon="person" :label="item.author" /> </q-item-label>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="deep-purple-4" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>



      <div v-else class="flex flex-col items-center justify-center h-full">
        <q-icon name="warning" size="50px" color="deep-purple-4" />
        <p class="text-h6">게시글이 없습니다.</p>
        <p class="text-subtitle2">게시글을 추가해주세요.</p>
        <q-btn label="게시글 작성하기" color="purple-4" class="q-mt-md" @click="dialogStore.onNewPost()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/post.js'
import { useDialogStore } from '@/stores/dialog.js'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs' // ✅ 추가
const postStore = usePostStore()
const dialogStore = useDialogStore()
const checkLastDate = ref(true)
const $q = useQuasar()
const filter = ref('')

function formatDateTime(date) {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
}

// 무한스크롤 로딩 함수
const loadMorePosts = async (index, done) => {
   // ✅ 1. 로딩 중일 때는 아무 것도 하지 않음
  if (postStore.isLoading) {
    done()
    return
  }

  // ✅ 2. 더 이상 데이터가 없을 경우 알림 띄우고 종료
  if (!postStore.hasMorePosts) {
    if (checkLastDate.value) {
      $q.notify({
        message: '모든 데이터를 불러왔습니다.',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 3000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })

      checkLastDate.value = false
    }
    done()
    return
  }

  await postStore.fetchInfinitePosts(filter.value) // ✅ 3. 데이터 로딩 함수 호출
  done() // 로딩 완료 알림
}

const newSearch = () => {
  postStore.resetInfinitePosts() // ✅ 4. 검색어 변경 시 기존 데이터 초기화
  loadMorePosts() // ✅ 5. 새로운 검색어로 데이터 로딩
}

onMounted(() => {
  postStore.resetInfinitePosts()
  postStore.fetchInfinitePosts() // ✅ 6. 컴포넌트 마운트 시 초기 데이터 로딩
})
</script>
