<script setup>
import { useAsyncData } from '#app'
import { fetchMarvel } from '~/utils/marvel'

// This is a catch-all route, so without this it matches every unmatched URL
// (/robots.txt, /favicon.png, ...) and fires three Marvel API calls for each.
definePageMeta({
    // Must return a boolean: returning an object makes vue-router treat it as a
    // redirect target, which loops and 500s. The 404 copy lives in error.vue.
    validate: (route) => /^\d+$/.test(route.params.id)
})

const route = useRoute()

// All three requests are started together so they still run in parallel; only
// the character one is awaited, since the page is meaningless without it.
const characterRequest = useAsyncData('characterData', async () => {
    const response = await fetchMarvel(`characters/${route.params.id}`)
    return response.data.results[0]
})

// Comics and series are supplementary: if either fails the character still
// renders, and the template hides the section rather than showing an empty one.
const { data: comicsData } = useAsyncData('comicsData', async () => {
    const response = await fetchMarvel(`characters/${route.params.id}/comics`)
    return response.data.results
})

const { data: seriesData } = useAsyncData('seriesData', async () => {
    const response = await fetchMarvel(`characters/${route.params.id}/series`)
    return response.data.results
})

const { data: characterData } = await characterRequest

// useAsyncData swallows the upstream error into `error`, leaving data null. An
// id Marvel doesn't know about must be a real 404, not a blank page with a 200.
if (!characterData.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Character not found',
        fatal: true
    })
}
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
            v-if="comicsData?.length || seriesData?.length"
            class="p-3 max-w-[1200px] mx-auto flex flex-col gap-y-8 text-white text-2xl"
        >
            <div v-if="comicsData?.length" class="flex flex-col gap-y-4">
                <span class="font-medium">Comics</span>

                <Cards :items="comicsData" :is-cards-link="false" />
            </div>

            <div v-if="seriesData?.length" class="flex flex-col gap-y-4">
                <span class="font-medium">Series</span>

                <Cards :items="seriesData" :is-cards-link="false" />
            </div>
        </div>
    </div>
</template>
