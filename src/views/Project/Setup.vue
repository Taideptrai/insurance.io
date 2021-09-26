<template lang="pug">
.setup
  DefaultLoading(v-if="isLoading")
  project-create-form(is-setup :init-data="project" v-if="!isLoading" @create-project:modified="handleModified")
</template>

<script>
import { DefaultLoading } from '@/components/common/loading'
import { ProjectApi } from '@/core/api'
import { ProjectCreateForm } from '@/components/Project'
import { checkUnsavedMixin } from '@/core/helpers/mixins'
import { toastedError } from '@/core/helpers/toasted'

export default {
  name: 'SetupProject',
  components: {
    DefaultLoading,
    ProjectCreateForm
  },
  mixins: [checkUnsavedMixin],
  data() {
    return {
      isLoading: true,
      project: {}
    }
  },
  created() {
    const { id } = this.$route.params
    ProjectApi.getDetail(id)
      .then(({ data, errors }) => {
        if (errors && errors.length > 0) {
          toastedError(errors[0]?.message)
          this.$router.push({ name: 'home' })
        } else {
          const { project } = data
          if (project && project.id === id) {
            this.$store.dispatch('setTitle', project.name)
            this.$store.dispatch('setBackRouter', {
              title: 'My projects',
              router: { name: 'home' }
            })
            this.project = project
          } else {
            toastedError(this.$t('error.project-not-found'))
            this.$router.push({ name: 'home' })
          }
          this.isLoading = false
        }
      })
      .catch(_ => {
        toastedError('Has error')
        this.isLoading = false
        this.$router.push({ name: 'home' })
      })
  },
  methods: {
    handleModified(status) {
      this.isModified = status
    }
  }
}
</script>
