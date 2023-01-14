<template>
  <div class="">
    <form class="grid grid-cols-1 gap-6" v-on:submit.prevent="onSubmit">
      <label>
        <span>Enter name for new gallery</span>
        <input
          type='text'
          name='gallery-name'
          v-model='galleryName'
        />
      </label>
      <label>
        <span>Gallery description (optional)</span>
        <textarea
          name="gallery-description"
          v-model='galleryDescription'
         />
      </label>
      <input type='submit' class="btn" :value='submitting ? "Submitting" : "Submit"' :disabled="submitting"/>
    </form>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      galleryName: 'test name',
      galleryDescription: null ||'test description test description test description test description test description test description ',
      submitting: false
     }
   },
  methods: {
    onSubmit(e) {
      this.submitting = true
      console.log('onSubmit')
      console.log('galleryName:', this.galleryName)
      console.log('galleryDescription:', this.galleryDescription)
      this.submitting = false
    },
    async createNewGallery(galleryData) {
      try {
        const formData = new FormData();
        formData.append("galleryName", this.galleryName);
        formData.append("galleryDescription", this.galleryDescription);

        const res = await this.$axios.put("drf/galleries/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        this.$refs.gallery.add(res.data);
      } catch (error) {
        console.error(error);
      }
      this.uploading = false;
    }
  }
};
</script>

<style scoped>
label {
  @apply block;
}
input, textarea {
  @apply block mt-1;
}
</style>
