<template>
  <div>
    <q-list padding bordered separator>
      <template v-for="(menu, idx) in sideMenu" :key="idx">
        <q-item-label v-if="menu.type === 'header'" header class="text-grey-6">
          {{ menu.label }}
        </q-item-label>

        <q-expansion-item
          v-else-if="menu.type === 'expansion'"
          :icon="menu.icon"
          :label="menu.label"
          :class="activeClass(menu.key)"
          :active="isActive(menu.key)"
          @click="setActive(menu.key)"
          default-opened
        >
          <template v-for="(child, cIdx) in menu.children" :key="cIdx">
            <q-expansion-item
              v-if="child.type === 'expansion'"
              :header-inset-level="1"
              hide-expand-icon
              :to="child.to"
              :icon="child.icon"
              :label="child.label"
              :class="activeClass(child.key)"
              :active-class="activeClass(child.key)"
              :active="isActive(child.key)"
              @click="setActive(child.key)"
            />
          </template>
        </q-expansion-item>

        <q-item
          v-else-if="menu.type === 'item'"
          clickable
          v-ripple
          :to="menu.to"
          :active-class="activeClass(menu.key)"
          :active="isActive(menu.key)"
          @click="setActive(menu.key)"
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>
          <q-item-section>{{ menu.label }}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup>
import { useDialogStore } from '@/stores/dialog.js'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { sideMenu } from '@/mock/layoutData'

onMounted(() => {
  const route = useRoute()
  const lastSegment = route.fullPath.split('/').pop()
  dialogStore.link = lastSegment
  dialogStore.changeSideBar(lastSegment)
})

const dialogStore = useDialogStore()

const activeClass = (key) =>
  dialogStore.link === key ? 'bg-teal-4 text-white' : 'bg-white text-grey-9'

const isActive = (key) => dialogStore.link === key
const setActive = (key) => dialogStore.changeSideBar(key)
</script>
