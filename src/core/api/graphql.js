import { API_HOST, SECURE_HOST } from '@/core/config'
import { ApolloLink, fromPromise } from 'apollo-boost'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'unfetch'
import { onError } from 'apollo-link-error'
import router from '@/router'
// import { retrieveFromCookieStore } from '@/core/helpers/storage'
import { setContext } from 'apollo-link-context'
import store from '@/store'

const apiProtocol = SECURE_HOST ? 'https' : 'http'
const apiDomain = `${apiProtocol}://${API_HOST}/graphql/`

// Cache implementation
const cache = new InMemoryCache()

// default GraphQL Link
const httpLink = createHttpLink({
  uri: apiDomain,
  credentials: 'same-origin',
  fetch
})

// Auth JWT Link
const authLink = setContext(async (_, { headers }) => {
  const token = (await store.getters['auth/accessToken']) || ''

  return {
    headers: {
      ...headers,
      authorization: (token && `Bearer ${token}`) || undefined
    }
  }
})

// Error handling Link
const errorLink = onError(({ forward, graphQLErrors, operation }) => {
  if (!graphQLErrors) {
    return
  }
  //TODO: implement better error handling
  for (let err of graphQLErrors) {
    // Guessing how GraphQL will return errors (API is not fully functional yet)
    const { code = '' } = err?.extensions || {}
    switch (code) {
      case 'UNAUTHENTICATED':
        store.dispatch('auth/refreshTokensRestful', true)
        return fromPromise(
          store.dispatch('auth/refreshTokens', true).catch(_error => {
            // TODO: error handling
            router.push({ name: 'auth.logout' })
          })
        ).flatMap(() => {
          const token = store.getters['auth/accessToken'] || ''
          const { headers } = operation.getContext()

          // modify the operation context with a new token
          operation.setContext({
            headers: {
              ...headers,
              authorization: (token && `Bearer ${token}`) || undefined
            }
          })

          // retry the request, returning the new observable
          return forward(operation)
        })
    }
  }
})

// link object, containing necessary graphql links
const link = ApolloLink.from([errorLink, authLink, httpLink])

// Create the apollo client
export default new ApolloClient({
  link,
  cache,
  defaultOptions: {
    mutate: {
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})
