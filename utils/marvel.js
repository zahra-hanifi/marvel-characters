// Calls our own server route, which signs the request with the private key.
// No Marvel credentials are referenced here, so nothing secret reaches the client.
export const fetchMarvel = (path, params) => {
    return $fetch(`/api/marvel/${path}`, { params })
}
