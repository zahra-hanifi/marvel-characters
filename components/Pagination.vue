<script setup>
import { computed } from 'vue'

const model = defineModel()

const props = defineProps({
    total: Number,
    itemsPerPage: Number
})

const lastPage = computed(() => {
    if (props.itemsPerPage.value <= 0) return 1
    return Math.ceil(props.total / props.itemsPerPage) || 1
})

const itemsToDisplay = computed(() => {
    const centerDisplayItems = []
    const currentPage = +model.value

    if (lastPage.value <= 7) {
        centerDisplayItems.push(
            ...Array.from({ length: lastPage.value - 1 }, (_, i) => i + 2)
        )
    } else if (currentPage > 4 && currentPage < lastPage.value - 3) {
        centerDisplayItems.push(
            ...[
                '',
                currentPage - 1,
                currentPage,
                currentPage + 1,
                '',
                lastPage.value,
            ]
        )
    } else if (currentPage > 4 && currentPage >= lastPage.value - 3) {
        centerDisplayItems.unshift('')
        centerDisplayItems.push(
            ...Array.from({ length: 5 }, (_, i) => lastPage.value - 4 + i) // end numbers
        )
    } else {
        centerDisplayItems.push(...Array.from({ length: 4 }, (_, i) => i + 2)) // start numbers
        centerDisplayItems.push('')
        centerDisplayItems.push(lastPage.value)
    }

    return [1, ...centerDisplayItems]
})

function selectPage(page) {
    model.value = page
}
</script>

<template>
  <div class="flex justify-center items-center gap-x-1 p-3">
      <button
        v-for="(item, index) in itemsToDisplay"
        :key="index"
        class="text-sm text-gray-500 rounded-full w-6 h-6 flex justify-center items-center pb-0.5"
        :class="{ '!text-white bg-red-500': item && model === item, 'cursor-default': !item, 'w-8 h-8': item > 99 }"
        @click="selectPage(item)"
      >
          {{ item || '...' }}
      </button>
  </div>
</template>
