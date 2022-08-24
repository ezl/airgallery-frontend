<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Universal Photo Gallery</h1>
        <p class="py-6">
          Host your photo gallery on google drive
        </p>
        <button @click="redirect" class="btn btn-primary">Get Started</button>
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
