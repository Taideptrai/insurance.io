<template lang="pug">
.search-bar
  v-row
    v-col(lg="6" md="5" sm="6" cols="12")
      text-field(
        name="projectname"
        placeholder="Search project name..."
        icon="search"
        :debounceTime="800"
        @input="handleInput"
        hide-details
      )
    v-col(lg="2" md="2" sm="6" cols="12")
      v-menu(offset-y :close-on-content-click="false")
        template(#activator="{ on, attrs }")
          text-field(
            name="filter"
            placeholder="Add a filter..."
            icon="filter_list"
            append-icon="arrow_drop_down"
            :bind="attrs"
            :on="on"
            readonly
            :value="filterTitle"
            hide-details
          )
        v-card.filter-content
          h1.title-list(class="darkgrey--text") stage
          v-list
            v-list-item(:key="item.code" v-for="item in stages")
              v-list-item-action
                v-checkbox.checkbox(
                  v-model="selectedStage"
                  dense
                  :value="item"
                  color="#00bed9"
                  size="16px"
                  @change="handleFilterDebounce"
                )
                  template(slot="label")
                    span.itemtitle(:class="getColorClass(item.code)") {{ item.label }}
          h1.title-list(class="darkgrey--text mt-4") Status
          v-list
            v-list-item(:key="item.code" v-for="item in packState")
              v-list-item-action
                v-checkbox.checkbox(
                  v-model="selectedStatus"
                  dense
                  :value="item"
                  color="#00bed9"
                  size="16px"
                  @change="handleFilterDebounce"
                )
                  template(slot="label")
                    span.itemtitle.darkgrey--text {{ item.label }}
          v-card-actions.pa-0.justify-center
            v-btn.clear-btn.text-capitalize(
              text
              small
              :color="countFilter > 0 ? 'accent' : 'darkgrey'"
              @click.prevent="handleClearFilter"
            ) Clear all
    v-col(lg="2" md="2" sm="6" cols="12")
      v-menu(offset-y)
        template(#activator="{ on, attrs }")
          text-field.sortDropdown(
            name="projectname"
            placeholder="Sort by"
            icon="sort"
            append-icon="arrow_drop_down"
            :bind="attrs"
            :on="on"
            :readonly="true"
            :value="sortTitle"
            :hide-details="true"
            :title="sortTitle"
          )
        v-card.filter-content
          span.sort-item.d-block.cursor.darkgrey--text(
            :key="item.value"
            @click.prevent="handleSort(item)"
            v-for="item in sorts"
          ) {{ item.name }}
    v-col(lg="2" md="3" sm="6" cols="12")
      v-btn.mb-5(block tile color="#00bed9" min-height="48" :to="{ name: 'project.create' }")
        v-icon(left color="white") add
        span.white--text(color="white") New Project
  .list-filter.pb-7(v-if="countFilter > 0")
    span.text(:key="item.code" :class="`color-btn-${getStageColor(item.code)}`" v-for="(item, index) in selectedStage") {{ item.label }}
      v-icon.cursor.icon.material-icons-outlined(
        size="11"
        color="white"
        @click.prevent="handleRemoveFilterStage(index)"
      ) close
    span.text.color-btn-dark-grey-outline(:key="item.code" v-for="(item, index) in selectedStatus") {{ item.label }}
      v-icon.cursor.icon.material-icons-outlined(
        size="11"
        color="darkgrey"
        @click.prevent="handleRemoveFilterStatus(index)"
      ) close
    span.clear-all.text.cursor.accent--text(@click.prevent="handleClearFilter") Clear all
</template>

<script>
import { TextField } from '@/components/common/form/fields'
import debounce from 'lodash/debounce'
import { getColorFromStage } from '@/core/helpers/project'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectSearchBar',
  components: {
    TextField
  },
  data() {
    return {
      name: '',
      stages: [
        {
          code: 'project_setup',
          label: 'Project Setup'
        },
        {
          code: 'quote_pack',
          label: 'Quote Pack'
        },
        {
          code: 'binder_pack',
          label: 'Binder Pack'
        },
        {
          code: 'signing_and_completion',
          label: 'Signing & Completion'
        }
      ],
      selectedStage: [],
      status: [
        {
          name: 'Open',
          value: 'open'
        },
        {
          name: 'Filling Forms',
          value: 'filling_forms'
        },
        {
          name: 'Waiting for Quotes',
          value: 'waiting_for_quotes'
        },
        {
          name: 'Quotes Ready',
          value: 'quotes_ready'
        },
        {
          name: 'Quote Ready',
          value: 'quote_ready'
        },
        {
          name: 'Completed',
          value: 'completed'
        },
        {
          name: 'Executing',
          value: 'executing'
        },
        {
          name: 'Signed',
          value: 'signed'
        },
        {
          name: 'Closed',
          value: 'closed'
        }
      ],
      selectedStatus: [],
      sorts: [
        {
          name: 'Creation date - ascending',
          value: 'created_at'
        },
        {
          name: 'Creation date - descending',
          value: '-created_at'
        },
        {
          name: 'Modification date - ascending',
          value: 'updated_at'
        },
        {
          name: 'Modification date - descending',
          value: '-updated_at'
        },
        {
          name: 'Stage - ascending',
          value: 'quotepack_stage'
        },
        {
          name: 'Stage - descending',
          value: '-quotepack_stage'
        },
        {
          name: 'Name - ascending',
          value: 'name'
        },
        {
          name: 'Name - descending',
          value: '-name'
        }
      ],
      sortBy: {
        name: 'Creation date - descending',
        value: '-created_at'
      }
    }
  },
  computed: {
    ...mapGetters('project', ['packState', 'projectState']),
    countFilter() {
      return this.selectedStage.length + this.selectedStatus.length
    },
    filterTitle() {
      return this.countFilter > 0 ? `${this.countFilter} filter${this.countFilter > 1 ? 's' : ''} applied` : ''
    },
    sortTitle() {
      return this.sortBy && this.sortBy.name ? `Sort by: ${this.sortBy.name}` : ''
    }
  },
  mounted() {
    this.onSearch()
  },
  created() {
    this.handleFilterDebounce = debounce(_ => {
      this.onSearch()
    }, 1000)
  },
  methods: {
    getColorClass(code) {
      return `color-${this.getStageColor(code)}`
    },
    getStageColor(stage) {
      return getColorFromStage(stage)
    },
    handleClearFilter() {
      if (this.countFilter > 0) {
        this.selectedStage = []
        this.selectedStatus = []
        this.onSearch()
      }
    },
    handleSort(item) {
      if (item.value !== this.sortBy.value) {
        this.sortBy = item
        this.onSearch()
      }
    },
    handleRemoveFilterStage(index) {
      this.selectedStage.splice(index, 1)
      this.onSearch()
    },
    handleRemoveFilterStatus(index) {
      this.selectedStatus.splice(index, 1)
      this.onSearch()
    },
    handleInput(value) {
      this.name = value
      this.onSearch()
    },
    onSearch() {
      this.$emit('search', {
        name: this.name,
        stage: this.selectedStage.map(s => s.code),
        status: this.selectedStatus.map(s => s.code),
        sort: this.sortBy.value
      })
    }
  }
}
</script>

<style lang="scss">
.list-filter {
  .text {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 4px;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 100px;

    .icon {
      margin-left: 8px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.filter-content {
  padding: 16px;

  .title-list {
    margin-bottom: 12px;
    font-size: 10px;
    text-transform: uppercase;
  }

  .v-list {
    padding: 0;

    .v-list-item {
      height: auto;
      min-height: auto;
      padding: 0;

      &__action {
        margin: 0;
      }

      .itemtitle {
        padding-left: 8px;
        font-size: 14px;
      }
    }
  }
}
</style>
