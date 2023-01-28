<template>
  <div class="flex items-center py-4 px-8">
    <div class="flex-1">
      <nuxt-link to="/" class="logo">kettlestitch</nuxt-link>
    </div>
    <div class="flex-none">
      <div v-if="$auth.loggedIn" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              :src="$auth.user.profile_picture_url"
              referrerpolicy="no-referrer"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>

      <ul v-else class="menu menu-horizontal p-0">
        <li><a @click="redirect">Get started</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoogleOAuthUrl } from "@/helpers";

export default {
  auth: "guest",
  methods: {
    logout() {
      this.$auth.logout();
    },
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

<style>
.logo {
  @apply text-xl tracking-widest;
  font-family: 'Lora', serif;
}
</style>
