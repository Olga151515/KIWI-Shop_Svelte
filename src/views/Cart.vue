<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import InnerHeader from "../components/InnerHeader.vue";
const { cart, totalCount, totalPrice } = storeToRefs(useCartStore());
const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
</script>

<template>
  <div class="bg-rose-500 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
    <div class="container bg-slate-100 rounded-2xl p-4 lg:p-6 shadow-lg">
      <InnerHeader title="Shopping Cart" />
      <div class="flex flex-col gap-3" v-if="totalCount">
        <div class="flex gap-4 p-2 items-center" v-for="product in cart">
          <img
            :src="product.image ? product.image : '/images/images.jpeg'" 
            :alt="product.name"
            class="rounded-lg h-12 w-12 object-cover"
          />
          <router-link :to="`/product/${product.slug}`" class="w-2/3">
            <h4 class="text-rose-500 text-lg">
              {{ product.name }}
            </h4>
          </router-link>
          <div class="flex gap-1 flex-grow justify-end">
            <button
              class="bg-slate-500 text-white rounded w-6 h-6"
              @click="decreaseQuantity(product.slug)"
            >
              -
            </button>
            <div class="bg-slate-200 rounded w-6 h-6 text-center">
              {{ product.quantity }}
            </div>
            <button
              class="bg-slate-500 text-white rounded w-6 h-6"
              @click="increaseQuantity(product.slug)"
            >
              +
            </button>
          </div>
          <div class="w-28">${{ product.quantity * product.price }}</div>
          <div>
            <button
              class="text-slate-600"
              @click="removeFromCart(product.slug)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="my-3 text-right font-bold text-lg">
          Total Price:
          <span class="text-rose-500 text-2xl pl-2">${{ totalPrice }}</span>
        </div>
      </div>
      <div class="text-center p-6" v-else>The Cart is Empty</div>
    </div>
  </div>
</template>