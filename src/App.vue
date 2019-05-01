<template>
    <div id="app">
        <router-view class="page"></router-view>
    </div>
</template>

<style lang="sass">
    @import '@/sass/_variables.sass'
    
    html,
    body
        min-height: 100%

    body
        display: flex
        flex-direction: column
        min-height: 100vh
        margin: 0
        padding: 0
        border: 1px solid red
        
    img
        width: 100%
        height: auto

    p
        margin: 0

    // button:focus
    //     outline: none

    *, ::after, ::before
        box-sizing: border-box

    #app
        flex-grow: 1
        display: flex
        flex-direction: column
        // min-width: 320px
        // max-width: 1920px
    //     height: 100%
        // margin: 0 auto
    //     font-family: $font-main
    //     color: $color-text
    //     background-color: $color-lightblue
    //     border: 1px solid red

    .page
        flex-grow: 1
        display: flex
        flex-direction: column

    .container
        max-width: 1565px
        width: 81vw
        margin: 0 auto
        padding: 0
        box-sizing: border-box
        border: 1px solid black

    @media(max-width: $mobile-width)
        .container
            width: 100vw
            padding-left: 15px
            padding-right: 15px
</style>
