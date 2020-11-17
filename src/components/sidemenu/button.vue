<template>
    <v-list-item  @click.stop="onClickFunction()">
        <v-list-item-action>
            <slot name="icon"></slot>
        </v-list-item-action>
        <v-list-item-title><slot name="title"></slot></v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SideButtonV extends Vue {
    @Prop() onClickFunction!: any;
}
</script>

<style lang="scss" scoped></style>
