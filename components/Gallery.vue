<template>
  <div>
    <div class="flex items-center justify-end">
      <div v-if="gallery.published_at">
        <a :href="galleryLink" target="_blank" class="text-blue-500 underline">{{galleryLink}}</a>
      </div>
      <button @click="togglePublication" :class="{ loading: updating }" class="btn btn-primary ml-3">
        <span v-if="!gallery.published_at">Publish</span>
        <span v-else>Unpublish</span>
      </button>
      <Uploader @fileAddSuccess='this.add' />
    </div>

    <section class="mt-8">
      <vue-masonry-wall :items="images" :options="masonryOptions" @append="append">
        <template v-slot:default="{item}" class="masonry">
          <gallery-item :item="item" />
        </template>
      </vue-masonry-wall>
    </section>

    <section class="mt-8" v-if="false">
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
    </section>

  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall"
import Uploader from "@/components/Uploader";

export default {
  components: {
    VueMasonryWall,
    Uploader,
  },
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
      // our ui stuff
      updating: false,
      images: [],
      loading: true,

      // masonry stuff
      items: [],
      masonryOptions: {
        width: 300,
        padding: {
          default: 12,
          1: 6,
          2: 8
        }
      },
    };
  },
  computed:{
    galleryLink(){
      return window.location.origin + '/gallery/' + this.gallery.slug
    }
  },
  methods: {
    append() {
      // API call and add items for masonry
      this.items.push(...[])
    },
    async togglePublication() {
      this.updating = true
      if (!!this.gallery.published_at) {
        try {
          const res = await this.$axios.patch(
            `drf/galleries/${this.gallery.slug}/unpublish/`
          );
          this.gallery = res.data;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const res = await this.$axios.patch(
            `drf/galleries/${this.gallery.slug}/publish/`
          );
          this.gallery = res.data;
        } catch (error) {
          console.error(error);
        }
      }
      this.updating = false
    },
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
/* old gallery - just keeping this here until i figure out the rendering speed issue */
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
/* end old gallery */
</style>
