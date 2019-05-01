<template>
    <div class="districts parallax">
        <div 
            class="district parallax__layer" 
            :class="{'district_main': i === 0}"
            v-for="(district, i) in districtsData"
            :key="'district_id-' + i"
            :style="{backgroundImage: 'url(img/' + district.img + ')'}">
            <!-- <div 
                class="district__back"
                :class="{'district__back_main': i === 0}"
                :style="{backgroundImage: 'url(img/' + district.img + ')'}"> -->
                <div 
                    class="container district__container"
                    :class="{'district__container_main': i === 0}">
                    <div 
                        class="district__content"
                        :class="{'district__content_main': i === 0}">
                    </div>
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'districts',
        data() {
            return {
                height: '',
                scrollSpeed: 5,
                mobileWidth: 991
            }
        },
        computed: {
            ...mapGetters([
                'districts'
            ]),
            districtsData() {
                return this.districts
            }
        },
        mounted() {
            this.addParallax()
            window.addEventListener('resize', this.addParallax);
        },
        updated() {
            this.addParallax()
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.addParallax)
            window.removeEventListener('scroll', this.setTranslateY)
        },
        methods: {
            setHeight() {
                let parallax = document.querySelector('.parallax')
                let page = document.querySelector('.page_main')
                let windowHeight = window.innerHeight
                let pageHeight = page.clientHeight
                this.height = pageHeight - (pageHeight - windowHeight) / this.scrollSpeed
                parallax.style.height = this.height + 'px'
            },
            setTranslateY() {
                let parallaxLayers = document.querySelectorAll('.parallax__layer')
                for(let i = 0; i < parallaxLayers.length; i++) {
                    parallaxLayers[i].style.transform = 'translateY(' + (window.pageYOffset / this.scrollSpeed) + 'px)'
                }
            },
            addParallax() {
                if (window.innerWidth > this.mobileWidth) {
                    this.setHeight()
                    window.addEventListener('scroll', this.setTranslateY)
                } else {
                    window.removeEventListener('scroll', this.setTranslateY)
                }
            }
        }
    }
</script>

<style lang="sass">
    .parallax
        position: absolute
        width: 100%
        background-color: green

    .districts
        display: flex
        flex-direction: column

    .district
        flex-grow: 1
        width: 100%
        height: 100%
        background-position: center
        background-repeat: no-repeat
        background-size: cover
    
    // .district__back
    //     width: 100%
    //     height: 100%
    //     background-position: center
    //     background-repeat: no-repeat
    //     background-size: cover
</style>