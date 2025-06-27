<template>
  <q-card class="w-[300px] h-[200px] bg-white border-l-8 !rounded-[15px] border-brand-purple">
    <!-- 헤더: 타이틀과 닫기 버튼 -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 rounded-t-xl">
      <div class="flex items-center space-x-2">
        <q-icon name="help_outline" size="24px" class="text-brand-purple" />
        <div class="!ml-[12px] text-sm font-bold text-gray-700">확인 요청</div>
      </div>
      <q-btn icon="close" flat dense round size="sm" class="hover:bg-gray-100" v-close-popup />
    </div>

    <!-- 내용 -->
    <div class="p-4 text-center">
      <div class="mb-4 text-gray-800 text-lg font-medium">{{ confirmData.title }}</div>
      <div class="mb-6 text-sm text-gray-500">
        {{ confirmData.message1 }}<br />
        {{ confirmData.message2 }}
      </div>

      <!-- 액션 버튼 -->
      <div class="flex justify-center gap-4 !mt-5">
        <q-btn
          label="취소"
          flat
          rounded
          class="w-24"
          color="gray"
          text-color="black"
          v-close-popup
        />
        <q-btn label="확인" rounded class="w-24" color="deep-purple-4" @click="closeDialog()" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useDialogStore } from '@/stores/dialog.js'
const dialogStore = useDialogStore()

const emit = defineEmits(['confirm'])
const { confirmData } = defineProps(['confirmData'])

function closeDialog() {
  emit('confirm')
  dialogStore.offConfirm()
}
</script>
