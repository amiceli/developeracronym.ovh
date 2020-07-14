<template>
    <div class="ac-generator">
        <div class="ac-generator__autocomplete">
            <input
                type="text"
                v-model="acronym"
                :placeholder="acronyms.length === limit ? '5 acronyms is enough' : 'enter a language or a framework name'"
                @keyup.enter="addAcronym()"
                @keyup="searchTopics()"
                :disabled="acronyms.length === limit"
            />
            <div v-if="(topics.length > 0 || isLoading) && !rateLimit">
                <HollowDotsSpinner
                    v-if="isLoading"
                    color="#4C566A"
                />
                <span
                    v-for="topic in topics"
                    :key="topic"
                    @click="addTopic(topic)"
                >
                    {{ topic }}
                </span>
            </div>
            <div
                v-if="rateLimit"
                class="has--error"
            >
                <span>
                    Search limit execeeded, try later...
                </span>
            </div>
        </div>
        <br>
        <p v-if="acronyms.length === 0">
            You need almost 3 technologies
        </p>
        <div
            v-else
            class="ac-generator__choices"
        >
            <span
                v-for="(ac, index) in acronyms"
                :key="index"
                class="ac-generator__choices__item"
            >
                {{ ac }}

                <span @click="removeAcronym(ac)">
                    delete
                </span>
            </span>
        </div>
        <br>
        <button
            class="is--primary"
            @click="reset()"
        >
            reset
        </button>
        <button
            :disabled="acronyms.length < 3"
            class="is--primary"
            @click="generate()"
        >
            generate
        </button>
    </div>
</template>

<script>
import AcronymStore from "./AcronymStore";
import SearchStore from "./SearchStore";
import { HollowDotsSpinner } from "epic-spinners";

export default {
    store: AcronymStore,
    components: { HollowDotsSpinner },
    data() {
        return {
            acronym: "",
            focused: false
        };
    },
    computed: {
        acronyms() {
            return this.$store.state.acronyms;
        },
        limit() {
            return 4;
        },
        topics() {
            return SearchStore.state.topics;
        },
        isLoading() {
            return SearchStore.state.loading;
        },
        rateLimit() {
            return SearchStore.state.rateLimit;
        }
    },
    methods: {
        addTopic(topic) {
            this.$store.commit("addAcronym", topic);
            this.acronym = "";
            SearchStore.commit("clear");
        },
        addAcronym() {
            this.$store.commit("addAcronym", this.acronym);
            this.acronym = "";
            SearchStore.commit("clear");
        },
        removeAcronym(acronym) {
            this.$store.commit("removeAcronym", acronym);
        },
        reset() {
            this.$store.commit("clear");
        },
        generate() {
            this.$router.push({ name: "acronym-result" });
        },
        searchTopics() {
            if (this.acronym.length >= 3) {
                SearchStore.dispatch("searchTopicsOnGithub", this.acronym);
            }
        }
    }
};
</script>

<style scoped lang="scss">
$itemSize: 40px;

.ac-generator {
    text-align: center;

    &__choices {
        width: 400px;
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 20px;

        &__item {
            display: block;
            text-align: left;
            font-size: 16px;
            height: $itemSize;
            line-height: $itemSize;
            position: relative;

            &:hover {
                background: $nord5;
            }

            span {
                height: $itemSize - 20px;
                padding-left: 5px;
                padding-right: 5px;
                line-height: $itemSize - 20px;
                position: absolute;
                top: 10px;
                right: 5px;
                background: $nord5;
                color: $nord1;
                text-align: center;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                border-radius: 4px;

                &:hover {
                    background: $nord1;
                    color: $nord5;
                }
            }
        }
    }

    &__autocomplete {
        position: relative;
        width: 400px;
        display: inline-block;
        margin-bottom: 20px;

        input {
            width: 100%;
            height: 60px;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            background: $nord5;
            border: 2px solid $nord4;
            padding-left: 15px;
            font-size: 16px;

            &:focus {
                border-color: $nord3;
            }
        }

        div {
            position: absolute;
            z-index: 2;
            background: white;
            box-shadow: 0 0 2px $nord4;
            width: 100%;
            height: 200px;
            overflow: scroll;

            &.has--error {
                height: unset;
                span {
                    color: $nord11;
                }
            }

            span {
                display: block;
                text-align: left;
                box-sizing: border-box;
                width: 100%;
                height: 40px;
                line-height: 40px;
                color: $nord3;
                padding-left: 20px;

                &:hover {
                    background: $nord4;
                    cursor: pointer;
                }
            }
        }
    }

    button {
        width: 150px;
        height: 44px;
        box-sizing: border-box;

        &:last-of-type {
            margin-left: 10px;
        }
    }
}
</style>
