<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-lg">
        <h1>Beautiful Galleries For Groups Or Events</h1>
        <p class="subtext">
          The easiest way to create a gallery that your friends or event attendees can also add to.
        </p>
        <button @click="redirect" class="my-14 btn btn-primary">Get Started</button>
        <img src='@/static/hero.png' class='mx-auto' />
      </div>
    </div>
  </div>
</template>

<script>
import { getGoogleOAuthUrl } from '@/helpers'

export default {
  auth: 'guest',
  methods: {
    redirect() {
      window.location.replace(getGoogleOAuthUrl([
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ]));
    }
  }
};
</script>

<style scoped>
div.hero {
  /* Subtract header height */
  height: calc(100vh - 80px);
}
.hero h1 {
  @apply text-white;
  font-size: 2.25rem;
  line-height: 3.4rem;
}
.hero p.subtext {
  @apply mt-6 text-slate-300;
  font-weight: lighter;
  font-size: 1.2rem;
  line-height: 1.8rem;
}
.hero img {
}
</style>
