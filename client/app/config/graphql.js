import { ApolloClient, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
    uri: 'http://192.168.0.14:3001/',
    cache: new InMemoryCache()
})

export default client