import { defineStore } from 'pinia'
import { apiAxios } from '@/axios/apiAxios.js'
import { useQuasar } from 'quasar'
import { reactive, computed } from 'vue'

export const usePostStore = defineStore('post', () => {
  const $q = useQuasar()

  // 무한스크롤 상태
  const infinite = reactive({
    posts: [],
    page: 0,
    size: 3,
    hasMore: true,
  })

  // 페이지네이션 상태
  const pagination = reactive({
    posts: [],
    currentPage: 0,
    totalPages: 0,
    size: 2,
  })

  // Getter 대신 computed 사용
  const getInfinitePosts = computed(() => infinite.posts)
  const getPaginationPosts = computed(() => pagination.posts)

  // 액션 함수들
  const createPost = async (postData) => {
    try {
      const res = await apiAxios.post('/posts', postData)
      $q.notify({
        type: 'positive',
        message: res.data.message || '게시글이 등록되었습니다!',
        position: 'top',
      })
      return res
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '게시글 등록에 실패했습니다.',
        position: 'top',
      })
      throw e
    }
  }

  const fetchInfinitePosts = async () => {
    if (!infinite.hasMore) return

    try {
      const res = await apiAxios.get('/posts', {
        params: {
          page: infinite.page,
          size: infinite.size,
          strategy: 'infinite',
        },
      })

      const data = res.data.data
      infinite.posts.push(...data.content)
      infinite.hasMore = !data.last
      infinite.page += 1
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '게시글 목록 불러오기 실패',
        position: 'top',
      })
    }
  }

  const fetchPaginationPosts = async (page = pagination.currentPage) => {
    try {
      const res = await apiAxios.get('/posts', {
        params: {
          page,
          size: pagination.size,
          strategy: 'paging',
        },
      })

      const data = res.data.data
      pagination.posts = data.content
      pagination.totalPages = data.totalPages
      pagination.currentPage = page
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '페이지네이션 데이터 불러오기 실패',
        position: 'top',
      })
    }
  }

  const resetInfinite = () => {
    infinite.posts = []
    infinite.page = 0
    infinite.hasMore = true
  }

  // 스토어에서 노출할 내용
  return {
    infinite,
    pagination,
    getInfinitePosts,
    getPaginationPosts,
    createPost,
    fetchInfinitePosts,
    fetchPaginationPosts,
    resetInfinite,
  }
})
