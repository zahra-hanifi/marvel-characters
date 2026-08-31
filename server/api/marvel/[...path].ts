import md5 from 'md5'

// Endpoints we are willing to proxy, e.g. "characters",
// "characters/1009368", "characters/1009368/comics".
const SAFE_PATH = /^[a-zA-Z0-9][a-zA-Z0-9/_-]*$/

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const path = getRouterParam(event, 'path')

    if (!path || !SAFE_PATH.test(path) || path.includes('..')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid Marvel API path'
        })
    }

    const privateKey = config.marvelPrivateKey
    const publicKey = config.public.marvelPublicKey

    if (!privateKey || !publicKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Marvel API credentials are not configured'
        })
    }

    // The hash is built from ts + privateKey + publicKey and must stay on the server.
    const ts = Date.now().toString()
    const hash = md5(`${ts}${privateKey}${publicKey}`)

    try {
        return await $fetch(`${config.public.baseURL}/${path}`, {
            // Client-supplied ts/apikey/hash are deliberately overridden.
            params: { ...getQuery(event), ts, apikey: publicKey, hash }
        })
    } catch (error) {
        throw createError({
            statusCode: error?.statusCode || error?.response?.status || 502,
            statusMessage: error?.statusMessage || 'Failed to reach the Marvel API'
        })
    }
})
