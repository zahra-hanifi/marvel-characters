<script setup>
</script>

<template>
  <div class="flex flex-wrap">
    <div v-for="n in 5" :key="n" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl border border-transparent hover:border-gray-500 transition-all">
      <nuxt-link to="google.com" target="_blank" class="flex flex-col gap-y-4 items-center p-3">
        <div class="rounded-lg w-full min-h-[400px] bg-gray-600"></div>

        <span class="text-base font-medium text-white">Test</span>
      </nuxt-link>
    </div>
  </div>
</template>
