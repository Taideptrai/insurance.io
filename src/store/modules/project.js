import { Dictionary, ProjectApi } from '@/core/api'

import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    project: {
      data: null,
      loading: false
    },
    isDDDF: true,
    definition: {
      loading: false,
      data: []
    },
    advisors: [],
    country: [],
    advisorTypes: [],
    list: {
      data: [],
      loading: false
    },
    packState: [],
    projectState: []
  },
  getters: {
    packState({ packState }) {
      return packState
    },
    projectState({ projectState }) {
      return projectState
    },
    country({ country }) {
      return country
    },
    advisors({ advisors }) {
      return advisors
    },
    advisorTypes({ advisorTypes }) {
      return advisorTypes
    },
    project({ project }) {
      return project
    },
    quotepackStage({ project }) {
      return project?.data.quotepackStage || null
    },
    definition({ definition }) {
      return definition
    },
    listProject({ list }) {
      return list
    },
    isDDDF({ isDDDF }) {
      return isDDDF
    },
    digitalform3df({ project }) {
      return project?.data.quotepackStage?.digitalform3df || null
    },
    digitalform2df({ project }) {
      return project?.data.quotepackStage?.digitalform2df || null
    }
  },
  actions: {
    getListProject({ commit }, { name = '', sort = '', status = [] }) {
      commit('onLoadListProject')
      const orderBy = [sort]
      ProjectApi.searchByName(name, status, orderBy)
        .then(({ data }) => {
          const rawData = data.allProjects?.edges || []
          const list = rawData.map(d => d.node)
          commit('onLoadListProjectSuccess', list)
        })
        .catch(_ => {
          commit('onLoadListProjectFail')
        })
    },
    async getProjectDetail({ commit }, projectId) {
      commit('onLoadProject')
      ProjectApi.getDetail(projectId)
        .then(({ data, errors }) => {
          if (errors && errors.length > 0) {
            commit('onLoadProjectFail')
          } else {
            const { project } = data
            if (project && project.id === projectId) {
              commit('onLoadProjectSuccess', project)
            } else {
              commit('onLoadProjectFail')
            }
          }
        })
        .catch(_ => {
          commit('onLoadProjectFail')
        })
    },
    async updateDigitalFormInstance({ getters }, payload) {
      const objData = getters.isDDDF ? getters.digitalform3df : getters.digitalform2df
      const digitalFormInstance = objData?.digitalformInstance?.id
      const oldData = {
        id: getters.project.data.id,
        name: getters.project.data.name,
        buyerPaymentPercent: getters.project.data.buyerPaymentPercent,
        sellerPaymentPercent: getters.project.data.sellerPaymentPercent
      }
      const data = await ProjectApi.updateDigitalFormInstance(
        payload.digitalFormId,
        digitalFormInstance,
        payload.chapterData,
        oldData
      )
      return data
    },
    async updateGeneralQuestion({ getters }, payload) {
      const oldData = {
        id: getters.project.data.id,
        name: getters.project.data.name,
        buyerPaymentPercent: getters.projectState.buyerPaymentPercent,
        sellerPaymentPercent: getters.projectState.sellerPaymentPercent
      }
      const data = await ProjectApi.updateGeneralQuestion(payload.chapterData, oldData)
      return data
    },
    async updateGeneralDueDiligence({ getters }, payload) {
      const oldData = {
        id: getters.project.data.id,
        name: getters.project.data.name,
        buyerPaymentPercent: getters.projectState.buyerPaymentPercent,
        sellerPaymentPercent: getters.projectState.sellerPaymentPercent
      }
      const data = await ProjectApi.updateGeneralDueDiligence(payload.chapterData, oldData)
      return data
    },
    async updateGeneralDisclosure({ getters }, payload) {
      const oldData = {
        id: getters.project.data.id,
        name: getters.project.data.name,
        buyerPaymentPercent: getters.projectState.buyerPaymentPercent,
        sellerPaymentPercent: getters.projectState.sellerPaymentPercent
      }
      const data = await ProjectApi.updateGeneralDisclosure(payload.chapterData, oldData)
      return data
    },
    loadAdvisorInfos({ commit }) {
      commit('onLoadDefinition')
      ProjectApi.getDefinition()
        .then(({ data }) => {
          if (data) {
            const categories = data.digitalFormDefinition?.edges[0]?.node?.categories || []
            const definitions = categories.reduce((accumulator, currentValue) => {
              return accumulator.concat({
                code: currentValue.code,
                order: currentValue.order,
                title: currentValue.title,
                children: _.orderBy(
                  currentValue.chapters.map(c => ({
                    ...c,
                    code: `${currentValue.code}.${c.code}`
                  })),
                  'order',
                  'asc'
                )
              })
            }, [])
            commit('onLoadDefinitionSuccess', _.orderBy(definitions, 'order', 'asc'))
          } else {
            commit('onLoadDefinitionFail')
          }
        })
        .catch(_ => {
          commit('onLoadDefinitionFail')
        })
      Dictionary.dictionarySearch({
        dictionary: 'PartnerAdvisor',
        extraFields: ['contact_person_first_name', 'website']
      })
        .then(({ PartnerAdvisor }) => {
          const data = PartnerAdvisor.edges.reduce((acc, cur) => {
            return acc.concat({
              code: cur.node.code,
              label: cur.node.label,
              firstName: cur.node.extraFields?.contact_person_first_name || '',
              website: cur.node.extraFields?.website || ''
            })
          }, [])
          commit('setPartnerAdvisor', data)
        })
        .catch(_ => {
          commit('setPartnerAdvisor', [])
        })
      Dictionary.dictionarySearch({
        dictionary: 'PartnerAdvisorType'
      })
        .then(({ PartnerAdvisorType }) => {
          const data = PartnerAdvisorType.edges.reduce((acc, cur) => {
            return acc.concat({
              code: cur.node.code,
              label: cur.node.label
            })
          }, [])
          commit('setPartnerAdvisorType', data)
        })
        .catch(_ => {
          commit('setPartnerAdvisorType', [])
        })
      Dictionary.dictionarySearch({
        dictionary: 'Country'
      })
        .then(({ Country }) => {
          const data = Country.edges.reduce((acc, cur) => {
            return acc.concat({
              code: cur.node.code,
              label: cur.node.label
            })
          }, [])
          commit('setCountry', data)
        })
        .catch(_ => {
          commit('setCountry', [])
        })
    },
    loadSearchProject({ commit }) {
      Dictionary.dictionarySearch({
        dictionary: 'PackState'
      })
        .then(({ PackState }) => {
          const data = PackState.edges.reduce((acc, cur) => {
            return acc.concat({
              code: cur.node.code,
              label: cur.node.label
            })
          }, [])
          commit('setPackState', data)
        })
        .catch(_ => {
          commit('setPackState', [])
        })
      Dictionary.dictionarySearch({
        dictionary: 'ProjectState'
      })
        .then(({ ProjectState }) => {
          const data = ProjectState.edges.reduce((acc, cur) => {
            return acc.concat({
              code: cur.node.code,
              label: cur.node.label
            })
          }, [])
          commit('setProjectState', data)
        })
        .catch(_ => {
          commit('setProjectState', [])
        })
    }
  },
  mutations: {
    onLoadProject(state) {
      state.project = {
        data: null,
        loading: true
      }
    },
    onLoadProjectSuccess(state, data) {
      state.project = {
        data,
        loading: false
      }
    },
    onLoadProjectFail(state) {
      state.project = {
        data: null,
        loading: false
      }
    },
    setProjectState(state, data) {
      state.projectState = data
    },
    setPackState(state, data) {
      state.packState = data
    },
    setCountry(state, data) {
      state.country = data
    },
    setPartnerAdvisorType(state, data) {
      state.advisorTypes = data
    },
    setPartnerAdvisor(state, data) {
      state.advisors = data
    },
    onLoadListProject(state) {
      state.list = {
        ...state.list,
        loading: true
      }
    },
    onLoadListProjectSuccess(state, data) {
      state.list = {
        data,
        loading: false
      }
    },
    onLoadListProjectFail(state) {
      state.list = {
        data: [],
        loading: false
      }
    },
    setProjectQuotepackStage(state, stage) {
      state.quotepackStage = stage
    },
    onLoadDefinition(state) {
      state.definition = {
        ...state.definition,
        loading: true
      }
    },
    onLoadDefinitionSuccess(state, data = []) {
      state.definition = {
        data,
        loading: false
      }
    },
    onLoadDefinitionFail(state) {
      state.definition = {
        ...state.definition,
        loading: false
      }
    }
  }
}
