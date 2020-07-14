<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/UseCases/navigation/Navigation.vue';

export default {
  components: { Navigation },
};
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Exo:wght@200;300;400,600&display=swap');

    html, body {
        font-family: 'Exo', sans-serif;
        padding: 0;
        margin: 0;
        width: 100%;
        background : $nord6;
        overflow-x: hidden;
    }

    body {
        padding-bottom: 50px;
    }

    button {
        outline : none;
        box-shadow: none;

        &:hover {
            cursor: pointer;
        }

        &:disabled, &[disabled] {
            cursor: not-allowed !important;
            opacity: 0.5;
        }

        &.is--primary {
            border : 2px $nord2 solid;
            background : $nord2;
            color : $nord6;
            text-transform: uppercase;

            &:not([disabled]):hover {
                border-color : $nord3;
                background : $nord3;
            }
        }
    }
</style>
