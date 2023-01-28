<template>
  <div class="">
    <div v-if="!loading && gallery" class="w-12/12 mx-auto px-8 mt-16">
      <div class="mt-8">
        <Gallery
          ref="gallery"
          v-if="gallery"
          :gallery="gallery"
          image-fetch-endpoint="auth/user/gallery/images"
        />
      </div>
    </div>
    <div v-else class="h-screen flex justify-center items-center">
      <h5 class="text-lg">Loading...</h5>
    </div>
  </div>
</template>

<script>
import Gallery from "@/components/Gallery";
export default {
  components: {
    Gallery
  },
  middleware: "auth",
  data() {
    return {
      gallery: null,
      loading: true,
    };
  },
  methods: {
    async getDefaultUserGallery() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/auth/user/gallery`);
        this.gallery = res.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getDefaultUserGallery();
  }
};
</script>
