import { GraphQLClient } from '@/core/api'
import VueApollo from 'vue-apollo'

export const VueApolloPlugin = VueApollo

export default new VueApollo({
  defaultClient: GraphQLClient
})
