<template lang="pug">
.upload-content(@dragover="handleDragover" @dragleave="handleDragLeave" @drop="handleDrop")
  p.custom-file
    v-icon.upload-icon(class="material-icons-outlined" size="40px" color="accent") cloud_upload
    input.d-none(ref="uploader" type="file" :multiple="multiple" :accept="accept" @change.prevent="handleChange")
    span.darkgrey-1--text {{ label }} or&nbsp;
      span.font-weight-medium.accent--text.cursor(@click.prevent="handleClickFile") click to browse
</template>

<script>
import { toastedError } from '@/core/helpers/toasted'

export default {
  name: 'UploadField',
  props: {
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Drag your file here'
    },
    // unit Mb
    maxSize: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClickFile() {
      this.$refs.uploader.click()
    },
    handleDragover(event) {
      event.preventDefault()
      if (event.currentTarget.classList.contains('upload-content')) {
        event.currentTarget.classList.add('drag-in')
      }
    },
    handleDragLeave(event) {
      event.currentTarget.classList.remove('drag-in')
    },
    handleDrop(event) {
      event.preventDefault()
      this.$refs.uploader.files = event.dataTransfer.files
      this.handleChange()
      event.currentTarget.classList.remove('drag-in')
    },
    handleChange() {
      const types = this.accept.trim().split(',')
      let files = []
      const ffiles = this.$refs.uploader.files
      for (let i = 0; i < ffiles.length; i++) {
        const f = ffiles[i]
        if (this.maxSize <= 0 || this.maxSize * 1024 * 1024 >= f.size) {
          if (types.indexOf(f.type) > -1) {
            files.push(f)
            if (!this.multiple) {
              break
            }
          }
        }
      }
      if (files.length > 0) {
        this.$emit('input', files)
      } else {
        toastedError('Please select a valid file')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-content {
  text-align: center;
  border: 1px dashed #dedede;
  border-radius: 8px;

  &.drag-in {
    background-color: rgb(0 190 217 / 10%);
  }

  .custom-file {
    display: inline-block;
    margin-bottom: 0;
    padding: 24px 10px;

    .upload-icon {
      margin-right: 24px;
    }

    span {
      font-size: 14px;
      line-height: 17px;
    }
  }
}
</style>
