<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2 text-grey-9">
    <!-- 헤더 -->
    <q-header elevated class="bg-white text-grey-9">
      <header-component />
    </q-header>

    <!-- 사이드바 -->
    <q-drawer show-if-above persistent v-model="dialogStore.leftDrawerOpen" side="left" bordered>
      <side-bar-component />
    </q-drawer>

    <!-- 메인 콘텐츠 -->
    <q-page-container class="bg-grey-1 window-height">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white">
      <footer-layout />
    </q-footer>

    <q-dialog v-model="dialogStore.isNewPost">
      <new-post />
    </q-dialog>

    <q-dialog v-model="dialogStore.isSelectPost">
      <select-post />
    </q-dialog>
  </q-layout>
</template>

<script setup>
import HeaderComponent from '@/components/Layout/HeaderBar.vue'
import SideBarComponent from '@/components/Layout/SideBar.vue'
import FooterLayout from '@/components/Layout/FooterBar.vue'
import NewPost from '@/components/popup/NewPost.vue'
import SelectPost from '@/components/popup/SelectPost.vue'

import { useDialogStore } from '@/stores/dialog.js'
const dialogStore = useDialogStore()
</script>

<style scoped>
.q-drawer {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}
</style>
