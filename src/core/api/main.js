import axios from 'axios'
import client from './graphql'
import { getAPIHost } from '@/core/helpers/env'
import gql from 'graphql-tag'
import interceptors from './interceptorsRestful'
import { objToParams } from '@/core/helpers/url'

export default class API {
  constructor() {
    this.requestRest = axios.create({
      baseURL: getAPIHost(),
      paramsSerializer: params => objToParams(params)
    })

    interceptors?.request?.forEach(i => this.requestRest.interceptors.request.use(...i))
    interceptors?.response?.forEach(i => this.requestRest.interceptors.response.use(...i))
    this.request = client
  }
  async query(query, variables, fetchPolicy) {
    return await this.request.query({
      query: gql`
        ${query}
      `,
      variables,
      fetchPolicy
    })
  }

  async mutate(mutation, variables, fetchPolicy) {
    return await this.request.mutate({
      mutation: gql`
        ${mutation}
      `,
      variables,
      fetchPolicy
    })
  }
}
