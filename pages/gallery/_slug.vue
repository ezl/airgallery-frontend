<template>
<div>
  <div v-if="gallery">
    <div class="flex flex-col justify-center items-center">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            :src="gallery.user.profile_picture_url"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
      <h2 class="mt-4 text-xl">{{ gallery.user.first_name }}</h2>
    </div>
    <div class="mt-8">
      <Gallery
        :gallery="gallery" 
        :image-fetch-endpoint="`/drf/images/?gallery=${this.gallery.id}`"
      />
    </div>
  </div>
  <div v-else class="h-screen flex justify-center items-center"> 
    <h5 class="text-lg">Not found</h5>
  </div>
</div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      gallery: null,
      images: [],
      loading: false
    };
  },
  async asyncData({ params, $axios }) {
    try {
      const res = await $axios.get(`/drf/galleries/${params.slug}`);
      return {
        gallery: res.data
      };
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
