import API from '../main'

const CATEGORIES_FRAGMENT = `
  fragment condition on ConditionNode {
    source
    target
    condition
    value
  }

  fragment helperText on HelperTextNode {
    id
    text
  }

  fragment properties on PropertiesNode {
    currency
    classes
    conditions {
      ...condition
    }
    dictionaryName
    helperText {
      ...helperText
    }
    detailedHelperText {
      ...helperText
    }
  }

  fragment question on QuestionsNode {
    code
    order
    component
    title
    booleanTitle
    ratingTitle
    textAreaTitle
    properties {
      ...properties
    }
    booleanProperties {
      ...properties
    }
    ratingProperties {
      ...properties
    }
    textAreaProperties {
      ...properties
    }
  }

  fragment initialAssessmentSection on InitialAssessmentSummarySectionNode {
    code
    title
    questions {
      ...question
      questions {
        ...question
      }
    }
  }

  fragment warrantySection on WarrantySectionsNode {
    code
    order
    title
    titleDetailed
    questions {
      ...question
      questions {
        ...question
      }
    }
  }

  fragment chapter on ChaptersNode {
    code
    order
    title
    menuTitle
    initialAssessmentSection {
      ...initialAssessmentSection
    }
    summarySection {
      ...initialAssessmentSection
    }
    warrantySections {
      ...warrantySection
      subSections {
        ...warrantySection
      }
    }
  }

  fragment categories on CategoriesNode {
    code
    order
    title
    chapters {
      ...chapter
    }
  }
`

/**
 * DigitalForm API Module
 */
class DigitalForm extends API {
  constructor() {
    super()
  }

  async getFormDefinition(is_3df_form = true) {
    const { data = null } = await this.query(
      `
      ${CATEGORIES_FRAGMENT}
      query($is_3df_form: Boolean!) {
        digitalFormDefinition {
          edges {
            node {
              id
              isActive
              categories(is3dfForm: $is_3df_form) {
                ...categories
              }
            }
          }
        }
      }
    `,
      { is_3df_form }
    )

    return data?.digitalFormDefinition.edges?.[0]?.node
  }

  async getTargetRiskLevel() {}
}

export default new DigitalForm()
