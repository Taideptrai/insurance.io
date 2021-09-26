<template lang="pug">
.autocomplete-field
  v-autocomplete(
    eager
    outlined
    full-width
    return-object
    color="primary"
    class="rounded-lg"
    :name="name"
    :label="title"
    :loading="loading"
    :append-icon="appendIcon"
    :items="items"
    :multiple="multiple"
    :item-text="itemText"
    :value="modelValue"
    @focus="handleFocus"
    @change="handleChange"
    @update:search-input="handleSearching"
  )
    template(#append-item)
      .last-item(v-if="canLoadMore" v-observe-visibility="{callback: loadMore}" class="text-center") Loading more items ...
</template>

<script>
import { chain, debounce, get } from 'lodash'

import { Dictionary } from '@/core/api'
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  name: 'AutocompleteField',
  directives: {
    ObserveVisibility
  },
  props: {
    name: {
      type: String,
      required: true
    },
    dictionaryName: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    itemText: {
      type: String,
      default: 'label'
    },
    itemValue: {
      type: String,
      default: 'code'
    },
    orderBy: {
      type: Array,
      default: () => ['name']
    },
    termField: {
      type: String,
      default: 'name'
    },
    limit: {
      type: Number,
      default: 10
    },
    extraFields: {
      type: Array,
      default: () => ['code']
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      choice: null,
      loading: false,
      term: '',
      items: [],
      isLoadMore: false,
      cursor: '',
      modelValue: null
    }
  },
  computed: {
    appendIcon() {
      return '$dropdown'
    },
    canLoadMore() {
      return this.items?.length && this.cursor
    }
  },
  watch: {
    '$props.value'(val) {
      val &&
        (async () => {
          const termField = this.$props.itemValue?.split('.')
          const data = await Dictionary.dictionarySearch({
            dictionary: this.$props.dictionaryName,
            term: val,
            termField: termField[termField.length - 1],
            extraFields: this.$props.extraFields
          })
          this.items = this.formatData(data)
          this.modelValue = this.items[0]
        })()
    }
  },
  methods: {
    async handleSearching(text) {
      if (this.term !== text) {
        this.term = text
        this.searchDebounce()
      }
    },
    async search() {
      this.loading = true
      const data = await Dictionary.dictionarySearch({
        dictionary: this.$props.dictionaryName,
        term: this.term,
        orderBy: this.$props.orderBy,
        termField: this.$props.termField,
        first: this.$props.limit,
        after: this.isLoadMore ? this.cursor : '',
        extraFields: this.$props.extraFields
      })
      this.items = this.isLoadMore ? [...this.items, ...this.formatData(data)] : this.formatData(data)
      this.cursor = chain(this.items).last().get('cursor').value() || ''
      this.isLoadMore = false
      this.loading = false
    },
    searchDebounce: debounce(async function () {
      return this.search()
    }, 333),
    async loadMore(evt) {
      if (evt) {
        this.isLoadMore = true
        this.search()
      }
    },
    formatData(rawData) {
      return chain(rawData)
        .get([this.$props.dictionaryName, 'edges'])
        .map(({ cursor, node }) => ({ ...node, cursor }))
        .value()
    },
    handleChange(evt) {
      this.term = get(evt, this.$props.itemText)
      this.$emit('update:selected', get(evt, this.$props.itemValue))
    },
    handleFocus() {
      this.search()
    }
  }
}
</script>
