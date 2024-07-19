<script setup>
const props = defineProps({
    items: Array,
    isCardsLink: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
  <div class="flex flex-wrap">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl border border-transparent hover:border-gray-500 transition-all"
      >
        <nuxt-link
          :to="isCardsLink ? `/${item.id}` : null"
          class="flex flex-col gap-y-4 items-center p-3 h-full"
        >
            <nuxt-img
              v-if="item.thumbnail"
              :src="`${item.thumbnail.path.replace('http', 'https')}.${item.thumbnail.extension}`"
              class="rounded-lg min-h-[330px] w-full"
            />

            <span class="text-base font-medium text-white">
                {{ item.name || item.title }}
            </span>
        </nuxt-link>
      </div>
  </div>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
