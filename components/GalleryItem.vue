<template>
  <div class="item" @click="itemClicked">
    <img :src="item.thumbnailLink" referrerPolicy="no-referrer" />
    <div class='itemDescription'>
      <h5 class='itemTitle'>{{item.name}}</h5>
      <p v-if="item.content"> {{item.content}}</p>
      <p v-if="item.imageMediaMetadata.cameraModel">📸 {{item.imageMediaMetadata.cameraModel}}</p>
      <p v-if="item.imageMediaMetadata.time">🗓 {{item.imageMediaMetadata.time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  methods: {
    itemClicked() {
      alert("you clicked me!");
    },
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
.item:hover {
  filter: grayscale(50%) blur(3px);
}

.item > img {
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
