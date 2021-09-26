import API from '../main'
import { TENANT_ID } from '@/core/config/'

/**
 * Auth API Module
 */
class Auth extends API {
  constructor() {
    super()
  }

  /**
   * Request a JWT credentials
   * @param {String} username
   * @param {String} password
   * @returns {Object}
   */
  async token(username, password) {
    const tenant = TENANT_ID
    const { data = null } = await this.mutate(
      `
      mutation TokenAuth($username: String!, $password: String!, $tenant: UUID!) {
        tokenAuth(input: { username: $username, password: $password, tenant: $tenant }) {
          token
          refreshToken
          payload
          refreshExpiresIn
        }
      }
    `,
      { username, password, tenant }
    )

    return data
  }
  async tokenRest(username, password) {
    const tenant = TENANT_ID
    const { data = null } = await this.requestRest.post('/spa/token/', { username, password, tenant })

    return data
  }

  /**
   * Sign up
   * @param {Object} params
   * @returns {Object}
   */

  async signUp(params) {
    const reqParams = {
      tenant: TENANT_ID,
      ...params
    }

    const { data = null } = await this.mutate(
      `
      mutation SignUp(
        $tenant: String!,
        $email: String!,
        $password: String!,
        $fullName: String!,
        $companyName: String!
      ) {
        signUp(
          input: {
            tenant: $tenant,
            email: $email,
            password: $password,
            fullName: $fullName,
            companyName: $companyName
          }) {
          clientMutationId
          fullName
          email
          errors {
            field
            messages
          }
        }
      }`,
      reqParams
    )

    return data
  }

  /**
   * Send email to confirm
   * @param {String} params
   * @returns {Object}
   */

  async confirmEmail(params) {
    const { data = null } = await this.mutate(
      `
      mutation ConfirmEmail(
        $id: String!,
        $activateToken: String!
      ) {
        confirmEmail(
          input: {
            id: $id,
            activateToken: $activateToken
          }) {
            id
            email
          }
        }
    `,
      params
    )

    return data
  }

  /**
   * Refresh a JWT credentials
   * @param {String} refresh JWT Refresh  Token
   * @returns {Object}
   */
  async refreshTokens(refreshToken) {
    const { data = null } = await this.mutate(
      `
      mutation refreshToken($refreshToken: String!) {
        refreshToken(input: { refreshToken: $refreshToken }) {
          token
          refreshToken
          payload
          refreshExpiresIn
        }
      }
    `,
      { refreshToken }
    )

    return data
  }

  async refreshTokensRestful(refresh) {
    const { data = null } = await this.requestRest.post('/spa/token/refresh/', { refresh })
    return data
  }

  /**
   * Verify if JWT credentials are valid
   * @param {String} token JWT Access Token
   * @returns {Object}
   */
  async verifyToken(token) {
    const { data = null } = await this.mutate(
      `
      mutation verifyToken($token: String!) {
        verifyToken(input: { token: $token }) {
          payload
        }
      }
    `,
      { token }
    )

    return data
  }
  async verifyTokenRestful(token) {
    const { data = null } = await this.request.post('/token/verify/', { token })

    return data
  }

  /**
   * Reset password
   * @param {String} params
   * @returns {Object}
   */
  async resetPassword(params) {
    const reqParams = {
      tenant: TENANT_ID,
      email: params
    }
    const { data = null } = await this.mutate(
      `
      mutation ResetPassword(
        $tenant: String!,
        $email: String!
      ) {
        passwordReset(
          input: {tenant: $tenant, email: $email}) {
          tenant
          email
          errors {
            field
          }
        }
      }`,
      reqParams
    )

    return data
  }
  /**
   * Send new password
   * @param {String} params
   * @returns {Object}
   */
  async changePassword(params) {
    const { data = null } = await this.mutate(
      `mutation ChangePassword(
        $id: String!,
        $password: String!,
        $token: String!
      ) {
        passwordChange(
          input: {
            id: $id,
            password: $password,
            resetToken: $token
          }) {
          id
          errors {
            field
            messages
          }
        }
      }`,
      params
    )

    return data
  }
}

export default new Auth()
