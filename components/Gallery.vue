<template>
  <div>
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
</template>

<script>
export default {
  props: {
    gallery: {
        type: Object,
        required: true,
    },
    imageFetchEndpoint: {
        type: String,
        required: true,
    },
  },
  data() {
    return {
      images: [],
      loading: true
    };
  },
  methods: {
    async getImages() {
      this.loading = true;
      try {
        const res = await this.$axios.get(
          this.imageFetchEndpoint
        );
        this.images = res.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    add(img) {
      this.images.unshift(img);
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
