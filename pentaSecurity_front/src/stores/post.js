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
    size: 10,
    hasMore: true,
  })

  // 페이지네이션 상태
  const pagination = reactive({
    posts: [],
    currentPage: 0, // 0-based
    totalPages: 0,
    size: 10,
    totalElements: 0,
  })

  // 무한스크롤 Getter
  const getInfinitePosts = computed(() => infinite.posts)

  // 페이지네이션 Getter
  const getPaginationPosts = computed(() => pagination.posts)

  // 무한스크롤 데이터 불러오기
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
        message: e.response?.data?.message || '무한스크롤 데이터 불러오기 실패',
        position: 'top',
      })
    }
  }

  // 무한스크롤 상태 초기화
  const resetInfinite = () => {
    infinite.posts = []
    infinite.page = 0
    infinite.hasMore = true
  }

  // 페이지네이션 데이터 불러오기
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
      pagination.totalElements = data.totalElements || data.totalPages * pagination.size
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '페이지네이션 데이터 불러오기 실패',
        position: 'top',
      })
    }
  }

  // 게시글 생성
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

  return {
    infinite,
    pagination,
    getInfinitePosts,
    getPaginationPosts,
    fetchInfinitePosts,
    resetInfinite,
    fetchPaginationPosts,
    createPost,
  }
})
