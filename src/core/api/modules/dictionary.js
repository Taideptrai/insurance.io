import API from '../main'
import gql from 'graphql-tag'

const DICTIONARY_NODE = (extraFields = []) => `
  edges {
    node {
      code
      label
      ${extraFields.length > 0 ? 'extraFields(fieldNames: [' + extraFields.map(f => `"${f}"`).join(',') + '])' : ''}
    }
    cursor
  }`

/**
 * Dictionary API Module
 */
class Dictionary extends API {
  constructor() {
    super()
  }

  async getCommonDictionaries() {
    const { data = null } = await this.query(gql`
      {
        YesNoChoice: dictionarySearch(dictionary: "YesNoChoice", orderBy: ["-label"]) {
          ${DICTIONARY_NODE()}
        }
        DDDFComfortLevel: dictionarySearch(dictionary: "DDDFComfortLevel", orderBy: ["rating"]) {
          ${DICTIONARY_NODE()}
        }
        DDFComfortLevel: dictionarySearch(dictionary: "DDFComfortLevel", orderBy: ["rating"]) {
          ${DICTIONARY_NODE()}
        }
      }
    `)
    return data
  }

  /**
   *
   * @param {Object} options - Search options
   * @param {string} options.dictionary - The name of the dictionary to search for.
   * @param {string} [options.term] - The term to be used on the search, this is completely optional, if you want all the values, don't send the term.
   * @param {string[]} [options.orderBy] - Fields to order by, if you want to use descending order send a hyphen before the field name, example: ['-name'], with this the name will come with descending order.
   * @param {string} [options.termField] - If you want to use a different field for the term, send the name of the field here.
   * @param {string} [options.first]
   * @param {string} [options.after]
   * @param {Object[]} [options.extraFilters] - Extra filters to be used alongside the term, you can send any valid field here as a filter. You can use also modifiers like __icontains...
   * @param {string} options.extraFilters[].field
   * @param {string} options.extraFilters[].value
   * @param {string[]} [options.extraFields]
   */
  async dictionarySearch(options) {
    const { data = null } = await this.query(
      gql`
        query DictionarySearch(
          $dictionary: String!
          $term: String
          $orderBy: [String]
          $extraFiters: [ExtraFilter]
          $termField: String
          $offset: Int
          $after: String
          $first: Int
        ) {
         ${options.dictionary}: dictionarySearch(
            dictionary: $dictionary
            term: $term
            orderBy: $orderBy
            extraFilters: $extraFiters
            termField: $termField
            offset: $offset
            after: $after
            first: $first
          ) {
            ${DICTIONARY_NODE(options.extraFields || [])}
          }
        }
      `,
      options
    )
    return data
  }
}

export default new Dictionary()
