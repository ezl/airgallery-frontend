<template>
  <div class="">
    <div class="w-12/12 mx-auto px-8 mt-16">
      <div class="flex items-center justify-end">
        <label
          :class="{ loading: uploading }"
          :disabled="uploading"
          class="btn btn-primary btn-outline"
        >
          <input type="file" @change="onChange" class="hidden" />
          Upload
        </label>
        <button class="btn btn-primary ml-3">Publish</button>
      </div>
      <div class="mt-8">
        <div v-if="images.length" class="gallery">
          <div v-for="img in images" :key="img.id">
            <img :src="img.thumbnailLink" referrerPolicy="no-referrer" />
          </div>
        </div>
        <div v-else class="text-center mt-20">
          <span
            v-if="loading"
            class="loading btn bg-transparent text-black border-none"
            >Loading...</span
          >
          <span v-else>No images</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      file: null,
      images: [],
      uploading: false,
      loading: false
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      e.target.value = "";
      this.upload();
    },
    async upload() {
      this.uploading = true;
      try {
        const formData = new FormData();
        formData.append("image", this.file);

        const res = await this.$axios.put("/upload/drive", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        this.images.unshift(res.data);
      } catch (error) {
        console.error(error);
      }
      this.uploading = false;
    },
    async getImages() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/gallery/1/images`);
        this.images = res.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
  },
  mounted() {
    this.getImages();
  }
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
