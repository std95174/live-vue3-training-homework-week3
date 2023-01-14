<template>
  <!-- Create/Edit Product Modal -->
  <div class="modal fade" id="updateProductModal" tabindex="-1" aria-labelledby="updateProductModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateProductModalLabel">
            {{ `${isNew ? '新增' : '更新'}` }}產品</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input type="text" class="form-control" id="title" v-model="selectedProduct.title">
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">描述</label>
                  <textarea type="text" class="form-control" id="content" v-model="selectedProduct.content"></textarea>
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">說明</label>
                  <textarea type="text" class="form-control" id="description"
                            v-model="selectedProduct.description"></textarea>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="category" class="form-label">分類</label>
                    <input type="text" class="form-control" id="category" v-model="selectedProduct.category">
                  </div>
                  <div class="col">
                    <label for="unit" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" v-model="selectedProduct.unit">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="origin-price" class="form-label">原價</label>
                    <input type="text" class="form-control" id="origin-price" v-model="selectedProduct.origin_price">
                  </div>
                  <div class="col">
                    <label for="price" class="form-label">售價</label>
                    <input type="text" class="form-control" id="price" v-model="selectedProduct.price">
                  </div>
                </div>
                <div class="mb-3 form-check form-switch">
                  <label class="form-check-label" for="is-enabled">是否啟用</label>
                  <input class="form-check-input" type="checkbox" id="is-enabled" role="switch" :true-value="1"
                         :false-value="0"
                         v-model="selectedProduct.is_enabled">
                </div>
                <div class="mb-3">
                  <label for="image-url" class="form-label">產品主圖</label>
                  <input type="text" class="form-control" id="image-url" placeholder="請輸入主圖網址"
                         v-model="selectedProduct.imageUrl">
                  <div class="text-center">
                    <img class="img-fluid w-50 mt-3" :src="selectedProduct.imageUrl" alt="產品主圖">
                  </div>
                </div>
              </form>
            </div>
            <div class="col">
              <form>
                <div class="row mb-3">
                  <div class="col-6" v-for="(i, n) in 5" :key="n">
                    <label :for="`image-url-${n}`" class="form-label">圖片網址 {{ i }}</label>
                    <input type="text" class="form-control" :id="`image-url-${n}`" :placeholder="`請輸入圖片網址 ${i}`"
                           v-model="selectedProduct.imagesUrl[n]">
                    <div class="text-start">
                      <img class="img-fluid w-100 mt-3" :src="selectedProduct.imagesUrl[n]" :alt="`產品圖片 ${i}`">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateProduct(isNew)">
            {{ isNew ? '新增' : '更新' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {productStore} from "../stores/product.js";

export default {
  name: "UpdateProductModal",
  methods:{
    async updateProduct(isNew) {
      this.selectedProduct.origin_price = Number(this.selectedProduct.origin_price)
      this.selectedProduct.price = Number(this.selectedProduct.price)
      if (isNew) {
        try {
          const {data} = await this.$axios.post(`/api/${import.meta.env.VITE_API_PATH}/admin/product`, {data: this.selectedProduct})
          if (data.success) {
            await productStore().getProducts()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const {data} = await this.$axios.put(`/api/${import.meta.env.VITE_API_PATH}/admin/product/${this.selectedProduct.id}`, {
            data: this.selectedProduct
          })
          if (data.success) {
            await productStore().getProducts()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
  computed:{
    ...mapState(productStore, ['selectedProduct', 'isNew'])
  }
}
</script>

<style scoped>

</style>
