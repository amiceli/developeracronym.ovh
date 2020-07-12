<template>
    <div class="ac-home">
        <h2>Your technologies, your acronym</h2>
        <br />
        <AcronymGenerator />
    </div>
</template>

<script>
import AcronymGenerator from '@/UseCases/createAcronym/AcronymGenerator.vue';

export default {
  name: 'Home',
  components: {
    AcronymGenerator,
  },
};
</script>

<style lang="scss" scoped>
.ac-home {
    text-align: center;
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;

    h2 {
        display: inline-block;
        margin-bottom: 30px;
    }
}
</style>
