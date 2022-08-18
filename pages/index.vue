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
export default {
  layout: "guest",
  auth: 'guest',
  computed: {
    googleAuthUrl() {
      const baseUrl = "https://accounts.google.com/o/oauth2/auth";
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
      const scope =
        "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
      const responseType = "code";
      const accessType = "offline";

      return `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrl}&access_type=${accessType}&response_type=${responseType}`;
    }
  },
  methods: {
    redirect() {
      console.log(this.googleAuthUrl)
      window.location.replace(this.googleAuthUrl);
    }
  }
};
</script>
