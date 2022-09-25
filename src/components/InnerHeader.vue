<script setup>
import { ref } from 'vue';
import OverlayMenu from './OverlayMenu.vue';
import OverlayShadow from './OverlayShadow.vue';

import { useCartStore} from '../stores/cart';
import { storeToRefs } from "pinia";
import OverlayCart from "./OverlayCart.vue";
import { useRouter } from 'vue-router';

const { cart, totalCount, totalPrice } = storeToRefs(useCartStore());

defineProps({
    title: {
        type: String,
        default: "Rosekiwi Shop",
    }
});

const showMenu = ref(false);
const showCart = ref(false);

const router = useRouter();


const closeOverlay = () => {
    showCart.value = false;
    showMenu.value = false;
    setTimeout(() => router.push('/cart'), 400)
}

</script>

<template>
   <header class="flex gap-3 mb-6 justify-between">
    <router-link :to="$route.fullPath === '/shop' ? '/' : '/shop' " >
        <i class="fa fa-arrow-circle-left text-2xl text-center mb-4"></i>
    </router-link>
    <h3 class="text-xl font-bold text-slate-700">{{title}}</h3>
    <button 
        class="w-12 h-12 bg-slate-200 rounded-xl ml-auto hover:bg-slate-300"
        @click="showMenu = !showMenu">
        <i class="fa fa-bars"></i>
    </button>
     <button class="w-12 h-12 relative text-white rounded-xl bg-rose-500 hover:bg-rose-400 hover:text-slate-200"
      @click="showCart = !showCart">
        <i class="fa fa-cart-plus"></i>
        <span class="absolute w-5 h-5 bg-rose-100 shadow rounded-full -top-[2px] -right-[2px]
        flex items-center justify-center text-sm font-medium text-slate-900 leading-3 p-[2px]">
        {{ totalCount }}
        </span>
    </button>
    <Transition name="menu">
    <OverlayMenu v-if="showMenu" />
    </Transition>
    <Transition name="fade">
         <OverlayShadow v-if="showMenu || showCart" 
         @click="showMenu = false;
         showCart = false;" />
    </Transition>
    <Transition >
         <OverlayCart v-if="showCart" :cart="cart" :totalPrice="totalPrice" 
         @closeModal='closeOverlay' />
    </Transition>
   </header>
</template>

