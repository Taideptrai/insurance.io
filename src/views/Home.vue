<template lang="pug">
.home(class="pt-2 pb-8")
  project-search-bar(@search="handleSearch")
  .list-project(v-if="listProject.data.length > 0")
    v-row
      v-col(lg="3" md="4" sm="6" xs="12" cols="12" :key="index" v-for="(item, index) in listProject.data")
        project-card(:project="item")
  .blank-project(class="mt-4" v-if="listProject.data.length < 1 && !listProject.loading && !isSearch")
    v-icon.no-icon(color="dovegrey" size="40") content_paste
    span.darkgrey--text No projects created yet
  .blank-project(class="mt-4")(v-if="listProject.data.length < 1 && !listProject.loading && isSearch")
    v-icon.no-icon(color="dovegrey" size="40") error_outline
    span.darkgrey--text No matching results
  .text-center(class="mt-10" v-if="listProject.loading")
    v-progress-circular(:size="40" :width="4" color="accent" indeterminate)
</template>

<script>
import { ProjectCard, ProjectSearchBar } from '@/components/Project'

import { TextField } from '@/components/common/form/fields'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TextField,
    ProjectCard,
    ProjectSearchBar
  },
  data() {
    return {
      search: {
        name: '',
        stage: [],
        status: [],
        sort: 'create_time'
      }
    }
  },
  computed: {
    ...mapGetters('project', ['listProject']),
    isSearch() {
      return this.search.name.length > 0 || this.search.stage.length > 0 || this.search.status.length > 0
    }
  },
  beforeMount() {
    this.$store.dispatch('setTitle', 'My Projects')
    this.$store.dispatch('setBackRouter', {})
  },
  created() {
    this.$store.dispatch('project/loadSearchProject')
  },
  methods: {
    onSearch() {
      this.$store.dispatch('project/getListProject', this.search)
    },
    handleSearch(data) {
      this.search = data
      this.onSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .blank-project {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 154px;
    border: 1px solid $color-medium-gray;
    border-radius: 8px;

    .no-icon {
      margin-bottom: 17px;
      opacity: 23%;
    }
  }
}
</style>
