<template>
  <span>
    <!-- The button to open modal -->
    <label for="dropzone-modal" class="btn btn-primary ml-3">&plus;&nbsp;&nbsp;Add Images</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="dropzone-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="dropzone-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold mb-4">Upload Images</h3>
        <dropzone
          id="dropzone"
          ref="dropzone"
          :options="dropzoneOptions"
          @vdropzone-success="fileAddSuccess"
          :destroyDropzone="true">
        </dropzone>
      </div>
    </div>
  </span>
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

<style>
.modal {
}
.modal-box {
  height: calc(100vh - 6em);
  max-width: calc(100vw - 6em);
  width: calc(100vw - 6em);
}

.vue-dropzone {
  @apply bg-slate-700 border-slate-400 border-dashed;
  height: 90%;
}
.vue-dropzone:hover {
  @apply bg-slate-500 border-slate-200
}

</style>
