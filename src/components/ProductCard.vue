<script setup>
import { useCartStore } from "../stores/cart";
const { addToCart, isInCart } = useCartStore();
defineProps(["product"]);
</script>

<template>
<div class="bg-slate-50 p-4 rounded-lg border border-slate-300 transition-colors 
hover:border-slate-700 flex flex-col gap-3">
<router-link :to="`/product/${product.slug}`">
    <img 
        :src="product.image" 
        :alt="product.name" 
        class="rounded-lg h-64 w-full object-cover ring-2 ring-rose-400" />
</router-link>
    <router-link :to="`/product/${product.slug}`">
     <h2 class="text-red-500 text-xl mb-auto">
        {{product.name}}
    </h2></router-link>
   
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
            <i class="fas fa-cart-plus text-emerald-900" v-else></i>

</button>
    </div>
</div>
</template>
