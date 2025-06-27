<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="postStore.getPaginationPosts"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :loading="loading"
      @request="onRequest"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { usePostStore } from '@/stores/post'
import dayjs from 'dayjs'

const postStore = usePostStore()
const loading = ref(false)

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'author', label: '작성자', field: 'author', align: 'center' },
  { name: 'title', label: '제목', field: 'title', align: 'center' },
  { name: 'content', label: '내용', field: 'content', align: 'center' },
  {
    name: 'createdAt',
    label: '생성일시',
    field: 'createdAt',
    align: 'center',
    format: (val) => dayjs(val).format('YYYY.MM.DD HH:mm:ss'),
  },
]

const pagination = ref({
  page: 1, // Quasar Table은 1-based
  rowsPerPage: postStore.pagination.size,
  rowsNumber: 0,
})

const onRequest = async (props) => {
  loading.value = true
  await postStore.fetchPaginationPosts(props.pagination.page - 1)
  loading.value = false

  pagination.value.page = props.pagination.page
  pagination.value.rowsPerPage = props.pagination.rowsPerPage
  pagination.value.rowsNumber = postStore.pagination.totalElements
}

watch(
  () => postStore.pagination.totalElements,
  (newVal) => {
    pagination.value.rowsNumber = newVal
  },
)
watch(
  () => postStore.pagination.size,
  (newVal) => {
    pagination.value.rowsPerPage = newVal
  },
)

onMounted(() => {
  onRequest({ pagination: pagination.value })
})
</script>
