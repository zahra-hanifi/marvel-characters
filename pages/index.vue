<script setup>
import { useAsyncData } from '#app'
import { getMarvelAuthParams } from '~/utils/marvel'
import {ref, watch } from 'vue'
import Skeleton from "~/components/Skeleton.vue";

const page = ref(1)
const itemsPerPage = ref(12)
const { ts, apikey, hash } = getMarvelAuthParams()

const { data: characters, pending: loading, refresh } = useAsyncData(async () => {
    const response = await useFetch('https://gateway.marvel.com/v1/public/characters', {
        params: {
            ts,
            apikey,
            hash,
            offset: (page.value - 1) * itemsPerPage.value,
            limit: itemsPerPage.value,
        }
    })
    return response.data
}, {
    watch: [page]
})

watch(page, async () => {
    await refresh()
})
</script>

<template>
  <div class="bg-[#2c2e30] min-h-screen pb-10">
    <Search />

    <div class="max-w-[1200px] mx-auto py-8 px-3">
        <div v-if="loading" class="flex flex-wrap">
            <Skeleton />
        </div>

        <template v-else>
          <Cards :data="characters?.value.data.results" />

          <Pagination
            v-model="page"
            :total="characters?.value.data.total"
            :items-per-page="itemsPerPage"
          />
        </template>
    </div>
  </div>
</template>
