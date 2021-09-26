<template lang="pug">
.project-setup(fluid)
  project-create-form(is-setup :init-data="project.data" @create-project:modified="handleModified")
</template>

<script>
import { DefaultLoading } from '@/components/common/loading'
import { ProjectCreateForm } from '@/components/Project'
import { checkUnsavedMixin } from '@/core/helpers/mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectSetup',
  components: {
    DefaultLoading,
    ProjectCreateForm
  },
  mixins: [checkUnsavedMixin],
  computed: {
    ...mapGetters('project', ['project'])
  },
  methods: {
    handleModified(status) {
      this.isModified = status
      this.$emit('modified', status)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-setup {
  height: 100%;
  overflow: auto;

  ::v-deep {
    .v-window__container {
      overflow: auto;
    }
  }
}
</style>
