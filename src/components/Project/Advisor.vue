<template lang="pug">
.advisor-content
  v-row(v-if="!value.isSuggest")
    v-col(md="6" cols)
      text-field(
        v-model="value.companyName"
        label="Advisor company name*"
        name="principalAdvisor_name"
        :rules="rules.name"
        append-icon="check"
        hide-details="auto"
      )
    v-col(md="6" cols)
      text-field(
        v-model="value.email"
        label="Advisor company e-mail*"
        name="principalAdvisor_email"
        :rules="rules.seller"
        append-icon="check"
        hide-details="auto"
        :readonly="canEdit"
      )
  v-row(v-if="value.isSuggest && !isSecond")
    v-col(md="6" cols)
      v-select(
        v-model="value.partnerAdvisorType"
        :items="advisorTypes"
        label="Type of partner"
        outlined
        :rules="rules.select"
        hide-details="auto"
        item-text="label"
        item-value="code"
      )
    v-col(md="6" cols)
      v-select(
        v-model="value.partnerAdvisor"
        :items="advisors"
        label="Advisor"
        outlined
        :rules="rules.select"
        hide-details="auto"
        item-text="label"
        item-value="code"
      )
      a.description-link.darkgrey-1--text(href="http://www.popadvisors.com" target="_blank") http://www.popadvisors.com (Matt Salesman)
  v-row(v-if="value.isSuggest && isSecond")
    v-col(md="6" cols)
      v-select(
        v-model="value.partnerAdvisorType"
        :items="advisorTypes"
        label="Type of partner"
        outlined
        :rules="rules.select"
        hide-details="auto"
        item-text="label"
        item-value="code"
      )
    v-col(md="6" cols)
      v-select(
        v-model="value.partnerAdvisor"
        :items="advisors"
        label="Advisor"
        outlined
        :rules="rules.mselect"
        hide-details="auto"
        item-text="label"
        item-value="code"
      )
      a.description-link.darkgrey-1--text(
        :href="curPartnerAdvisor.website"
        target="_blank"
        v-if="curPartnerAdvisor && curPartnerAdvisor.website"
      ) {{ curPartnerAdvisor.website }} ({{ curPartnerAdvisor.firstName }})
  v-row(v-if="isSecond")
    v-col(md="6" cols)
      v-switch.ma-0(v-model="value.allSectionsGranted" class="mb-4" color="accent" hide-details)
        template(slot="label")
          span.pl-2.switch-text(:class="`${value.allSectionsGranted ? 'accent' : 'darkgrey-1'}--text`") Can access all sections
      //- v-select.mb-4(
      //-   v-model="value.sectionsGranted"
      //-   :items="definition.data"
      //-   label="Sections Granted"
      //-   multiple
      //-   outlined
      //-   :rules="rules.mselect"
      //-   hide-details="auto"
      //-   item-text="title"
      //-   item-value="code"
      //-   v-if="!value.allSectionsGranted"
      //- )
      v-menu(offset-y :close-on-content-click="false" v-if="!value.allSectionsGranted" max-height="400px")
        template(#activator="{ on, attrs }")
          text-field.mb-4(
            name="filter"
            placeholder="Sections Granted"
            append-icon="arrow_drop_down"
            :bind="attrs"
            :on="on"
            :rules="rules.mselect"
            readonly
            :value="sectionsGranted"
            hide-details="auto"
          )
        v-card.filter-content
          v-treeview.treeview-content(
            v-model="value.sectionsGranted"
            :items="definition.data"
            selectable
            dense
            item-key="code"
            item-text="title"
          )
      v-switch.ma-0(v-model="value.allowViewAccess" color="accent" hide-details)
        template(slot="label")
          span.pl-2.switch-text(:class="`${value.allowViewAccess ? 'accent' : 'darkgrey-1'}--text`") Can view the entire project
</template>

<script>
import { TextField } from '@/components/common/form/fields'
import { isEmailValid } from '@/core/helpers/validation'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectAdvisor',
  components: {
    TextField
  },
  props: {
    isSetup: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => {}
    },
    isSecond: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          v => !!v || this.$t('error.validation.required'),
          v => v.length < 101 || this.$t('error.validation.maximun-character', { max: '100' })
        ],
        select: [v => !!v || this.$t('error.validation.required')],
        mselect: [v => v.length > 0 || this.$t('error.validation.required')],
        seller: [
          v => !!v || this.$t('error.validation.required'),
          v => {
            return isEmailValid(v) || this.$t('error.validation.email')
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('project', ['definition', 'advisors', 'advisorTypes']),
    curPartnerAdvisor() {
      const cur = this.advisors.filter(a => a.code === this.value.partnerAdvisor)
      if (cur.length > 0) {
        return cur[0]
      }
      return {}
    },
    canEdit() {
      return this.isSetup && typeof this.value.isChanged === 'boolean'
    },
    sectionsGranted() {
      if (this.value.sectionsGranted.length > 0) {
        return `${this.value.sectionsGranted.length} selected`
      }
      return ''
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        if (typeof this.value.isChanged === 'boolean' && !this.value.isChanged) {
          this.$emit('changed')
        }
      }
    }
  }
}
</script>
