<template>
    <div class="ac-share-acronym">
        <div
            class="for--badge"
            @click="$emit('close')"
        >
            close
        </div>
        <div>
            <p>
                Break rules, share your own acronym !
            </p>
            <p>
                {{ title }}
            </p>
            <br>
            <div
                class="shareon"
                data-url="https://acronymdeveloper.co"
                :data-title="title"
            >
                <a class="facebook"></a>
                <a class="linkedin"></a>
                <a class="reddit"></a>
            </div>
        </div>
    </div>
</template>

<script>
import initializeShareon from "@amiceli/shareon";

export default {
    props: {
        acronym: { type: String, required: true }
    },
    computed: {
        title() {
            return `acronymdeveloper.co - I'm a ${this.acronym} developer !`;
        }
    },
    mounted() {
        initializeShareon();
    }
};
</script>

<style lang="scss" scoped>
.ac-share-acronym {
    width: 400px;
    height: 200px;
    background: $nord4;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 2px $nord3;

    .for--badge {
        position: absolute;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 6px;
        height: 25px;
        line-height: 25px;
        color: $nord4;
        background: $nord3;
        top: 10px;
        right: 10px;
        cursor: pointer;

        &:hover {
            background: $nord2;
        }
    }

    div {
        display: inline-block;
        text-align: center;
    }
}
</style>