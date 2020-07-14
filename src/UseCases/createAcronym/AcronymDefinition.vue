<template>
    <div
        class="ac-definition"
        :class="{'is--loading' : loading}"
    >
        <HollowDotsSpinner
            color="#5E81AC"
            v-if="loading"
        />
        <div v-if="!loading && definitions.length > 0 && !hasError">
            <b @click="showDefinition = !showDefinition">
                {{ showDefinition === false ? `Show ${definitions.length} definitions` : 'Hide definitions'}}
            </b>
            <div
                v-if="showDefinition"
                class="ac-definition__list"
            >
                <span
                    v-for="def in definitions"
                    :key="def"
                    class="is--def"
                >
                    {{ def }}
                </span>
            </div>
        </div>
        <div v-if="!loading && definitions.length === 0 && !hasError">
            <span class="is--empty">
                No definition found, be the first !
            </span>
        </div>
        <div v-if="hasError">
            <span class="has--error">
                An error occured, we can't fetch definitions...
            </span>
        </div>
    </div>
</template>

<script>
import SearchStore from "./SearchStore";
import { HollowDotsSpinner } from "epic-spinners";

export default {
    store: SearchStore,
    components: { HollowDotsSpinner },
    props: {
        acronym: { type: String, required: true }
    },
    data() {
        return {
            definitions: [],
            loading: false,
            showDefinition: false,
            hasError: false
        };
    },
    async mounted() {
        this.loading = true;
        try {
            const definitions = await this.$store.dispatch(
                "loadAcronymDefinition",
                this.acronym
            );

            this.definitions = Array.from(
                new Set(definitions.map(t => t.replace("-", " ")))
            );
            this.loading = false;
        } catch (e) {
            this.hasError = true;
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.ac-definition {
    display: inline-block;

    &.is--loading {
        text-align: center;
    }

    span {
        display: block;
        color: $nord3;

        &.is--def {
            padding-top: 4px;
            padding-bottom: 4px;
        }

        &.has--error {
            color: $nord11;
        }
    }

    b {
        color: $nord0;
        font-weight: 601;
        padding-bottom: 20px;
        display: inline-block;

        &:hover {
            cursor: pointer;
            
        }
    }
}
</style>