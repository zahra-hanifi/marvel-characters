<script setup>
import { useAsyncData } from '#app'
import {getMarvelAuthParams, useRuntimeConfig} from '#imports'
const {ts, apikey, hash} = getMarvelAuthParams()

const config = useRuntimeConfig()
const route = useRoute()

const { data: characterData } = useAsyncData('characterData', async () => {
    const response = await $fetch(`${config.public.baseURL}/characters/${route.params.id}`, {
        params: {
            ts,
            apikey,
            hash,
        }
    })
    return response.data.results[0]
})

const { data: comicsData } = useAsyncData('comicsData', async () => {
    const response = await $fetch(`${config.public.baseURL}/characters/${route.params.id}/comics`, {
        params: {
            ts,
            apikey,
            hash,
        }
    })
    return response.data.results
})

const { data: seriesData } = useAsyncData('seriesData', async () => {
    const response = await $fetch(`${config.public.baseURL}/characters/${route.params.id}/series`, {
        params: {
            ts,
            apikey,
            hash,
        }
    })
    return response.data.results
})
</script>

<template>
    <div class="bg-[#2c2e30] min-h-[calc(100vh-72px)]">
        <div class="linear-bg">
            <div v-if="characterData" class="p-3 max-w-[1200px] mx-auto">
                <div class="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
                    <nuxt-img
                        :src="`${characterData.thumbnail.path.replace('http', 'https')}.${characterData.thumbnail.extension}`"
                        class="rounded-lg h-[180px] w-[180px] sm:h-[240px] sm:w-[240px]"
                    />

                    <div class="flex flex-col gap-y-8 text-white">
                        <span class="text-4xl">{{ characterData.name }}</span>

                        <p class="text-base">{{ characterData.description }}</p>

                        <div class="flex gap-x-4">
                            <nuxt-link
                                v-for="(link, index) in characterData.urls"
                                :key="index"
                                :to="link.url"
                                target="_blank"
                                class="border border-white rounded px-4 py-2 text-base"
                            >
                                {{ link.type }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="comicsData || seriesData"
            class="p-3 max-w-[1200px] mx-auto flex flex-col gap-y-8 text-white text-2xl"
        >
            <div class="flex flex-col gap-y-4">
                <span class="font-medium">Comics</span>

                <Cards :items="comicsData" :is-cards-link="false" />
            </div>

            <div class="flex flex-col gap-y-4">
                <span class="font-medium">Series</span>

                <Cards :items="seriesData" :is-cards-link="false" />
            </div>
        </div>
    </div>
</template>
