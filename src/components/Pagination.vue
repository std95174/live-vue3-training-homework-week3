<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="$emit('page-change', pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active: pagination.current_page === i}" v-for="i in pagination.total_pages"
          :key="i">
        <a class="page-link" href="#" @click.prevent="$emit('page-change', i)"> {{ i }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="$emit('page-change', pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
