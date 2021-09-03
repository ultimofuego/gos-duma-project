<template>
<div class="container">
    <div class="sidenav_wrapper">
        <div class="sidenav">
            <h3>Личный кабинет</h3>
            <a href="#">Мой профиль</a>
            <a href="#">Мои события</a>
            <a href="#">Мои документы</a>
            <a href="/">Мои пространства</a>
            <a href="#">Выйти</a>
        </div>
    </div>
    <div class="main">
        <h3>Мои пространства</h3>
        <router-view/>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
    name: "main-admin-page",
})
</script>

<style scoped lang="scss">
    $sidenav-maincolor: white;
    $sidenav-secondcolor: white;
    $sidenav-textcolor: #749DC3;
    $sidenav-textcolor-active: rgb(63, 106, 146);

    .container {
        font-size: 20px;
        min-height: 100vh;
    }

    .main {
        padding-top: 25px;
        color: #0e2538;
        width: 100%;
        padding-left: 360px;
        min-height: 100vh;
        color: $sidenav-textcolor;
        h3 {
            font-weight: 400;
        }
    }
    
    .sidenav_wrapper {
        position: fixed;
        left: 0px;
        width: 300px;
        height: 100%;
    }

    .sidenav {
        width: 300px;
        height: 100%;
        z-index: 1;
        background: lighten(#9CC2E6, 22%);;
        overflow-x: hidden;
        padding-top: 25px;
        padding-left: 40px;
        color: $sidenav-textcolor;
        position: absolute;
        top: 0;
        -webkit-box-shadow: 15px 0px 8px -3px rgba(50, 50, 50, 0.15);
        -moz-box-shadow:    15px 0px 8px -3px rgba(50, 50, 50, 0.15);
        box-shadow:         0px 0px 20px -3px rgba(50, 50, 50, 0.15);
        h3 {
            font-weight: 500;
            padding-bottom: 25px;
        }

        a {
            padding-bottom: 10px;
            padding-top: 10px;
            text-decoration: none;
            font-size: 20px;
            font-weight: 500;
            display: flex;
            color: $sidenav-textcolor;
            position: relative;
            width: 90%;
            transition: 0.1s;
            &:after {
                content: "";
                display: block;
                background-color: darken($sidenav-textcolor, 20%);
                width: 2px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                opacity: 0;
            }
            &:hover {
                color: darken($sidenav-textcolor, 20%);
                &:after {
                    content: "";
                    display: block;
                    background-color: darken($sidenav-textcolor, 20%);
                    width: 2px;
                    height: 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                    opacity: 1;
                    transition: 0.1s;
                    
                }
            }
        }
    }


    @media screen and (max-height: 450px) {
        .sidenav { padding-top: 15px; }
        .sidenav a { font-size: 18px; }
    }
</style>
