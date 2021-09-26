<template lang="pug">
.create
  project-create-form
</template>

<script>
import { ProjectCreateForm } from '@/components/Project'

export default {
  name: 'CreateProject',
  components: {
    ProjectCreateForm
  },
  beforeCreate() {
    this.$store.dispatch('setTitle', 'New Project')
    this.$store.dispatch('setBackRouter', {
      title: 'My projects',
      router: { name: 'home' }
    })
  }
}
</script>
