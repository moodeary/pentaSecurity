<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      icon="menu"
      @click="dialogStore.toggleLeftDrawer()"
      class="text-grey-9"
    />
    <q-toolbar-title class="text-weight-bold text-uppercase">PENTASECURITY_황병수</q-toolbar-title>
    <q-space />
  </q-toolbar>
</template>

<script setup>
import { useDialogStore } from '@/stores/dialog.js'

const dialogStore = useDialogStore()
</script>

<style scoped></style>
