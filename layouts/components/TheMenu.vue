<template>
    <v-list
      nav
    >
      <v-subheader>{{ $t('common.player_menu') }}</v-subheader>

      <v-list-item-group

      >
        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/games` })"
        >
          <v-list-item-title>{{ $t('common.games') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/players` })"
        >
          <v-list-item-title>{{ $t('common.players') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/clubs` })"
        >
          <v-list-item-title>{{ $t('common.clubs') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/ratings` })"
        >
          <v-list-item-title>{{ $t('common.ratings') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/tournaments` })"
        >
          <v-list-item-title>{{ $t('common.tournaments') }}</v-list-item-title>
        </v-list-item>

      </v-list-item-group>

      <v-subheader
        v-if="$auth.user && $auth.user.roles === 'MODER'"
      >
        {{ $t('common.organizer_menu') }}
      </v-subheader>

      <v-subheader
        v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      >
        {{ $t('common.admin_menu') }}
      </v-subheader>

      <v-list-item-group
        v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      >

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/cards` })"
        >
          <v-list-item-title>{{ $t('common.players_seating') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/games/create` })"
        >
          <v-list-item-title>{{ $t('common.game_blank') }}</v-list-item-title>
        </v-list-item>

        <v-list-item
        link
        @click="$router.push({ path: `/ratings/create` })"
        >
          <v-list-item-title>{{ $t('common.create_rating') }}</v-list-item-title>
        </v-list-item>

      </v-list-item-group>

      <v-subheader
        v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      >
        {{ $t('common.debug_menu') }}
      </v-subheader>

      <v-list-item-group
        v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      >
        <v-list-item
        link
        @click="$router.push({ path: `/`+$i18n.locale+`/testrating` })"
        >
          <v-list-item-title>Тестовый рейтинг</v-list-item-title>
        </v-list-item>

      </v-list-item-group>

    </v-list>
</template>

<style scoped>

.theme--light.v-subheader {
  color: #ddd;
}

.v-list-item {
  min-height: 28px;
  z-index: 1000;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.6rem;
}

.v-list-item__title {
  color: rgb(255, 255, 255);
  font-size: 0.8rem;
}
</style>
