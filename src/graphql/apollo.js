import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client'

const uri = `${window.location.origin}/${'graphql'}`

const httpLink = new HttpLink({uri})

const cache = new InMemoryCache()

const link = ApolloLink.from([httpLink])

console.log(link);

const client = new ApolloClient({
  link,
  cache,
})

export default client
