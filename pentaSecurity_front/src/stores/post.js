import { defineStore } from 'pinia'
import { apiAxios } from '@/axios/apiAxios.js'
import { useQuasar } from 'quasar'
import { reactive, computed, ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const $q = useQuasar()

  // 무한스크롤 상태
  const infinite = reactive({
    posts: [],
    page: 0,
    size: 15,
    hasMore: true,
  })
    // 로딩 상태 추가
  const loading = ref(false)

  // 페이지네이션 상태
  const pagination = ref({
    posts: [],
    descending: false,
    sortBy: null,
    rowsPerPage: 50,
    page: 1,
    rowsNumber: 0,
  })

  const selectPost = ref({})

  // Getters for computed properties
  const getInfinitePosts = computed(() => infinite.posts)
  const getPaginationPosts = computed(() => pagination.value.posts)
  const isLoading = computed(() => loading.value)
  const hasMorePosts = computed(() => infinite.hasMore)
  const paginations = computed(() => pagination.value)
  const getSelectPost = computed(() => selectPost.value)


  const setSelectPost = (post) => {
    selectPost.value = post
  }

  // Action to fetch initial infinite scroll posts
  const fetchInfinitePosts = async (searchTerm) => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!infinite.hasMore) return

    try {
      const res = await apiAxios.get('/posts', {
        params: {
          page: infinite.page,
          size: infinite.size,
          strategy: 'infinite',
          keyword: searchTerm,
        },
      })

      const data = res.data.data
      loading.value = false
      infinite.posts.push(...data.content)
      infinite.hasMore = !data.last
      infinite.page += 1
    } catch (e) {
      $q.notify({
        message: e.response?.data?.message || '무한스크롤 데이터 불러오기 실패',
        type: 'negative',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })
    } finally {
      loading.value = false
    }
  }

  const resetInfinitePosts = () => {
    infinite.posts = []
    infinite.page = 0
    infinite.hasMore = true
  }

  // page네이션 상태 초기화
  const resetPagination = () => {
    pagination.value.posts = []
    pagination.value.page = 1
    pagination.value.rowsNumber = 0
    pagination.value.totalPages = 0
    pagination.value.sortBy = null
    pagination.value.descending = false
  }

  // Action to fetch pagination posts
  // getPage: { page, rowsPerPage, sortBy, descending }
  // searchTerm: 검색어
  const fetchPaginationPosts = async (getPage, searchTerm) => {
    loading.value = true;
    try {
      const params = {
        strategy: 'paging',
        page: getPage.page - 1, // Spring Data는 0부터 시작
        size: getPage.rowsPerPage,
        sortBy: getPage.sortBy || 'id',
        sortDir: getPage.descending ? 'DESC' : 'ASC',
        keyword: searchTerm,
      };

      const res = await apiAxios.get('/posts', { params });
      const data = res.data.data;

      // 데이터 갱신
      pagination.value.posts = data.content;
      pagination.value.totalPages = data.totalPages;
      pagination.value.rowsNumber = data.totalElements; // Q-Table의 rowsNumber에 맞춤
      pagination.value.currentPage = pagination.value.page; // 혹은 필요시 data.pageable.pageNumber + 1
      pagination.value.rowsNumber = data.totalElements; // Q-Table의 rowsNumber에 맞춤


    } catch (e) {
      $q.notify({
        message: e.response?.data?.message || '페이지네이션 데이터 불러오기 실패',
        type: 'negative',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })
    } finally {
      loading.value = false
    }
  }

  // Create a new post
  const createPost = async (postData) => {
    try {
      const res = await apiAxios.post('/posts', postData)
      $q.notify({
        type: 'positive',
        message: res.data.message || '게시글이 등록되었습니다!',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })

      resetPagination()
      resetInfinitePosts() // Reset infinite scroll state

      await fetchInfinitePosts() // Fetch updated posts after deletion
      await fetchPaginationPosts(pagination.value, '') // Fetch updated pagination posts


      return res
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '게시글 등록에 실패했습니다.',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })
      throw e
    }
  }

  // update a post using PUT request
  const updatePost = async (id, postData) => {
    try {
      const res = await apiAxios.put(`/posts/${id}`, postData)
      $q.notify({
        type: 'positive',
        message: res.data.message || '게시글이 수정되었습니다!',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })

      resetPagination()
      resetInfinitePosts() // Reset infinite scroll state

      await fetchInfinitePosts() // Fetch updated posts after update
      await fetchPaginationPosts(pagination.value, '') // Fetch updated pagination posts

      return res
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '게시글 수정에 실패했습니다.',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })
      throw e
    }
  }

  // http://localhost:8080/api/posts/1  <=-- delete method id값 받아서

  const deletePost = async (postId) => {
    try {
      const res = await apiAxios.delete(`/posts/${postId}`)
      $q.notify({
        type: 'positive',
        message: res.data.message || '게시글이 삭제되었습니다!',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })

      resetPagination()
      resetInfinitePosts() // Reset infinite scroll state

      await fetchInfinitePosts() // Fetch updated posts after deletion
      await fetchPaginationPosts(pagination.value, '') // Fetch updated pagination posts

      return res

    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.response?.data?.message || '게시글 삭제에 실패했습니다.',
        color: 'deep-purple-4',
        position: 'bottom',
        timeout: 2000,
        actions: [{ label: '닫기', color: 'white', handler: () => {} }],
      })
      throw e
    }
  }


  return {
    loading,
    isLoading,
    hasMorePosts,
    infinite,
    paginations,
    pagination,
    getInfinitePosts,
    getPaginationPosts,
    getSelectPost,
    fetchInfinitePosts,
    fetchPaginationPosts,
    createPost,
    updatePost,
    resetInfinitePosts,
    resetPagination,
    setSelectPost,
    deletePost
  }
})
