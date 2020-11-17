
<template>
    <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="relative w-32 h-32 text-gray-600 hover:text-black" text icon tile small v-on="on" v-bind="attrs" @click.stop="onClickFunction()">
                <slot name="icon"></slot>
            </v-btn>
        </template>
        <span><slot name="tooltip"></slot></span>
    </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MapnavButtonV extends Vue {
    @Prop() onClickFunction!: any;
}
</script>

<style lang="scss" scoped></style>
