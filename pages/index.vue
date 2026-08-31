<script setup>
import { fetchMarvel } from '~/utils/marvel'
import { ref } from 'vue'

const page = ref(1)
const itemsPerPage = ref(12)
const searchTerm = ref('')

// useAsyncData serialises the server-rendered result into the payload, so the
// client reuses it on hydration instead of fetching the same page a second
// time. `page` is watched so pagination refetches on its own; `searchTerm` is
// deliberately not watched, because search is submitted explicitly rather than
// firing on every keystroke.
const { data: characters, pending: loading, refresh } = await useAsyncData(
    'characters',
    async () => {
        const params = {
            offset: (page.value - 1) * itemsPerPage.value,
            limit: itemsPerPage.value,
        }
        if (searchTerm.value) {
            params.name = searchTerm.value
        }

        try {
            const response = await fetchMarvel('characters', params)
            return response.data
        } catch (error) {
            console.error('No data found or incorrect data format:', error)
            return null
        }
    },
    { watch: [page] }
)

async function search() {
    // An empty term is a valid search: it drops the `name` filter and restores
    // the full list. Either way reset to the first page, because Marvel applies
    // `offset` to the filtered result set and a stale offset can skip past the
    // only match. Changing `page` already refetches via `watch`, so return
    // early there to avoid fetching twice.
    if (page.value !== 1) {
        page.value = 1
        return
    }

    await refresh()
}
</script>

<template>
    <div class="bg-[#2c2e30] min-h-screen pb-10">
        <Search v-model="searchTerm" @search="search" />

        <div class="max-w-[1200px] mx-auto py-8 px-3">
            <div v-if="loading" class="flex flex-wrap">
                <Skeleton/>
            </div>

            <div v-else-if="!characters?.results.length" class="text-3xl text-center text-white flex flex-wrap justify-center">
                No information found
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
