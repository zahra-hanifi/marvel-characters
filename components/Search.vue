<script setup>
const model = defineModel()
</script>

<template>
  <div class="py-4 px-3 linear-bg">
    <div class="p-3 bg-[#2C2E30] max-w-[1200px] mx-auto rounded-lg flex gap-x-2">
      <input
          v-model="model"
          class="bg-[#3B3D3F] flex-grow p-3 rounded text-white text-sm outline-none"
          placeholder="Search for characters..."
      />

      <button
        class="bg-[#DC2626] rounded px-4 text-white text-sm font-medium flex items-center gap-x-2"
        @click="$emit('search')"
      >
        <img src="/images/search.png" class="min-w-[14px] w-full" />

        <span class="hidden sm:block">Search</span>
      </button>
    </div>
  </div>
</template>

<style>
.linear-bg {
  background: linear-gradient(to right, #2C2E30, #0e0e0e);
}
</style>
