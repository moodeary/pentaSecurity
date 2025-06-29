<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :title="`리스트 목록`"
      :rows="postStore.getPaginationPosts"
      row-key="seq"
      :columns="columns"
      :filter="filter"
      separator="vertical"
      :loading="postStore.isLoading"
      :v-model:pagination="paginations"
      :rows-per-page-options="[10, 20]"
      class="h-[670px]"
      @request="onRequest"
    >
       <!-- 검색 기능 -->
      <template v-slot:top-right>
        <q-input color="teal-4" dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- 해더 -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-weight: 500; font-size: 15px; text-align: center; color: gray"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- 내용 -->
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="postStore.setSelectPost(props.row); dialogStore.onSelectPost()"
            class="cursor-pointer m-w-[100%]"
            :class="props.rowIndex % 2 !== 0 ? 'bg-white' : 'bg-grey-3'"
          >
            <!-- 번호 -->
            <q-td key="id" :props="props" class="!w-[10%]">
              {{ props.row.id }}
            </q-td>

              <!-- 작성자 -->
            <q-td key="author" :props="props" class="!w-[10%]">
              {{ props.row.author }}
            </q-td>

            <!-- 제목 (2줄 제한 + 말줄임) -->
            <q-td key="title" :props="props" class="!w-[15%]">
              {{ props.row.title }}
            </q-td>

            <!-- 내용 (2줄 제한 + 말줄임) -->

            <q-td key="content" :props="props" class="!w-[50%]">
              {{ props.row.content }}
            </q-td>

            <!-- 생성일시 -->
            <q-td key="createdAt" :props="props" class="text-center !w-[15%]">
              {{ formatDateTime(props.row.createdAt) }}
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import { useDialogStore } from '@/stores/dialog'
import dayjs from 'dayjs'

const postStore = usePostStore()
const dialogStore = useDialogStore()
const filter = ref('')
function formatDateTime(date) {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
}

const columns = [
  { name: 'id', label: '순서', field: 'id', align: 'center' },
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

const paginations = ref(postStore.paginations)
const onRequest = async (props) => {
  paginations.value.rowsPerPage = props.pagination.rowsPerPage
  paginations.value.page = props.pagination.page

  await postStore.fetchPaginationPosts(paginations.value, filter.value)
  paginations.value.rowsNumber = postStore.pagination.posts.totalElements
}

const initialRequest = async () => {
  await postStore.fetchPaginationPosts(paginations.value, filter.value)
  paginations.value.rowsNumber = postStore.pagination.posts.totalElements
}

onMounted(() => {
  initialRequest()
})
</script>

  <style scoped>
    .ellipsis-2-lines {
  max-height: 3em; /* 2줄 높이 */
  line-height: 1.5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄 제한 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  padding: 8px 16px; /* 적절한 패딩 */
  word-break: break-word; /* 단어 단위 줄바꿈 */
}
  </style>
