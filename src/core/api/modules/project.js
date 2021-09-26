import API from '../main'
import { decodeId } from '@/core/helpers/id'
import gql from 'graphql-tag'

/**
 * Project API Module
 */
class Project extends API {
  constructor() {
    super()
  }

  /**
   * @param  {Object} input
   */
  async create(input) {
    const data = await this.mutate(
      `
        mutation CreateMAProject($input: ProjectCreateMutationInput!) {
          createMAProject(input: $input) {
            clientMutationId
            id
            name
            summary
            status
            buyer {
                id
                user {
                    id
                }
            }
            seller {
                id
                user {
                    id
                }
            }
            buyerPrincipalAdvisor {
                id
                user {
                    id
                }
            }
            sellerPrincipalAdvisor {
                id
                user {
                    id
                }
            }
            errors {
                field
                messages
            }
          }
        }
      `,
      { input }
    )
    return data
  }

  async getDefinition(is_3df_form = true) {
    const data = await this.query(
      `
      query($is_3df_form: Boolean!) {
        digitalFormDefinition {
          edges {
            node {
              categories(is3dfForm: $is_3df_form) {
                code
                order
                title
                chapters {
                  code
                  order
                  title
                }
              }
            }
          }
        }
      }
      `,
      { is_3df_form }
    )
    return data
  }

  async getDetail(projectId) {
    const data = await this.query(
      `
      query GetProject($projectId: ID!) {
        project(id: $projectId) {
            id
            name
            summary
            creatorRole {
              code
            }
            buyerPaymentPercent
            sellerPaymentPercent
            status {
                code
            }
            policyType {
                code
                label
            }
            buyer {
                id
                firstName
                lastName
                companyName
                role {
                    code
                }
                email
                partnerAdvisorType {
                    code
                }
                partnerAdvisor {
                    code
                }
                user {
                    id
                }
            }
            seller{
                id
                firstName
                lastName
                companyName
                role {
                    code
                }
                email
                partnerAdvisorType {
                    code
                }
                partnerAdvisor {
                    code
                }
                user {
                    id
                }
            }
            buyerPrincipalAdvisor{
                id
                firstName
                lastName
                companyName
                role {
                    code
                }
                email
                partnerAdvisorType {
                    code
                }
                partnerAdvisor {
                    code
                }
                user {
                    id
                }
            }
            sellerPrincipalAdvisor{
                id
                firstName
                lastName
                companyName
                role {
                    code
                }
                email
                partnerAdvisorType {
                    code
                }
                partnerAdvisor {
                    code
                }
                user {
                    id
                }
            }
            buyerSecondaryAdvisors{
                edges {
                    node {
                        id
                        firstName
                        lastName
                        companyName
                        role {
                            code
                        }
                        email
                        allowViewAccess
                        sectionsGranted
                        allSectionsGranted                    
                        partnerAdvisorType {
                            code
                        }
                        partnerAdvisor {
                            code
                        }
                        user {
                            id
                        }
    
                    }
                }
            }
            sellerSecondaryAdvisors{
                edges {
                    node {
                        id
                        firstName
                        lastName
                        companyName
                        role {
                            code
                        }
                        email
                        allowViewAccess
                        sectionsGranted
                        allSectionsGranted                    
                        partnerAdvisorType {
                            code
                        }
                        partnerAdvisor {
                            code
                        }
                        user {
                            id
                        }
    
                    }
                }
            }
            holdHarmlessLetters {
                edges {
                    node {
                        id
                        file
                        name
                        size
                    }
                }
            }
            customNda {
                id
                file
                name
                size
            }
            quotepackStage {
              id
              status {
                code
                label
                id
              }
              digitalform3df {
                id
                digitalformInstance {
                  id
                  numOfQuestions
                  numOfQuestionsCompleted
                  answers
                  percentageCompleted
                  percentagePending
                }
              }
              digitalform2df {
                id
                digitalformInstance {
                  id
                  numOfQuestions
                  numOfQuestionsCompleted
                  answers
                  percentageCompleted
                  percentagePending
                }
              }
            }
        }
        _debug {
            sql {
                rawSql
            }
        }
      }
      `,
      { projectId },
      'no-cache'
    )
    const { project } = data.data
    if (project?.id) {
      project.buyerSecondaryAdvisors.edges.reverse()
      project.sellerSecondaryAdvisors.edges.reverse()
      return {
        ...data,
        data: {
          ...data.data,
          project
        }
      }
    }
    return data
  }

  async uploadHoldHamless(id, files = []) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    const data = await this.requestRest.post(`/project/${id}/hold-harmless-letter/`, formData)
    return data
  }

  async uploadNDA(id, file) {
    const formData = new FormData()
    formData.append('file', file)
    const data = await this.requestRest.post(`/project/${id}/nda/`, formData)
    return data
  }

  async update(input) {
    const data = await this.mutate(
      `
      mutation UpdateMAProject($input: ProjectUpdateMutationInput!) {
        updateMAProject(input: $input) {
          clientMutationId
          id
          name
          summary
        }
      }      
      `,
      { input }
    )
    return data
  }

  async addNewBuyerSecondary(input) {
    const data = await this.mutate(
      `
      mutation createBuyerSecondaryAdvisor($input: BuyerSecondaryAdvisorCreateMutationInput!) {
        createBuyerSecondaryAdvisor(input: $input) {
          clientMutationId
          id
          status
          firstName
          lastName
          email
          companyName
          role
          partnerAdvisorType
          partnerAdvisor
          createdAt
          updatedAt
          allSectionsGranted
          sectionsGranted
          allowViewAccess
          project
          user {
              id
          }
          errors {
              field
              messages
          }
        }
      }
      `,
      { input }
    )
    return data
  }

  async updateBuyerSecondary(input) {
    const data = await this.mutate(
      `
      mutation updateBuyerSecondaryAdvisor($input: BuyerSecondaryAdvisorUpdateMutationInput!) {
        updateBuyerSecondaryAdvisor(input: $input) {
          clientMutationId
          id
          status
          firstName
          lastName
          email
          companyName
          role
          partnerAdvisorType
          partnerAdvisor
          createdAt
          updatedAt
          allSectionsGranted
          sectionsGranted
          allowViewAccess
          project
          user {
              id
          }
          errors {
              field
              messages
          }
        }
      }
      `,
      { input }
    )
    return data
  }

  async deleteBuyerSecondary(advisor_id) {
    const data = await this.mutate(
      `
      mutation DeleteBuyerSecondaryAdvisor($advisor_id: String!) {
        deleteBuyerSecondaryAdvisor(input: {clientMutationId: $advisor_id}) {
          deleted
          errors {
              field
              messages
          }
        }
      }
      `,
      { advisor_id }
    )
    return data
  }

  async addNewSellerSecondary(input) {
    const data = await this.mutate(
      `
      mutation createSellerSecondaryAdvisor($input: SellerSecondaryAdvisorCreateMutationInput!) {
        createSellerSecondaryAdvisor(input: $input) {
          clientMutationId
          id
          status
          firstName
          lastName
          email
          companyName
          role
          partnerAdvisorType
          partnerAdvisor
          createdAt
          updatedAt
          allSectionsGranted
          sectionsGranted
          allowViewAccess
          project
          user {
              id
          }
          errors {
              field
              messages
          }
        }
      }
      `,
      { input }
    )
    return data
  }

  async updateSellerSecondary(input) {
    const data = await this.mutate(
      `
      mutation updateSellerSecondaryAdvisor($input: SellerSecondaryAdvisorUpdateMutationInput!) {
        updateSellerSecondaryAdvisor(input: $input) {
          clientMutationId
          id
          status
          firstName
          lastName
          email
          companyName
          role
          partnerAdvisorType
          partnerAdvisor
          createdAt
          updatedAt
          allSectionsGranted
          sectionsGranted
          allowViewAccess
          project
          user {
              id
          }
          errors {
              field
              messages
          }
        }
      }      
      `,
      { input }
    )
    return data
  }

  async deleteSellerSecondary(advisor_id) {
    const data = await this.mutate(
      `
      mutation DeleteSellerSecondaryAdvisor($advisor_id: String!) {
        deleteSellerSecondaryAdvisor(input: {clientMutationId: $advisor_id}) {
          deleted
          errors {
              field
              messages
          }
        }
      }
      `,
      { advisor_id }
    )
    return data
  }

  async deleteHoldHamlessLetter(document_id) {
    const data = await this.mutate(
      `
      mutation DeleteHoldHarmlessLetter($document_id: String!) {
        deleteHoldHarmlessLetter(input: {clientMutationId: $document_id}) {
          deleted
          errors {
              field
              messages
          }
        }
      }
      `,
      { document_id }
    )
    return data
  }

  /**
   * @param  {String} name
   * @param  {Array String} orderBy
   */
  async searchByName(name, statusCode, orderBy) {
    const data = await this.query(
      `
      query ProjectsQuery($name: String!, $statusCode: [String]!, $orderBy: [String]!) {
        allProjects(name_Icontains: $name, status_Code_In: $statusCode, orderBy: $orderBy) {
            edges {
                node {
                    id
                    name
                    summary
                    updatedAt
                    status {
                      code
                    }
                    quotepackStage {
                      status {
                        code
                        label
                      }
                    }
                    creatorRole {
                        code
                        label
                    }
                }
            }
        }
        _debug {
            sql {
                duration
                rawSql
            }
        }
      }
      `,
      { name, statusCode, orderBy },
      'no-cache'
    )
    return data
  }

  /**
   *
   * @param {string} id Project ID
   */
  async getProjectById(id) {
    const { data } = await this.query(
      gql`
        query GetProject($projectId: ID!) {
          project(id: $projectId) {
            id
            name
            summary
            buyerPaymentPercent
            sellerPaymentPercent
            status {
              code
            }
            policyType {
              code
              label
            }
            buyer {
              id
              firstName
              lastName
              companyName
              role {
                code
              }
              email
              partnerAdvisorType {
                code
              }
              partnerAdvisor {
                code
              }
              user {
                id
              }
            }
            seller {
              id
              firstName
              lastName
              companyName
              role {
                code
              }
              email
              partnerAdvisorType {
                code
              }
              partnerAdvisor {
                code
              }
              user {
                id
              }
            }
            buyerPrincipalAdvisor {
              id
              firstName
              lastName
              companyName
              role {
                code
              }
              email
              partnerAdvisorType {
                code
              }
              partnerAdvisor {
                code
              }
              user {
                id
              }
            }
            sellerPrincipalAdvisor {
              id
              firstName
              lastName
              companyName
              role {
                code
              }
              email
              partnerAdvisorType {
                code
              }
              partnerAdvisor {
                code
              }
              user {
                id
              }
            }
            buyerSecondaryAdvisors {
              edges {
                node {
                  id
                  firstName
                  lastName
                  companyName
                  role {
                    code
                  }
                  email
                  allowViewAccess
                  sectionsGranted
                  allSectionsGranted
                  partnerAdvisorType {
                    code
                  }
                  partnerAdvisor {
                    code
                  }
                  user {
                    id
                  }
                }
              }
            }
            holdHarmlessLetters {
              edges {
                node {
                  id
                  file
                  name
                  size
                }
              }
            }
            customNda {
              id
              file
              name
              size
            }
            quotepackStage {
              id
              status {
                code
                label
                id
              }
              digitalform3df {
                id
                digitalformInstance {
                  id
                  numOfQuestions
                  numOfQuestionsCompleted
                  answers
                  percentageCompleted
                  percentagePending
                }
              }
              digitalform2df {
                id
                digitalformInstance {
                  id
                  numOfQuestions
                  numOfQuestionsCompleted
                  answers
                  percentageCompleted
                  percentagePending
                }
              }
            }
          }
        }
      `,
      { projectId: id }
    )
    return data
  }

  /**
   *
   * @param {string} projectId Project ID
   * @returns Project QoutepackStage
   */
  async getProjectQuotepackStage(projectId) {
    const { data } = await this.query(
      gql`
        query GetProject($projectId: ID!) {
          project(id: $projectId) {
            quotepackStage {
              status {
                label
              }
              digitalform3df {
                id
                digitalformInstance {
                  id
                  answers
                  percentageCompleted
                }
                generalQuestions {
                  sellerCompany {
                    registeredAddress
                    isInsured
                    fullname
                    registeredNumber
                    registeredAddress
                    registeredCity
                    registeredCountry {
                      countryCode
                      name
                      alpha3
                    }
                    registeredZipcode
                    sellRollover
                    isCounsel
                    isFinancialAdvisor
                  }
                  targetCompanies {
                    edges {
                      node {
                        fullname
                        registeredNumber
                        registeredAddress
                        registeredCity
                        registeredCountry {
                          countryCode
                          name
                          alpha3
                        }
                        registeredZipcode
                        sector {
                          code
                          label
                        }
                        hasOverseasSellingJurisdictions
                        overseasSellingJurisdictions {
                          edges {
                            node {
                              countryCode
                              name
                              alpha3
                            }
                            cursor
                          }
                        }
                        hasOverseasManufacturingJurisdictions
                        b2bSales
                        b2cSales
                      }
                    }
                  }
                  buyerCompany {
                    isInsured
                    fullname
                    registeredNumber
                    registeredAddress
                    registeredCity
                    registeredCountry {
                      countryCode
                      name
                      alpha3
                    }
                    registeredZipcode
                    isCounsel
                    isFinancialAdvisor
                  }
                  sellerSameAsTarget
                  percentageSharesAcquired
                  estimatedSigningDate
                  estimatedCompletionDate
                  transactionType {
                    code
                    label
                  }
                }
                generalDueDiligence {
                  rationaleRank1 {
                    code
                    label
                    id
                  }
                  rationaleRank2 {
                    code
                    label
                    id
                  }
                  rationaleRank3 {
                    code
                    label
                    id
                  }
                  rationaleRank4 {
                    code
                    label
                    id
                  }
                  rationaleRank5 {
                    code
                    label
                    id
                  }
                  rationaleRank6 {
                    code
                    label
                    id
                  }
                  rationaleRank7 {
                    code
                    label
                    id
                  }
                  buyerSectorExperienceRank {
                    rating
                    label
                    id
                  }
                  hasOperationsKeyRiskIssues
                  operationsKeyRiskIssues
                  buyerSimilarOperations
                  targetBusinessCommercialRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessOperationalRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessFinancialRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessTaxRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessLegalRisks {
                    rating
                    label
                    id
                  }
                  hasKeyRiskIssues
                  keyRiskIssues
                }
              }
              digitalform2df {
                id
                digitalformInstance {
                  id
                  answers
                  percentageCompleted
                }
                generalDisclosure {
                  rationaleRank1 {
                    code
                    label
                    id
                  }
                  rationaleRank2 {
                    code
                    label
                    id
                  }
                  rationaleRank3 {
                    code
                    label
                    id
                  }
                  rationaleRank4 {
                    code
                    label
                    id
                  }
                  rationaleRank5 {
                    code
                    label
                    id
                  }
                  rationaleRank6 {
                    code
                    label
                    id
                  }
                  rationaleRank7 {
                    code
                    label
                    id
                  }
                  targetBusinessCommercialRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessOperationalRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessFinancialRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessTaxRisks {
                    rating
                    label
                    id
                  }
                  targetBusinessLegalRisks {
                    rating
                    label
                    id
                  }
                  hasKeyRiskIssues
                  keyRiskIssues
                }
              }
            }
          }
        }
      `,
      { projectId },
      'no-cache'
    )
    return data.project
  }

  /**
   * @param  {String} email
   */
  async getUserByEmail(email) {
    const data = await this.query(
      `
      query GetUserByEmail($email: String!) {
        userByEmail(email: $email) {
            id
            firstName
            lastName
        }
      }
      `,
      { email }
    )
    return data
  }

  /**
   *
   * @param {string} digitalFormDefinition DigitalFormDefinition that the instance belongs to
   * @param {string} digitalformInstance DigitalformInstance unique ID
   * @param {string} answers The answers in JSON format
   */
  async updateDigitalFormInstance(digitalFormDefinition, digitalformInstance, answers, projectData) {
    const { data } = await this.mutate(
      gql`
        mutation updateDigitalFormInstance(
          $answers: String!
          $digitalformInstance: String!
          $digitalFormDefinition: String!
          $buyerPaymentPercent: Int!
          $sellerPaymentPercent: Int!
          $name: String!
          $id: String!
        ) {
          updateMAProject(
            input: {
              id: $id
              name: $name
              buyerPaymentPercent: $buyerPaymentPercent
              sellerPaymentPercent: $sellerPaymentPercent
              quotepackStage: {
                digitalform3df: {
                  digitalformInstance: {
                    id: $digitalformInstance
                    answers: $answers
                    digitalFormDefinition: $digitalFormDefinition
                  }
                }
              }
            }
          ) {
            errors {
              field
              messages
            }
          }
        }
      `,
      { ...projectData, digitalFormDefinition: decodeId(digitalFormDefinition), digitalformInstance, answers }
    )
    return data
  }

  /**
   *
   * @param {string} digitalFormDefinition DigitalFormDefinition that the instance belongs to
   * @param {string} digitalformInstance DigitalformInstance unique ID
   * @param {string} answers The answers in JSON format
   */
  async updateGeneralQuestion(input, projectData) {
    const { data } = await this.mutate(
      gql`
        mutation updateGeneralQuestion($input: GeneralQuestionsSerializerV1Input!, $name: String!, $id: String!) {
          updateMAProject(
            input: { id: $id, name: $name, quotepackStage: { digitalform3df: { generalQuestions: $input } } }
          ) {
            errors {
              field
              messages
            }
          }
        }
      `,
      { ...projectData, input }
    )
    return data
  }

  async updateGeneralDueDiligence(input, projectData) {
    const { data } = await this.mutate(
      gql`
        mutation updateGeneralDueDiligence(
          $input: GeneralDueDiligenceSerializerV1Input!
          $name: String!
          $id: String!
        ) {
          updateMAProject(
            input: { id: $id, name: $name, quotepackStage: { digitalform3df: { generalDueDiligence: $input } } }
          ) {
            errors {
              field
              messages
            }
          }
        }
      `,
      { ...projectData, input }
    )
    return data
  }

  async updateGeneralDisclosure(input, projectData) {
    const { data } = await this.mutate(
      gql`
        mutation updateGeneralDueDiligence(
          $input: GeneralDueDiligenceSerializerV1Input!
          $name: String!
          $id: String!
        ) {
          updateMAProject(
            input: { id: $id, name: $name, quotepackStage: { digitalform2df: { generalDisclosure: $input } } }
          ) {
            errors {
              field
              messages
            }
          }
        }
      `,
      { ...projectData, input }
    )
    return data
  }
  /**
   *
   * @param {string} projectId Project Id
   * @returns Who user are in project, with 2DF/3DF access
   */
  async whoAmI(projectId) {
    const { data } = await this.query(
      gql`
        fragment actor on ActorNode {
          id
          role {
            code
            label
          }
        }
        query WhoAmI($projectId: ID!) {
          whoAmI(projectId: $projectId) {
            buyer {
              ...actor
            }
            seller {
              ...actor
            }
            buyerPrincipalAdvisor {
              ...actor
            }
            sellerPrincipalAdvisor {
              ...actor
            }
            buyerSecondaryAdvisor {
              allowViewAccess
              allSectionsGranted
              sectionsGranted
            }
            sellerSecondaryAdvisor {
              allowViewAccess
              allSectionsGranted
              sectionsGranted
            }
          }
        }
      `,
      { projectId }
    )
    return data?.whoAmI
  }
}

export default new Project()
