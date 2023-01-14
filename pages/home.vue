<template>
  <div class="">
    <nuxt-link to="/add-gallery">Add new gallery</nuxt-link>
    <div v-if="!loading && gallery" class="w-12/12 mx-auto px-8 mt-16">
      <div class="flex items-center justify-end">
        <div v-if="gallery.published_at">
          <a :href="galleryLink" target="_blank" class="text-blue-500 underline">{{galleryLink}}</a>
        </div>
        <label
          :class="{ loading: uploading }"
          :disabled="uploading"
          class="btn btn-primary btn-outline ml-3"
        >
          <input type="file" @change="onChange" class="hidden" />
          Upload
        </label>
        <button @click="togglePublication" :class="{ loading: updating }" class="btn btn-primary ml-3">
          <span v-if="!gallery.published_at">Publish</span>
          <span v-else>Unpublish</span>
        </button>
      </div>
      <div>
        <dropzone id="dropzone" ref="dropzone" :options="options" :destroyDropzone="true"></dropzone>
      </div>
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
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import Gallery from "@/components/Gallery";
export default {
  components: {
    Dropzone,
    Gallery
  },
  middleware: "auth",
  data() {
    return {
      options: {
        url: "http://httpbin.org/anything"
      },
      file: null,
      gallery: null,
      uploading: false,
      loading: false,
      updating: false
    };
  },
  computed:{
    galleryLink(){
      return window.location.origin + '/gallery/' + this.gallery.slug
    }
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

        this.$refs.gallery.add(res.data);
      } catch (error) {
        console.error(error);
      }
      this.uploading = false;
    },
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
  },
  mounted() {
    this.getDefaultUserGallery();
    const instance = this.$refs.dropzone
  }
};
</script>
