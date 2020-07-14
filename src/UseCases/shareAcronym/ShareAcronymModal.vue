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
            <br>
            <div
                class="shareon"
                data-title="acronymdeveloper.ovh - your technologies, your acronym"
            >
                <a
                    class="facebook"
                    data-title="Custom WhatsApp title"
                >
                </a>
                <a class="linkedin"></a>
                <a class="reddit"></a>
            </div>
        </div>
    </div>
</template>

<script>
// import initializeShareon from "shareon";
export default {
    mounted() {
        // initializeShareon();
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