<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bottom
        color="success"
        overlap
        offset-x="12"
        offset-y="12"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          v-on="on"
        >
          <v-img :src="require('@/assets/images/avatars/3.png')"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="panel pb-3 pt-2">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/3.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <span class="user text--primary font-weight-semibold mb-n1 mr-3">
            {{$auth.user.nickname}}
          </span>
          <small class="text--disabled text-capitalize">{{$auth.user.roles}}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item
      link
      @click="$router.push({ path: `/players/${$auth.user.id}` })"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-account
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('common.profile') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item
      link
      @click="$auth.logout()"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-exit-to-app
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('common.logout') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .user {
    max-width: 180px;
    overflow: hidden;
  }
</style>
