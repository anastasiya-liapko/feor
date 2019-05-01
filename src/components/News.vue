<template>
    <div class="news">
        <div class="container news__container">
            <div class="activities news__block">
                <h3 class="news__block-title">Деятельность</h3>

                <a 
                    href="#" 
                    class="activity news__item news__item_type_activities news__item_design_blue"
                    v-for="(activity, i) in activitiesData"
                    :key="'activity_id-' + i"
                    :class="{'news__item_size_large': checkActivitySize(i), 'news__item_size_small': !checkActivitySize(i)}">
                    <div class="news__item-img-wrapper">
                        <img 
                            class="news__item-img" 
                            :src="'img/' + activity.img" alt="">
                    </div>
                    <div class="news__item-descr">
                        <p class="news__item-title">{{ activity.name }}</p>
                    </div>
                </a>
            </div>

            <div class="blog-posts news__block">
                <h3 class="news__block-title">Блог раввина</h3>

                <a
                    href="#" 
                    class="blog-post news__item news__item_type_events news__item_design_white"
                    v-for="(blogPost, i) in blogPostsData"
                    :key="'blog-post_id-' + i"
                    :class="{'news__item_size_large': checkBlogPostSize(i), 'news__item_size_small': !checkBlogPostSize(i)}">
                    <div 
                        class="news__item-img-wrapper news__item-img-wrapper_decor"
                        v-if="blogPost.img !== ''">
                        <img 
                            class="news__item-img" 
                            :src="'img/' + blogPost.img" 
                            alt="">
                        <span class="news__item-img-decor">блог президента</span>
                    </div>
                    <div class="news__item-descr">
                        <p class="news__item-date">{{ blogPost.date }}</p>
                        <p class="news__item-title">{{ blogPost.name }}</p>
                    </div>
                </a>
            </div>

            <div class="events news__block">
                <h3 class="news__block-title">События</h3>

                <div 
                    class="event news__item news__item_type_events news__item_design_lightblue"
                    v-for="(event, i) in eventsData"
                    :key="'event_id-' + i"
                    :class="{'news__item_size_large': checkEventsSize(i), 'news__item_size_small': !checkEventsSize(i)}">
                    <div 
                        class="news__item-img-wrapper"
                        v-if="event.img !== ''">
                        <img 
                            class="news__item-img" 
                            :src="'img/' + event.img" 
                            alt="">
                    </div>
                    <div class="news__item-descr">
                        <p class="news__item-date">{{ event.date }}</p>
                        <p class="news__item-title">{{ event.name }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'news',
        computed: {
            ...mapGetters([
                'activities',
                'blogPosts',
                'events'
            ]),
            activitiesData() {
                return this.activities
            },
            blogPostsData() {
                return this.blogPosts
            },
            eventsData() {
                return this.events
            }
        },
        methods: {
            checkActivitySize(i) {
                if (i === 0 || i === 5) {
                    return true
                } else {
                    return false
                }
            },
            checkBlogPostSize(i) {
                if (i === 0) {
                    return true
                } else {
                    return false
                }
            },
            checkEventsSize(i) {
                if (i === 4 || i === 9 || i === 14 || i === 17 || i === 22) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style lang="sass">
    @import '@/sass/_variables.sass'

    .news
        z-index: 1
        position: relative
        // height: auto
        margin-top: 242px
        margin-bottom: 260px
        pointer-events: none
        // background-color: white

    .news__block
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        width: 37.2vw
        margin-left: auto
        pointer-events: auto

    .news__block-title
        width: 100%
        margin-top: 2.5vw
        margin-bottom: 2.5vw
        font-family: $font-main
        font-size: 2.1vw
        font-weight: 700
        line-height: 1
        color: $color-text

    .news__item
        position: relative
        display: flex
        flex-direction: column
        margin-bottom: 1.5vw
        text-decoration: none
        overflow: hidden

    .news__item_size_large
        width: 37.2vw
        height: auto

    .news__item_size_small
        width: 17.8vw
        min-height: 15.7vw
        height: auto

    .news__item-img
        object-fit: cover

    .news__item-descr
        flex-grow: 1
        display: flex
        flex-direction: column
        align-items: flex-start
        justify-content: center

    // blog-posts
    .news__item-img-wrapper_decor
        position: relative

    .news__item-img-decor
        position: absolute
        right: 2.3vw
        bottom: 1.7vw
        display: block
        width: 13.5vw
        height: 2.6vw
        font-family: $font-main
        font-size: 1vw
        font-weight: 700
        line-height: 2.6vw
        text-align: center
        text-transform: uppercase
        color: $color-text
        background-color: $color-transparent
        border: 2px solid $color-text

    // events
    .news__item_type_events
        .news__item-descr
            justify-content: start
            padding: 1.8vw
            padding-top: 30px
            padding-bottom: 30px
            padding-right: 2.4vw
        .news__item-date
            margin-bottom: 0.5vw
            font-family: $font-main
            font-size: 1vw
            font-weight: 400
            line-height: 1
        .news__item-title
            margin-bottom: 0
            font-family: $font-main
            font-weight: 700
            line-height: 1.33
        &.news__item_size_large
            .news__item-img-wrapper,
            .news__item-img
                width: 37.2vw
                height: 14.8vw
            .news__item-title
                font-size: 1.3vw
        &.news__item_size_small
            .news__item-img-wrapper,
            .news__item-img
                width: 17.8vw
                height: 15.7vw
            .news__item-title
                font-size: 1.2vw

    // activities
    .news__item_type_activities
        .news__item-title
            margin-bottom: 0
            font-family: $font-main
            font-weight: 700
            line-height: 1.33
        &.news__item_size_large
            .news__item-img-wrapper,
            .news__item-img
                width: 37.2vw
                height: 14.8vw
            .news__item-descr
                padding-top: 2.6vw
                padding-bottom: 2.6vw
                padding-left: 3.9vw
            .news__item-title
                font-size: 1.5vw
        &.news__item_size_small
            .news__item-img-wrapper,
            .news__item-img
                width: 17.8vw
                height: 10.7vw
            .news__item-descr
                padding-left: 1.8vw
            .news__item-title
                font-size: 1.2vw

    // design
    .news__item_design_blue,
    .news__item_design_blue:hover
        color: $color-text
        background-color: $color-blue-transparent

    .news__item_design_white,
    .news__item_design_white:hover
        color: $color-lightblue
        background-color: $color-text
        .news__item-date
            color: $color-grey

    .news__item_design_lightblue,
    .news__item_design_lightblue:hover
        background-image: $color-gradient-lightblue
        .news__item-date
            color: $color-text
            opacity: 0.74
        .news__item-title
            color: $color-text

    .news__item_design_red,
    .news__item_design_red:hover
        background-image: $color-gradient-red
        .news__item-date
            color: $color-text
        .news__item-title
            color: $color-text

    .news__item_design_transparent,
    .news__item_design_transparent:hover
        background-color: $color-transparent
        border: 5px solid $color-text
        .news__item-date
            color: $color-text
        .news__item-title
            color: $color-text

    .news__item_design_img
        position: relative
        background-color: $color-transparent
        .news__item-descr
            position: absolute
            top: 0
            left: 0
        .news__item-date
            color: $color-text
        .news__item-title
            color: $color-text
</style>





