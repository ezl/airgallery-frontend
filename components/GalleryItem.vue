<template>
  <div class="item" @click="itemClicked">
    <div class="imageContainer">
      <img :src="item.thumbnailLink" referrerPolicy="no-referrer" />
      <div class="overlay">
        {{ item.name }}
      </div>
    </div>
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
.imageContainer {
  position: relative;
}
.imageContainer img, .imageContainer .overlay {
  @apply rounded-lg;
}
.imageContainer img {
  display: block;
  width: 100%;
}
.itemTitle {
  @apply text-base text-white mb-1;
 }
.itemDescription {
  @apply text-sm text-slate-300 mt-2 font-light;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1em;
}

.imageContainer:hover .overlay {
  opacity: 1;
}
</style>
