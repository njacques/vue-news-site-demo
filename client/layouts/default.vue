<template>
  <div>
    <nav 
      class="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link 
          class="navbar-item"
          to="/"
        >
          YANS!
        </nuxt-link>
        
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <nuxt-link
            to="/"
            class="navbar-item"
          >Top</nuxt-link>
          <nuxt-link
            to="/new"
            class="navbar-item"
          >New</nuxt-link>
          <nuxt-link
            to="/submit"
            class="navbar-item"
          >Submit</nuxt-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link
                v-if="!$auth.loggedIn"
                to="/register"
                class="button is-primary"
              >
                <strong>Register</strong>
              </nuxt-link>
              <nuxt-link
                v-if="!$auth.loggedIn"
                to="/login"
                class="button is-light"
              >Log in</nuxt-link>
              <button
                v-else
                class="button is-light"
                @click="$auth.logout()"
              >Log out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>
