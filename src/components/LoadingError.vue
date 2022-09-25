<script setup>
defineProps(["loading", "error"]);
</script>

<template>
  <div>
    <div class="p-4 text-center" v-if="loading">Loading Products...</div>
    <div class="p-4 bg-red-300 rounded-lg text-center" v-if="error">
      {{ error.message }}
    </div>
  </div>
</template>