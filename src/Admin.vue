<template>
  <div class="container mt-3">
    <div class="text-end">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateProductModal"
              @click="isNew = true; clearProduct()">
        建立新產品
      </button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <th>{{ product.category }}</th>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td :class="product.is_enabled?'text-success':''">{{ product.is_enabled ? '已啟用' : '未啟用' }}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-3" data-bs-toggle="modal"
                  data-bs-target="#updateProductModal" @click="selectedProduct = {...product}; isNew = false">編輯
          </button>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteProductModal"
                  @click="selectProduct(product)">刪除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @page-change="pageChange"></pagination>
  </div>

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

  <!-- Delete Product Modal -->
  <delete-product-modal></delete-product-modal>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {productStore} from "./stores/product.js";
import Pagination from "./components/Pagination.vue";
import DeleteProductModal from "./components/DeleteProductModal.vue";

const apiPath = 'frank-hex-api'
export default {
  name: "Admin",
  components: {Pagination, DeleteProductModal},
  data() {
    return {};
  },
  methods: {
    ...mapActions(productStore, ['clearProduct','getProducts','selectProduct']),
    async updateProduct(isNew) {
      this.selectedProduct.origin_price = Number(this.selectedProduct.origin_price)
      this.selectedProduct.price = Number(this.selectedProduct.price)
      if (isNew) {
        try {
          const {data} = await this.axios.post(`/api/${apiPath}/admin/product`, {data: this.selectedProduct})
          if (data.success) {
            await this.getProducts()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const {data} = await axios.put(`/api/${apiPath}/admin/product/${this.selectedProduct.id}`, {
            data: this.selectedProduct
          })
          if (data.success) {
            await this.getProducts()
          }
        } catch (e) {
          console.log(e)
        }
      }
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
    async pageChange(page) {
      if (page !== this.pagination.current_page || page >= 0 || page <= this.pagination.total_pages) {
        await productStore().getProducts(page)
      }
    }
  },
  computed:{
    ...mapState(productStore, ['products', 'pagination', 'selectedProduct', 'isNew'])
  },
  async mounted() {
    await this.getProducts();
  },
}
</script>

<style scoped>

</style>
