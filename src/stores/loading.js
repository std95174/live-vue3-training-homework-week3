export const loadingStore = defineStore('loading', {
    state: () => ({isLoading: false}),
    getters: {},
    actions: {
        toggleLoading() {
            this.isLoading = !this.isLoading
        },
    },
})
