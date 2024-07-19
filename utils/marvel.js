import md5 from 'md5'
import { useRuntimeConfig } from '#imports'

export const getMarvelAuthParams = () => {
    const config = useRuntimeConfig()
    const ts = new Date().getTime()
    const privateKey = String(config.marvelPrivateKey)
    const publicKey = String(config.public.marvelPublicKey)
    const hash = md5(`${ts}${privateKey}${publicKey}`)

    return {
        ts,
        apikey: config.public.marvelPublicKey,
        hash
    }
}
