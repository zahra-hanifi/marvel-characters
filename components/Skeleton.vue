<template>
    <div
      v-for="n in 12"
      :key="n"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[400px] p-3"
    >
        <div class="w-full h-full animate-pulse bg-gray-600 rounded-2xl"></div>
    </div>
</template>