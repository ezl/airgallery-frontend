<template>
  <div class="">
    <div v-if="!loading && galleries" class="w-12/12 mx-auto px-8 mt-16">
      <div class="mt-8" v-for="gallery in galleries">
        <Gallery
          ref="gallery"
          v-if="gallery"
          :gallery="gallery"
          :image-fetch-endpoint="`/drf/images/?gallery=${gallery.id}`"
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
      galleries: [],
      loading: true,
    };
  },
  methods: {
    async getUserGalleries() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/drf/galleries/?user=request.user`);
        this.galleries = res.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getUserGalleries();
  }
};
</script>
