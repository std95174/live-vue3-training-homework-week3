<template>
  <!-- Delete Product Modal -->
  <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteProductModalLabel">確定刪除？</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定要刪除 <span class="fw-bold fst-italic">{{ selectedProduct.title }}</span> 嗎？ <br>
          刪除後將無法復原。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                  @click="deleteProduct(selectedProduct.id)">刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'pinia'
import {productStore} from "../stores/product.js";
import {loadingStore} from "../stores/loading.js";

export default {
  name: "DeleteProductModal",
  methods: {
    async deleteProduct(id) {
      loadingStore().setIsLoading(true)
      try {
        const {data} = await this.$axios.delete(`/api/${import.meta.env.VITE_API_PATH}/admin/product/${id}`)
        if (data.success) {
          await productStore().getProducts()
        }
      } catch (e) {
        console.log(e)
      } finally {
        loadingStore().setIsLoading(false)
      }
    },
  },
  computed: {
    ...mapState(productStore, ['selectedProduct']),
  }
}
</script>

<style scoped>

</style>
