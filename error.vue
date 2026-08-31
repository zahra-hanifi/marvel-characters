<script setup>
import { computed } from 'vue'

const props = defineProps({
    error: Object
})

// Only surface the upstream message for 404s (e.g. "Character not found").
// Anything else gets a generic line so server internals are not shown.
const message = computed(() => {
    if (props.error?.statusCode !== 404) {
        return 'Something went wrong. Please try again.'
    }

    // Nuxt's built-in 404 message is "Page Not Found: /whatever-was-requested".
    // Only show a message we set ourselves, so the raw URL is never echoed back.
    const statusMessage = props.error.statusMessage
    return statusMessage && !statusMessage.includes('/')
        ? statusMessage
        : "We couldn't find that page."
})

// clearError resets the error state before navigating back to the list.
const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="bg-[#2c2e30] min-h-[calc(100vh-72px)] flex flex-col items-center justify-center gap-y-6 p-3 text-center">
      <span class="text-7xl font-medium text-[#DC2626]">
          {{ error?.statusCode || 500 }}
      </span>

      <p class="text-2xl text-white">{{ message }}</p>

      <button
        class="bg-[#DC2626] rounded px-4 py-2 text-white text-sm font-medium"
        @click="goHome"
      >
          Back to characters
      </button>
    </div>
  </NuxtLayout>
</template>
