<template>
  <div class="">
    <div class="w-12/12 mx-auto px-8 mt-16">
      <div class="flex items-center justify-end">
        <button class="btn btn-primary btn-outline">Upload</button>
        <button class="btn btn-primary ml-3">Publish</button>
      </div>
      <div class="mt-8">
        <div class="gallery ">
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth"
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
