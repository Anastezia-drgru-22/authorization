<template>

  <header class="header">
    <div class="container">
      <a href="#" class="logo">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 45L18 25L30 45H5Z" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linejoin="round"/>
          <path d="M15 45L28 18L45 45H15Z" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </header>

  <section class="login" v-if="!isLoggedIn">
    <div class="container">
      <div class="login-bg">
        <h1>Авторизация</h1>
        <form class="login-form" @submit.prevent="login">
          <label class="login-form-group">
            <div class="input-group-address" v-if="authType === 'email'">
              <span class="input-name">E-mail</span>
              <input v-model.trim="email" type="text" placeholder="gora@studio.ru"
                     autocomplete="email" @input="clearError('email')" :class="getInputClass('email')"/>
              <div class="error" id="error-email" v-if="formSubmitted && errors.email">
                <svg class="error-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="white" stroke="red" stroke-width="2"/>
                  <line x1="12" y1="6.5" x2="12" y2="13" stroke="red" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="12" cy="16.5" r="1.5" fill="red"/>
                </svg>
                <span>{{ errors.email }}</span>
              </div>
            </div>
            <div class="input-group-address" v-else>
              <span class="input-name">Телефон</span>
              <input v-model="phone" v-mask="'+7 (###) ###-##-##'" type="tel" placeholder="+7 (999) 999-99-99"
                     autocomplete="tel" @input="clearError('phone')" :class="getInputClass('phone')"/>
              <div class="error" id="error-email" v-if="formSubmitted && errors.phone">
                <svg class="error-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="white" stroke="red" stroke-width="2"/>
                  <line x1="12" y1="6.5" x2="12" y2="13" stroke="red" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="12" cy="16.5" r="1.5" fill="red"/>
                </svg>
                <span>{{ errors.phone }}</span>
              </div>
            </div>
          </label>
          <label class="login-form-group login-form-group-password">
            <span class="input-name">Пароль</span>
            <input v-model="password" :type="passwordType" placeholder="Введите пароль" autocomplete="current-password"
                   @input="clearError('password')" :class="getInputClass('password') "/>
            <button type="button" class="toggle-password" @click="passwordVisible = !passwordVisible"
                    aria-label="Показать или скрыть пароль">
              <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   viewBox="0 0 24 24" stroke="#809ea3" stroke-width="2">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   viewBox="0 0 24 24" stroke="#809ea3" stroke-width="2">
                <path
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.543-7a10.05 10.05 0 012.408-4.157M6.6 6.6A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.422 5.196M3 3l18 18"/>
              </svg>
            </button>
            <div class="error" id="error-email" v-if="formSubmitted && errors.password">
              <svg class="error-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="white" stroke="red" stroke-width="2"/>
                <line x1="12" y1="6.5" x2="12" y2="13" stroke="red" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="16.5" r="1.5" fill="red"/>
              </svg>
              <span>{{ errors.password }}</span>
            </div>
          </label>
          <div class="toggle-type" @click="toggleAuthType">
            {{ toggleLabel }}
          </div>
          <button type="submit" class="btn">Войти</button>
        </form>
      </div>
    </div>
  </section>

  <section class="account" v-else>
    <div class="container">
      <div class="account-bg">
        <h2 class="account-title">Добро пожаловать! 🔥</h2>
        <p class="account-description">Улыбнитесь, Вы вошли! 😊</p>
        <iframe class="account-video"
                src="https://rutube.ru/play/embed/2c15ed666437f3d08d7624585e7c015c/"
                frameBorder="0" allow="clipboard-write; autoplay" allowFullScreen>
        </iframe>
        <button class="btn btn-account" @click="logout">Выйти</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      phone: '',
      password: '',
      isLoggedIn: false,
      authType: 'email',
      errors: {},
      formSubmitted: false,
      passwordVisible: false,
    }
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    this.updateBodyClass()
  },
  watch: {
    isLoggedIn() {
      this.updateBodyClass()
    }
  },

  computed: {
    emailInputClass() {
      return {'input-error': this.formSubmitted && this.errors.email}
    },
    phoneInputClass() {
      return {'input-error': this.formSubmitted && this.errors.phone}
    },
    passwordInputClass() {
      return {'input-error': this.formSubmitted && this.errors.password}
    },

    passwordType() {
      return this.passwordVisible ? 'text' : 'password';
    },

    toggleLabel() {
      return this.authType === 'email' ? 'Войти по телефону' : 'Войти по email'
    }
  },

  methods: {
    toggleAuthType() {
      this.authType = this.authType === 'email' ? 'phone' : 'email'
      this.errors = {}
      this.email = ''
      this.phone = ''
      this.password = ''
      this.formSubmitted = false
    },

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    validatePhone(phone) {
      const phoneRegex = /^\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}$/
      return phoneRegex.test(phone)
    },

    getInputClass(field) {
      return this.formSubmitted && this.errors[field] ? 'input-error' : ''
    },

    clearError(field) {
      if (this.errors[field]) {
        this.$set(this.errors, field, null)
      }
    },

    login() {
      this.formSubmitted = true
      this.errors = {}

      const isEmail = this.authType === 'email'
      const isPhone = this.authType === 'phone'

      // Проверка email/телефона
      if (isEmail) {
        if (!this.email) {
          this.errors.email = 'Пожалуйста, введите e-mail.'
        } else if (!this.validateEmail(this.email)) {
          this.errors.email = 'Неверный формат e-mail.'
        } else if (this.email !== 'gora@studio.ru') {
          this.errors.email = 'Неверный e-mail.'
        }
      } else if (isPhone) {
        if (!this.phone) {
          this.errors.phone = 'Пожалуйста, введите номер телефона.'
        } else if (!this.validatePhone(this.phone)) {
          this.errors.phone = 'Номер телефона введён неверно.'
        } else if (this.phone !== '+7 (921) 123-13-13') {
          this.errors.phone = 'Неверный номер телефона.'
        }
      }

      if (!this.password) {
        this.errors.password = 'Пожалуйста, введите пароль.'
      } else if (this.password !== '2024') {
        this.errors.password = 'Неверный пароль.'
      }

      if (Object.keys(this.errors).length > 0) {
        return
      }

      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('password', this.password)

      if (isEmail) {
        localStorage.setItem('email', this.email)
      } else {
        localStorage.setItem('phone', this.phone)
      }
    },

    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
    },

    updateBodyClass() {
      document.body.classList.remove('login-mode', 'account-mode')
      document.body.classList.add(this.isLoggedIn ? 'account-mode' : 'login-mode')
    }
  }
}
</script>


<style>

@font-face {
  font-family: 'TekturRegular';
  src: url("@/assets/fonts/TekturReg.ttf");
}

@font-face {
  font-family: 'TekturMed';
  src: url("@/assets/fonts/TekturMed.ttf");
}

@font-face {
  font-family: 'TekturBold';
  src: url("@/assets/fonts/TekturBold.ttf");
}

* {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: 'TekturMed', sans-serif;
}

body.login-mode,
body.account-mode {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

body.login-mode {
  background-image: url('@/assets/images/bg_login.jpeg');
}

body.account-mode {
  background-image: url('@/assets/images/bg_account.gif');
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  padding: 20px 0;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  text-decoration: none;
}

.login {
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.login .container {
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.login-bg {
  background-color: rgba(255, 255, 255);
  width: 100%;
  border-radius: 20px;
  border: none;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.login h1 {
  color: #49767c;
  text-align: center;
  font-family: 'TekturBold', sans-serif;
  font-size: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
}

.login-form-group, .input-group-address {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}

.input-name {
  font-size: 17px;
  font-weight: bold;
  color: #49757c;
  padding-left: 10px;
}

.login-form input {
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #49757c;
  border-radius: 20px;
  padding: 17px;
  font-size: 14px;
  font-family: 'TekturRegular', sans-serif;
  color: #49757c;
  box-sizing: border-box;
}

.login-form input::placeholder {
  color: rgba(73, 117, 124, 0.7);
  font-family: 'TekturRegular', sans-serif;
}

.login-form input:focus {
  outline: none;
  border-color: #49757c;
  box-shadow: 0 0 7px rgba(73, 117, 124, 0.5);
}

.login-form .input-error {
  border: 2px solid red;
  outline: none;
}

.login-form .input-error:focus {
  border: 2px solid red;
  outline: none;
  box-shadow: 0 0 4px rgba(255, 0, 0, 0.5);
}

.error {
  color: red;
  font-size: 15px;
  align-items: center;
  gap: 10px;
  display: flex;
}

.error-icon {
  flex-shrink: 0;
}

.toggle-password {
  position: absolute;
  right: 20px;
  top: 55%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #49757c;
}

.login-form-group-password {
  position: relative;
}

.btn {
  width: 200px;
  border: none;
  background: #49757c;
  border-radius: 20px;
  padding: 17px;
  font-size: 16px;
  color: white;
  margin-top: 10px;
  font-family: 'TekturMed', sans-serif;
  cursor: pointer;
}

.btn:hover {
  box-shadow: 0 0 5px rgba(73, 117, 124, 0.5);
}


.toggle-type {
  color: #809ea3;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-bottom: 10px;
}

.account {
  display: flex;
  padding: 20px 0;
}

.account .container {
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  background-color: rgb(255 223 132);
  border-radius: 20px;
  border: none;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 0 5px rgba(255, 223, 132, 0.5);
}

.account-title {
  color: #7b2121;
  font-size: 24px;
}

.account-description {
  color: #7b2121;
  font-size: 16px;
}

.account-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  border: none;
}

.btn-account {
  background: #7b2121;
}

.btn-account:hover {
  box-shadow: 0 0 8px rgba(123, 33, 33, 0.8);
}

</style>
