<template>
    <div class="ac-counter">
        {{ counter }}
    </div>
</template>

<script>
export default {
    props: {
        value: { type: Number, required: true }
    },
    data() {
        return { counter: 0 };
    },
    mounted() {
        this.increment();
    },
    watch : {
        value () {
            this.count = 0
            this.increment()
        }
    },
    methods: {
        increment() {
            if (this.counter <= this.value) {
                this.counter++;
                setTimeout(() => {
                    this.increment();
                }, 1);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ac-counter {
    display: inline-block;
}
</style>