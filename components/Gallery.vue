<template>
  <div>
    <div class="mt-8">
      <vue-masonry-wall :items="images" :options="masonryOptions" @append="append">
        <template v-slot:default="{item}" class="masonry">
          <div class="item">
            <img :src="item.thumbnailLink" referrerPolicy="no-referrer" />
            <div class='itemDescription'>
              <h5>👁 {{item.name}}</h5>
              <p v-if="item.content"> {{item.content}}</p>
              <p v-if="item.imageMediaMetadata.cameraModel">📸 {{item.imageMediaMetadata.cameraModel}}</p>
              <p v-if="item.imageMediaMetadata.time">🗓 {{item.imageMediaMetadata.time}}</p>
            </div>
          </div>
        </template>
      </vue-masonry-wall>
    </div>
    <hr>
    Sample item
    {{images[0]}}

    <hr>
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

export default {
  components: { VueMasonryWall },
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

      images: [],
      loading: true
    };
  },
  methods: {
    append() {
      // API call and add items for masonry
      this.items.push(...[])
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
.itemDescription {
  @apply text-sm text-slate-300 mt-2;
}
</style>
