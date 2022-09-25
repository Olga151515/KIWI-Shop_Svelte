<script setup>
defineProps(["cart", "totalPrice"]);
</script>

<template>
  <div
    class="bg-slate-100 shadow-xl flex flex-col gap-3 p-4 rounded-2xl fixed z-50 border-2 top-1/2 left-1/2 w-full lg:w-[500px] -translate-x-1/2 -translate-y-1/2"
  >
    <div v-if="cart.length">
      <div class="flex gap-2 p-2 items-center" v-for="product in cart">
        <img
          :src="product.image"
          :alt="product.name"
          class="rounded-lg h-12 w-12 object-cover"
        />
        <router-link :to="`/product/${product.slug}`">
          <h4 class="text-rose-500 text-lg mb-auto">
            {{ product.name }}
          </h4>
        </router-link>
        <span class="ml-auto">
          {{ product.quantity }}
          &times; ${{ product.price }}
        </span>
      </div>
      <div class="my-3 text-right font-bold text-lg">
        Total Price:
        <span class="text-rose-500 text-2xl pl-2">${{ totalPrice }}</span>
      </div>
      <button
        class="rounded-lg bg-rose-500 text-rose-50 p-4 mt-4 block text-center uppercase w-full"
        @click="$emit('closeModal')"
      >
        Full cart
      </button>
    </div>
    <div class="text-center p-6" v-else>The Cart is Empty</div>
  </div>
</template>