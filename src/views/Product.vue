<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useProductsStore } from "../stores/products";
import { useCartStore } from "../stores/cart";
import InnerHeader from "../components/InnerHeader.vue";
import LoadingError from "../components/LoadingError.vue";
import { watch } from "vue";
const { product, loading, error } = storeToRefs(useProductsStore());
const { fetchProduct } = useProductsStore();
const { addToCart, isInCart } = useCartStore();
const route = useRoute();
fetchProduct(route.params.slug);
watch(
  () => route.params.slug,
  () => {
    fetchProduct(route.params.slug);
  }
);
</script>

<template>
<div class="bg-rose-500 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
    <div class="container bg-slate-100 rounded-2xl p-4 lg:p-6 shadow-lg">
        <InnerHeader :title="product ? product.name : 'Product'"/>
        <LoadingError :loading="loading" :error="error" />
  <div class="flex flex-col lg:flex-row gap-3" v-if="product">
    
    <img 
        :src="product.image ? product.image : '/images/images.jpeg'" 
        :alt="product.name" 
        class="rounded-lg h-96 w-full object-cover" />

        <div class="flex flex-col gap-4">
     <h1 class="text-red-500 text-2xl font-bold">
        {{product.name}}
    </h1>
    <h4 
        class="text-slate-500 text-xl "
        :class="{'text-green-500' : product.inStock,
                'text-red-500' : !product.inStock,}"
                >
                {{product.inStock ? "In stock" : "Not in Stock"}}
    </h4>
    <p class="text-slate-500 font-light text-sm">
{{product.description}}    </p>
    <div class="flex justify-between items-center pb-3">
        <div class="flex flex-col gap-1">
            <span class="line-through" v-if="product.oldPrice">
           $ {{product.oldPrice.toFixed(2)}}
            </span>
            <span class="text-lg text-red-500 -my">
               $ {{product.price.toFixed(2)}}
                </span>
        </div>
        <button 
            class="text-rose-500 font-bold  border-rose-300 
            border-opacity-50 text-xl mt-4 py-3 border-2 p-2 rounded-xl hover:border-opacity-100 
            hover:text-rose-400 disabled:opacity-50 disabled:pointer-events-none 
            disabled:border-emerald-600 disabled:text-emerald-500"
        
            :disabled="!product.inStock || isInCart(product.slug) !== -1"
            @click="addToCart(product.slug)">

            <i class="fa fa-cart-arrow-down" v-if="isInCart(product.slug) === -1 && product.inStock"></i>
            <i class=" fas fa-shopping-cart text-cyan-900 border-cyan-900" v-else-if="!product.inStock"></i>        
            <i class="fas fa-cart-plus text-emerald-600" v-else></i>

</button>
    </div>
</div>
</div>
</div>
</div>
</template>