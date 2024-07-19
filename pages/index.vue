<script setup>
import {getMarvelAuthParams} from '~/utils/marvel'
import {ref, onBeforeMount, watch} from 'vue'
import Skeleton from "~/components/Skeleton.vue";
import { useRuntimeConfig } from '#imports'

const page = ref(1)
const itemsPerPage = ref(12)
const {ts, apikey, hash} = getMarvelAuthParams()
const characters = ref(null)
const loading = ref(false)
const config = useRuntimeConfig()

async function fetchData() {
    loading.value = true

    try {
        const response = await $fetch(`${config.public.baseURL}/characters`, {
            params: {
                ts,
                apikey,
                hash,
                offset: (page.value - 1) * itemsPerPage.value,
                limit: itemsPerPage.value,
            }
        })
        loading.value = false
        return response.data
    } catch (error) {
        loading.value = false
        return null
    }
}

onBeforeMount(async () => {
    const data = await fetchData()
    if (data) {
        characters.value = data
    } else {
        console.error('No data found or incorrect data format:', data)
    }
})

watch(page, async () => {
    characters.value = await fetchData()
})
</script>

<template>
    <div class="bg-[#2c2e30] min-h-screen pb-10">
        <Search />

        <div class="max-w-[1200px] mx-auto py-8 px-3">
            <div v-if="loading || !characters?.results.length" class="flex flex-wrap">
                <Skeleton/>
            </div>

            <template v-else>
                <Cards :items="characters.results"/>

                <Pagination
                    v-model="page"
                    :total="characters.total"
                    :items-per-page="itemsPerPage"
                />
            </template>
        </div>
    </div>
</template>
