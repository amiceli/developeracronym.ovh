<template>
    <div class="ac-result">
        <div
            class="ac-result__share"
            :class="{'is--open' : openShareModal}"
        >
            <div
                class="for--badge"
                @click="openShareModal = false"
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
        <div
            class="ac-result__letters"
            :style="getGridTemplate()"
        >
            <span
                v-for="(acronym, index) in acronyms"
                :key="index"
            >
                {{ acronym }}
            </span>
        </div>
        <p>
            Generated acronyms
        </p>
        <div
            v-for="(combination, index) in combinations"
            :key="`combination-${index}`"
        >
            <div
                class="ac-result__letters is--small"
                :style="getGridTemplate(true)"
            >
                <span
                    v-for="(item, index) in combination"
                    :key="`combination-item-${index}`"
                >
                    {{ item }}
                </span>
                <div>
                    <button
                        class="is--primary"
                        @click="share(combination)"
                    >
                        share
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import AcronymStore from "./AcronymStore";
import permute from "./permute";
import initializeShareon from "shareon";
import "shareon/dist/shareon.min.css";

export default {
    store: AcronymStore,
    computed: {
        acronyms() {
            return this.$store.state.acronyms;
        },
        combinations() {
            return permute(this.acronyms.map(n => n[0].toUpperCase()));
        },
    },
    data() {
        return { openShareModal: false, selectedCombination: null };
    },
    mounted() {
        if (this.acronyms.length === 0) {
            this.$router.push("/");
        }
    },
    methods: {
        getGridTemplate(extended) {
            if (extended) {
                return {
                    "grid-template-columns": `repeat(${this.acronyms.length}, 100px) 100px`
                };
            } else {
                return {
                    "grid-template-columns": `repeat(${this.acronyms.length}, 100px)`
                };
            }
        },
        share(combination) {
            if (this.openShareModal === false) {
                initializeShareon();
            }

            this.openShareModal = true;
            this.selectedCombination = combination;
        }
    }
};
</script>

<style lang="scss" scoped>
.ac-result {
    text-align: center;
    padding-bottom: 50px;
    position: relative;

    &__share {
        $modalWidth: 400px;

        position: absolute;
        top: 100px;
        right: -$modalWidth;
        width: $modalWidth;
        height: 200px;
        background: $nord4;
        transition: right linear 0.3s;
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

        &.is--open {
            right: 0;
        }
    }

    &__letters {
        display: inline-grid;
        grid-gap: 10px;

        &:not(.is--small) {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        &.is--small {
            margin-top: 20px;
            padding: 4px;
            background: transparent;
            transition: background linear 0.2s;

            button {
                opacity: 0.1;
            }

            &:hover {
                background: $nord10;

                button {
                    opacity: 1;
                }
            }
        }

        span {
            height: 40px;
            line-height: 40px;
            color: $nord3;
            background: $nord4;
            display: inline-block;
        }

        div {
            line-height: 40px;

            button {
                text-transform: lowercase !important;
            }
        }
    }
}
</style>