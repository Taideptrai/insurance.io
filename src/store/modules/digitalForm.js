import { DigitalForm, ProjectApi } from '@/core/api'
import { find, get, merge, pick } from 'lodash'
import { nestedSort, nullFilter } from '@/core/helpers/mixins'

import staticCategories from '@/mocks/categories.json'

export default {
  namespaced: true,
  state: {
    categories: [],
    curtCategory: null,
    curtChapter: null,
    steps: null,
    curtStep: 1,
    curtChapterData: {},
    projectFormData: {},
    projectId: null,
    digitalFormId: null,
    projectQuestion: {},
    projectQuestion2df: {}
  },
  getters: {
    curtCategory({ curtCategory }) {
      return curtCategory
    },
    curtChapter({ curtChapter }) {
      return curtChapter
    },
    steps({ steps }) {
      return steps
    },
    curtStep({ curtStep }) {
      return curtStep
    },
    curtChapterData({ curtChapterData }) {
      return curtChapterData
    },
    digitalFormId({ digitalFormId }) {
      return digitalFormId
    },
    projectFormData({ projectFormData }) {
      return projectFormData
    },
    projectQuestion({ projectQuestion }) {
      return projectQuestion
    },
    projectQuestion2df({ projectQuestion2df }) {
      return projectQuestion2df
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    setCurtCategory(state, cate) {
      state.curtCategory = cate
    },
    setCurtChapter(state, chap) {
      state.curtChapter = chap
    },
    setSteps(state, steps) {
      state.steps = steps
    },
    setCurtStep(state, step) {
      state.curtStep = step
    },
    setCurtChapterData(state, data) {
      state.curtChapterData = { ...data }
    },
    setProjectFormData(state, data) {
      state.projectFormData = { ...data }
    },
    setProjectId(state, id) {
      state.projectId = id
    },
    setDigitalFormId(state, id) {
      state.digitalFormId = id
    },
    setProjectQuestion(state, data) {
      state.projectQuestion = { ...data }
    },
    setQuestionForm2df(state, data) {
      state.projectQuestion2df = { ...data }
    }
  },
  actions: {
    async getFormDefinition({ commit, dispatch }) {
      const data = await DigitalForm.getFormDefinition()
      const cate = nestedSort([...staticCategories, ...nullFilter(data.categories)])
      commit('setDigitalFormId', data.id)
      commit('setCategories', cate)
      dispatch('getSteps')
      dispatch('setCurtCategory', get(cate, ['0', 'code']))
    },
    setCurtCategory({ commit, dispatch, getters: { steps }, state }, cateId) {
      const cate = find(state.categories, { code: cateId })
      const chapter = get(cate, ['chapters', '0'])
      const step = find(steps, { code: cate.code }) || find(steps, { steps: [{ code: chapter.code }] })

      commit('setCurtCategory', cate)
      commit('setCurtChapter', chapter)
      commit('setCurtChapterData', {})
      dispatch('getSavedData', state.projectId)
      commit('setCurtStep', step.num === 1 ? 1 : step.num + 1)
    },
    setCurtChapter({ commit, dispatch, getters, state }, chapterId) {
      if (!chapterId || getters.curtChapter?.id === chapterId) return

      const cate = find(state.categories, { chapters: [{ code: chapterId }] })
      const chapter = find(cate.chapters, { code: chapterId })

      commit('setCurtCategory', cate)
      commit('setCurtChapter', chapter)
      commit('setCurtChapterData', {})
      dispatch('getSavedData', state.projectId)
    },
    getSteps({ commit, state }) {
      let n = 0
      const steps = state.categories.map((cate, idx) => {
        const res = { ...pick(cate, ['code', 'title']), num: ++n, icon: idx + 1 }

        if (cate.chapters?.length > 1)
          res.steps = cate.chapters.map((chapter, chapterIdx) => ({
            ...pick(chapter, ['code', 'menuTitle']),
            icon: chapterIdx + 1,
            num: ++n
          }))
        return res
      })
      commit('setSteps', steps)
    },
    async getSavedData({ commit, dispatch, getters: { curtCategory, curtChapter } }, projectId) {
      const project = await ProjectApi.getProjectQuotepackStage(projectId)
      const data = project?.quotepackStage?.digitalform3df?.digitalformInstance?.answers
      const dataQuestionForm3df = project?.quotepackStage?.digitalform3df
      const dataQuestionForm2df = project?.quotepackStage?.digitalform2df
      if (data) {
        const chapterData = get(JSON.parse(data), [curtCategory.code, curtChapter.code], {})
        dispatch('updateCurtChapterData', chapterData)
        commit('setProjectFormData', data)
      }
      if (dataQuestionForm3df) {
        commit('setProjectQuestion', dataQuestionForm3df)
      }
      if (dataQuestionForm2df) {
        commit('setQuestionForm2df', dataQuestionForm2df)
      }
    },
    updateCurtChapterData({ commit, getters: { curtCategory, curtChapter }, state }, payload) {
      const cateData = { [curtCategory.code]: { [curtChapter.code]: payload } }

      commit('setCurtChapterData', merge(state.curtChapterData, payload))
      commit('setProjectFormData', merge(state.projectFormData, cateData))
    },
    async saveChapterData(
      { dispatch, getters: { curtCategory, curtChapter, curtChapterData, digitalFormId } },
      projectId
    ) {
      const project = await ProjectApi.getProjectQuotepackStage(projectId)
      const savedData = project?.quotepackStage?.digitalform3df?.digitalformInstance?.answers
      const newData = { [curtCategory.code]: { [curtChapter.code]: curtChapterData } }
      const dataToSave = savedData ? merge(JSON.parse(savedData), newData) : newData

      dispatch(
        'project/updateDigitalFormInstance',
        { chapterData: JSON.stringify(dataToSave), digitalFormId },
        { root: true }
      )
    },
    saveChapterDataGeneralQuestions({ dispatch, getters: { digitalFormId } }, data) {
      return dispatch('project/updateGeneralQuestion', { chapterData: data.data, digitalFormId }, { root: true })
    },
    saveChapterDataGeneralDueDiligence({ dispatch, getters: { digitalFormId } }, data) {
      return dispatch(
        'project/updateGeneralDueDiligence',
        { chapterData: data.dataSave, digitalFormId },
        { root: true }
      )
    },
    saveChapterDataGeneralDisclosure({ dispatch, getters: { digitalFormId } }, data) {
      return dispatch('project/updateGeneralDisclosure', { chapterData: data.dataSave, digitalFormId }, { root: true })
    },
    getFieldValue({ state }, fieldName) {
      return get(state.projectFormData, fieldName, null)
    }
  }
}
