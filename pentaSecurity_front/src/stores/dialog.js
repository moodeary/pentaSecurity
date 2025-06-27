import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    leftDrawerOpen: true,
    link: 'celebration',
    isNewPost: false,
    isConfirm: false,
  }),

  getters: {},

  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    changeSideBar(newLink) {
      this.link = newLink
    },

    onNewPost() {
      this.isNewPost = true
    },

    offNewPost() {
      this.isNewPost = false
    },

    onConfirm() {
      this.isConfirm = true
    },

    offConfirm() {
      this.isConfirm = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot))
}
