<template>
  <v-card
    flat
    class="mt-5"
  >
    <v-form>
      <div class="px-3">

        <v-card-text class="pt-5">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- current password -->
              <v-text-field
                v-model="currentPassword"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-off-outline'"
                label="Текущий пароль"
                outlined
                dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              ></v-text-field>

              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-off-outline'"
                label="Новый пароль"
                outlined
                dense
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="cPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-off-outline'"
                label="Повторить новый пароль"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3">
            {{'mdi-lock-open-outline'}}
          </v-icon>
          <span class="text-break">Двухфакторная авторизация</span>
        </v-card-title>

        <v-card-text class="two-factor-auth text-center mx-auto">
          <v-avatar
            color="primary"
            class="primary mb-4"
            rounded
          >
            <v-icon
              size="25"
              color="white"
            >
              {{'mdi-lock-open-outline'}}
            </v-icon>
          </v-avatar>
          <p class="text-base text--primary font-weight-semibold">
            Двухфакторная аутентификация пока не включена.
          </p>
          <p class="text-sm text--primary">
            Двухфакторная аутентификация добавляет дополнительный уровень
            безопасности вашей учетной записи, требует больше, чем просто
            пароль для входа.
          </p>
        </v-card-text>

        <!-- action buttons -->
        <v-card-text>
          <v-btn
            color="primary"
            class="me-3 mt-3"
          >
            Сохранить
          </v-btn>
          <v-btn
            color="primary"
            outlined
            class="mt-3"
          >
            Отмена
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline

export default {
  props: {
    player: {
      type: Object,
      default: () => ({}) },
      action: { type: String }
  },

  data() {
    return {
      isCurrentPasswordVisible:false,
      isNewPasswordVisible:false,
      isCPasswordVisible:false,
      currentPassword:'12345678',
      newPassword:'87654321',
      cPassword:'87654321'
    }
  }
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
