<template>
    <div class="ac-result">

        <div class="ac-result__stats">
            <h1>
                <Counter :value="combinations.length" />
                <small>
                    combinations available
                </small>
            </h1>
            <h1>
                <Counter :value="countDefinitions" />
                <small>
                    definitions found
                </small>
            </h1>
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
            class="ac-result__item"
        >
            <div
                :style="getGridTemplate(true)"
                class="ac-result__item__grid"
            >
                <span
                    v-for="(item, index) in combination"
                    :key="`combination-item-${index}`"
                >
                    {{ item }}
                </span>
            </div>

            <div>
                <AcronymDefinition :acronym="combination.join('')" />
            </div>

            <div>
                <button
                    class="is--primary"
                    @click="share(combination)"
                >
                    share
                </button>
            </div>
        </div>

        <div
            class="ac-result__share"
            :class="{'is--open' : openShareModal}"
        >
            <ShareAcronymModal
                v-if="selectedAcronym !== null"
                @close="openShareModal = false"
                :acronym="selectedAcronym"
            />
        </div>

    </div>
</template>

<script>
import AcronymStore from "./AcronymStore";
import permute from "./permute";
import "@amiceli/shareon/dist/shareon.min.css";
import AcronymDefinition from "./AcronymDefinition.vue";
import ShareAcronymModal from "@/UseCases/shareAcronym/ShareAcronymModal.vue";
import Counter from "@/UI/Counter.vue";
import SearchStore from "./SearchStore";

export default {
    store: AcronymStore,
    components: { AcronymDefinition, ShareAcronymModal, Counter },
    computed: {
        acronyms() {
            return this.$store.state.acronyms;
        },
        combinations() {
            return permute(this.acronyms.map(n => n[0].toUpperCase()));
        },
        countDefinitions() {
            return SearchStore.state.definitions;
        },
        selectedAcronym() {
            if (this.selectedCombination) {
                return this.selectedCombination.join("");
            }

            return null;
        }
    },
    data() {
        return {
            openShareModal: false,
            selectedCombination: null
        };
    },
    mounted() {
        if (this.acronyms.length === 0) {
            this.$router.push("/");
        }
    },
    methods: {
        getGridTemplate(extended) {
            if (extended) {
                const w =
                    this.acronyms.length * 100 +
                    (this.acronyms.length - 1) * 20;
                return {
                    "grid-template-columns": `repeat(${this.acronyms.length}, 100px)`,
                    width: `${w}px`,
                    "grid-gap": "20px"
                };
            } else {
                return {
                    "grid-template-columns": `repeat(${this.acronyms.length}, 100px)`
                };
            }
        },
        share(combination) {
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
    justify-content: center;

    &__stats {
        $gridItem: 400px;
        $gridGap: 20px;
        display: grid;
        grid-template-columns: $gridItem $gridItem;
        grid-gap: 20px;
        width: ($gridItem * 2) + ($gridGap);
        margin-left: auto;
        margin-right: auto;

        h1 {
            font-size: 30px;
            height: 80px;
            line-height: 80px;
            color: $nord3;

            small {
                font-size: 20px;
                padding-left: 7px;
            }
        }
    }

    &__letters {
        display: inline-grid;
        position: relative;
        background: transparent;
        transition: background linear 0.2s;
        grid-gap: 20px;

        &:hover {
            button {
                opacity: 1 !important;
            }
        }

        &:not(.is--small) {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .is--small {
            display: inline-grid;
            grid-gap: 10px;
            margin-top: 20px;
            padding: 4px;

            button {
                opacity: 0.1;
                position: absolute;
                right: 10px;
                top: 15px;
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

    &__item {
        margin-top: 40px;

        &__grid {
            display: grid;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;

            span {
                height: 40px;
                line-height: 40px;
                color: $nord3;
                background: $nord4;
                display: inline-block;
            }
        }
    }

    //

    &__share {
        top: 100px;
        right: -400px;
        position: fixed;
        transition: right linear 0.3s;
        z-index: 2;

        &.is--open {
            right: 0;
        }
    }
}
</style>