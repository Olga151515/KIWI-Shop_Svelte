<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/products";
import InnerHeader from "../components/InnerHeader.vue";
import ProductCard from "../components/ProductCard.vue";
import LoadingError from "../components/LoadingError.vue";

const { products, loading, error } = storeToRefs(useProductsStore());
const { fetchProducts } = useProductsStore();

fetchProducts();
</script>

<template>
   <div class="bg-rose-500 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
    <div class="container bg-slate-100 rounded-2xl p-4 lg:p-6 shadow-lg">
      <InnerHeader title="Our products" />
      <div class="p-4 text-center" v-if="loading">Loading Products...</div>
      <div class="p-4 text-center bg-red-300" v-if="error">
      {{error.message}}
      </div>
      <LoadingError :loading="loading" :error="error" />
      <div class="products" v-if="!loading && !error">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>