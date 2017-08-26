<template>
    <div class="modal" v-if="active" @click.self="close">
        <header>
            <h2>{{title}}</h2>
        </header>
        <section>
            <component :is="component" :data="data"></component>
        </section>
    </div>
</template>

<script>
import Hub from '../events/Hub';
import ExampleModalBody from './ExampleModalBody.vue';

export default {
    data() {
        active: false,
        data: {},
        title: null,
    },

    components: {
        ExampleModalBody
    },

    destroyed() {
        Hub.$off('set-modal-data', this.set);
        Hub.$off('open-modal', this.open);
    },

    methods: {
        close() {
            this.active = false;
        },

        open() {
            this.active = true;
        },

        set(data, title) {
            this.data = data;
            this.title = title;
            this.component = title.split(' ').join('-').toLowerCase(); // of course you could just pass the component through the method too...
        }
    },

    mounted() {
        this.$nextTick(function () {
            Hub.$on('set-modal-data', this.set);
            Hub.$on('open-modal', this.open);
        }.bind(this));
    }
}
</script>