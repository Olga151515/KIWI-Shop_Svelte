<script setup>
import Logo from '../components/Logo.vue'
</script>

<template>
  <div class="bg-slate-100 min-h-full flex ">
    <div class="basis-1/2 grid place-items-center">
         <Logo />
    </div>
    <div class="basis-1/2 bg-rose-600 grid place-items-center text-white">
        <div class="flex flex-col gap-2 items-center">
            <h1 class="text-2xl font-bold">Welcome to the RoseKiwi</h1>
            <p class="max-w-[350px] mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quis a maiores culpa exercitationem ad velit iure, rem quae repudiandae placeat dolorum consequuntur suscipit quibusdam sapiente, dolor labore et dignissimos.
            </p>  
    <router-link to="/shop" 
    class="text-white font-bold bg-rose-600 border-slate-100 
    border-opacity-50 text-xl mt-4 py-3 border-4 p-2 rounded hover:bg-rose-500"> 
      Let's go shopping
    </router-link>
    </div>
    </div>
  </div>
</template>
