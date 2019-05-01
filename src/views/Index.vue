<template>
    <div class="page_main">
        <app-header></app-header>

        <app-districts></app-districts>

        <app-news></app-news>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Districts from '@/components/Districts.vue'
    import News from '@/components/News.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'index',
        components: {
            'app-header': Header,
            'app-districts': Districts,
            'app-news': News,
            'app-footer': Footer
        }
    }
</script>

<style lang="sass">
    .page_main
        

</style>
