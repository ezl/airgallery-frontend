<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <span class="loading btn bg-transparent text-black border-none">Please wait...</span>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data(){
      return {
          error: false
      }
  },
  computed: {
    authorizationCode() {
      const url = new URL(window.location.href);
      if (url.searchParams.has("code")) {
        return url.searchParams.get("code");
      }
    }
  },
  async mounted() {
    try {
      if (!this.authorizationCode) {
        this.$router.push({ name: "index" });
        return;
      }

      const payload = {
        code: this.authorizationCode
      };

      const options = {
        headers: {
          "Content-type": "application/json"
        }
      };

      const res = await this.$axios.post(
        "/storage-backends/connect",
        payload,
        options
      );

      await this.$auth.setUserToken(res.data.access_token)
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
