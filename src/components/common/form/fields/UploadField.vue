<template lang="pug">
.upload-content(@dragover="handleDragover" @dragleave="handleDragLeave" @drop="handleDrop")
  .custom-file.d-flex.justify-center.align-center
    //- v-icon.upload-icon(size="40px" color="accent") mdi-cloud-upload-outline
    input.d-none(ref="uploader" type="file" :multiple="multiple" :accept="accept" @change.prevent="handleChange")
    span.material-icons-outlined.upload-icon cloud_upload
    .content.mr-1 {{ label }} or
    .content.text--accent.cursor(@click.prevent="handleClickFile") click to browse
</template>

<script>
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
        if (types.indexOf(f.type) > -1) {
          files.push(f)
          if (!this.multiple) {
            break
          }
        }
      }
      if (files.length > 0) {
        this.$emit('input', files)
      }
    }
  }
}
</script>

<style lang="scss">
.upload-content {
  text-align: center;
  border: 1px dashed #dedede;
  border-radius: 8px;

  &.drag-in {
    background-color: rgb(0 190 217 / 10%);
  }

  .custom-file {
    margin-bottom: 0;
    padding: 24px 10px;

    .upload-icon {
      margin-right: 24px;
      color: $color-primary;
      font-size: 40px;
    }

    .content {
      display: inline-block;
      font-weight: 600;
      font-size: 14px;
    }

    .cursor {
      cursor: pointer;
    }

    .text--accent {
      color: $color-primary;
    }
  }
}
</style>
