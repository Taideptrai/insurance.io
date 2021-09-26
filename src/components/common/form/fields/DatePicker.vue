<template lang="pug">
v-menu.date-picker(v-model="menu" transition="scale-transition" offset-y min-width="auto" nudge-top="100")
  v-date-picker(no-title v-model="date" @input="menu = false")
  template(#activator="{ on, attrs }")
    v-text-field.rounded-lg(outlined v-model="computedDateFormatted" :label="title" v-bind="attrs" v-on="on")
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'DatePicker',
  props: {
    title: {
      type: String,
      default: ''
    },
    dateDefault: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      date: null,
      dateFormatted: '',
      menu: false
    }
  },
  computed: {
    computedDateFormatted: {
      get() {
        if (!this.date) return ''
        return DateTime.fromISO(this.date).toFormat('dd-MM-yyyy')
      },
      set(val) {
        const date = DateTime.fromFormat(val, 'dd-MM-yyyy')
        if (date.isValid) {
          this.date = date.toISODate()
        }
      }
    }
  },
  watch: {
    date(val) {
      this.$emit('input', val)
    },
    dateDefault(val) {
      this.date = val
    }
  }
}
</script>
