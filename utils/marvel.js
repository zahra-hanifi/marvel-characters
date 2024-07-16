import md5 from 'md5'
import { useRuntimeConfig } from '#imports'

export const getMarvelAuthParams = () => {
    const config = useRuntimeConfig()
    const ts = new Date().getTime()
    const privateKey = '35889c676475e28acbd4a026d3300fedad0251d5'
    const publicKey = 'ede2baaef14782f5e20ae1e45a7de95a'
    const hash = md5(`${ts}${privateKey}${publicKey}`)

    return {
        ts,
        apikey: publicKey,
        hash
    }
}
