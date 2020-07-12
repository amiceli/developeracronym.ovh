<template>
  <div class="ac-navigation">
      <h1>
          Developer acronym
      </h1>
      <div class="ac-navigation__menu">
          <router-link to="/">
            home
          </router-link>
          <router-link to="/about">
            about
          </router-link>
          <a href="https://github.com">
            <i class="devicon-github-plain"></i>
            github
          </a>
      </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
    .ac-navigation {
        background : $nord0;
        width: 100%;
        height: 300px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        h1 {
            color : $nord6;
            text-align: center;
            margin: 0;
        }

        &__menu {
            position: absolute;
            right: 10px;
            top: 10px;
            text-transform: uppercase;
            padding-right: 20px;

            a {
                color : $nord4;
                text-decoration: none;
                font-size: 20px;
                margin-left: 10px;

                i {
                    position: relative;
                    top: 1px;
                }

                &:hover {
                    color : $nord7;
                }
            }
        }
    }
</style>
