import {defineStore} from "pinia";
import {instance as axios} from "../common/axios.js";

export const productStore = defineStore('product', {
    state: () => ({
        products: [],
        selectedProduct: {
            category: "",
            content: "",
            description: "",
            id: "",
            imageUrl: "",
            imagesUrl: ["", "", "", "", ""],
            is_enabled: 0,
            origin_price: 0,
            price: 0,
            title: "",
            unit: "單位",
            num: 0
        },
        pagination: {
            total_pages: 1,
            current_page: 1,
        },
        isNew: true
    }),
    getters: {},
    actions: {
        async getProducts(page = 1) {
            try {
                const {data} = await axios.get(`/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${page}`);
                this.products = data.products
                this.pagination = data.pagination
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        selectProduct(product) {
            this.selectedProduct = product
        },
        clearProduct() {
            this.selectedProduct = {
                "category": "",
                "content": "",
                "description": "",
                "id": "",
                "imageUrl": "",
                "imagesUrl": ["", "", "", "", ""],
                "is_enabled": 0,
                "origin_price": 0,
                "price": 0,
                "title": "",
                "unit": "單位",
                "num": 0
            }
        },
        setIsNew(isNew) {
            this.isNew = isNew
        }
    },
})
