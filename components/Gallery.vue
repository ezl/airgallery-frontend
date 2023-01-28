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
    </div>

    <Uploader @fileAddSuccess='this.add' />

    <div class="mt-8">
    <h2>new masonry gallery - why is this so slow to render?</h2>
      <vue-masonry-wall :items="images" :options="masonryOptions" @append="append">
        <template v-slot:default="{item}" class="masonry">
          <div class="item">
            <img :src="item.thumbnailLink" referrerPolicy="no-referrer" />
            <div class='itemDescription'>
              <h5 class='itemTitle'>{{item.name}}</h5>
              <p v-if="item.content"> {{item.content}}</p>
              <p v-if="item.imageMediaMetadata.cameraModel">📸 {{item.imageMediaMetadata.cameraModel}}</p>
              <p v-if="item.imageMediaMetadata.time">🗓 {{item.imageMediaMetadata.time}}</p>
            </div>
          </div>
        </template>
      </vue-masonry-wall>
    </div>
    <hr>
    <h2>old tile gallery</h2>
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

.masonry-item > .item > img {
  @apply rounded-2xl;
  width: 100%;
  object-fit: cover;
}
.itemTitle {
  @apply text-base text-white mb-1;
 }
.itemDescription {
  @apply text-sm text-slate-300 mt-2 font-light;
}
</style>
