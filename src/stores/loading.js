import {defineStore} from "pinia";

export const loadingStore = defineStore('loading', {
    state: () => ({isLoading: false}),
    getters: {},
    actions: {
        setIsLoading(isLoading) {
            this.isLoading = isLoading
        },
    },
})
