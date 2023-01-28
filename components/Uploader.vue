<template>
  <div>
    <dropzone
      id="dropzone"
      ref="dropzone"
      :options="dropzoneOptions"
      @vdropzone-success="fileAddSuccess"
      :destroyDropzone="true">
    </dropzone>
  </div>
</template>
<script>
import 'nuxt-dropzone/dropzone.css'
import Dropzone from 'nuxt-dropzone'

export default {
  components: {
    Dropzone,
  },
  data() {
    return {
      // dropzone stuff
      dropzoneOptions: {
        url: 'http://localhost:8000/api/upload/drive',
        autoProcessQueue: true,
        parallelUploads: 5,
        acceptedFiles: 'image/*',
      },
    }
  },
  methods: {
    fileAddSuccess(file, response) {
      console.log("FILE ADDED!")
      this.$emit('fileAddSuccess', response)
    },
  },
  mounted() {
    const instance = this.$refs.dropzone
  }
};
</script>
