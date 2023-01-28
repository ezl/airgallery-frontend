<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
};
</script>
