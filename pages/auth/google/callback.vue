<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <div v-if="error">
      <div v-if="error == 'missing_permission_google_dive'" class="text-center">
        <p>Ops, looks like you did not grant us access to your Google Drive account.</p>
        <button @click="requestDriveAccess" class="btn btn-primary mt-3 inline-block">Grant access</button>
      </div>
      <div v-else>
        <span>Something went wrong. Please try again</span>
      </div>
    </div>
    <span v-else class="loading btn bg-transparent text-black border-none">Please wait...</span>
  </div>
</template>

<script>
import { getGoogleOAuthUrl } from "@/helpers";

export default {
  auth: 'guest',
  data(){
      return {
          error: null
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
  methods:{
    requestDriveAccess(){
      window.location.replace(getGoogleOAuthUrl([
        'https://www.googleapis.com/auth/drive'
      ]));
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
      const data = error.response.data
      
      if(data.missing_permission_google_dive){
        this.error = 'missing_permission_google_dive'
      }else{
        this.error = 'general_error'
      }
    }
  }
};
</script>
