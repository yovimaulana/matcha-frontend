<template>
    <div :class="myBgColorData+' myBgLayout '+myTextColorData">
        <div :class="myBgColorData+ ' '+'p-grid p-ai-stretch nested-grid p-nogutter'" style="margin:0;">
            <Sidebar v-model:visible="visibleLeft" :class="myBgColorData+' '+myTextColorData" style="margin:0">
                <div class="animate__animated animate__slideInLeft animate__faster" style="margin:0">
                    <div class="p-grid p-jc-center p-d-flex p-flex-column p-ac-center ">
                        <img src="../assets/matcha.png" class="hvr-bob p-mt-4"
                            v-tooltip.right="{value: this.matchaMessage[Math.floor(Math.random()*this.matchaMessage.length)], class: 'custom-error'}"
                            style="width: 20%; height: 18%;" alt="" srcset="">

                    </div>
                    <div class="p-grid p-jc-center  p-ac-center " style="margin-top: -7%;">
                        <h2 class="" style="color: #78b34d; font-weight: 700;">MatchA</h2>
                    </div>
                    <NavigationMenu @showSideBar="sideBar()"/>  
                </div>
            </Sidebar>


            <div :class="contentClass + ' '+ myBgColorData">

                <div class="p-col-12">
                    <br>
                    <div>

                        <div class="p-d-flex p-ai-stretch p-jc-between">
                            <Button icon="pi pi-bars" @click="sideBar()"
                                class="p-button-text p-button-lg  p-button-secondary p-button-rounded p-ml-4" />
                            <div>

                                <Button :icon="darklightIcon"
                                    class="p-button-text p-button-rounded  p-button-secondary p-button-lg p-mr-2"
                                    @click="darklight() " />
                                <Button icon="pi pi-user" @click="toggle"
                                    class="p-button-text p-button-rounded p-button-secondary p-mr-6 p-button-lg" />

                                <OverlayPanel ref="op" :class="myBgColorData+' '+myTextColorData">

                                    <div :class="myTextColorData+ '  '"
                                        style="cursor: pointer;font-size: small;font-weight: 600; border-radius: 30px; text-decoration: none;width: 100%;">

                                        <div>
                                            <i class="pi pi-user p-mr-2 "></i>
                                            {{!currentUser ? '' : currentUser.name}} <br>
                                            <hr>

                                            <div @click="logout">
                                                <i class="pi pi-sign-out p-mr-2 "></i>
                                                Logout
                                            </div>

                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                        </div>
                        <br>
                    </div>

                </div>

                <div class="p-col-10  p-offset-1" style=" min-height: calc(100vh - (90px + 66px));">
                    <div class="">
                        <router-view v-slot="{ Component }"  >
                            <transition name="slide" mode="out-in">
                                <component :is="Component" :key="$route.path"></component>
                            </transition>
                        </router-view>                        
                    </div>
                </div>
            </div>

        </div>
        <div :class="myBgColorData+' '+myTextColorData+' p-col-12'" style="bottom: 0;   width: 100%; ">
            <div class="p-d-flex p-ai-stretch p-jc-between ">
                <p class="p-ml-6">COPYRIGHT © 2022 <span style="color: #00aeef;font-weight: 700;">B</span><span
                        style="color: #8cc63f;font-weight: 700;">P</span><span
                        style="color: #f7941e;font-weight: 700;">S</span>, All rights Reserved | Thank you so <span
                        style="color: #78b34d; font-weight: 700;">MatchA</span> for what you do</p>
                <p class="p-mr-6"><span style="font-weight: 700;">&lt; /&gt; &nbsp;</span> dengan <i
                        class="p-ml-2 pi pi-heart-fill animate__animated animate__flash animate__slow animate__infinite	infinite hvr-pulse-grow "
                        style="color: #D32F2F"></i></p>
            </div>
        </div>
    </div>
</template>

<script>
    import OverlayPanel from 'primevue/overlaypanel';
    import Tooltip from 'primevue/tooltip';
    import NavigationMenu from '../components/NavigationMenu.vue'
    export default {
        components: {
            OverlayPanel,
            NavigationMenu
        },
        directives: {
            'tooltip': Tooltip
        },
        data() {
            return {
                matchaMessage: [
                    'I love you so matcha',
                    'Ah, so matcha better',
                    'The key to life is positivi-tea.',
                    'All of our codes and apps are quali-tea',

                ],
                selectedMenu: '',
                selectedMenuHistory: '',
                subMenuAlokasi: false,
                subMenuHistory: false,
                MenuIcon: 'pi pi-chevron-right',
                MenuIconHistory: 'pi pi-chevron-right',
                darklightIcon: 'pi pi-moon',

                showsidebar: false,
                visibleLeft: false,
                sidebarClass: "p-col-0 p-md-0 p-lg-0",
                contentClass: "p-col-12 p-md-12 p-lg-12",

                items: [{
                        label: 'Dashboard',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.$toast.add({
                                severity: 'success',
                                summary: 'Updated',
                                detail: 'Data Updated',
                                life: 3000
                            });
                        }
                    },
                    {
                        label: 'Setting',
                        icon: 'pi pi-times',
                        command: () => {
                            this.$toast.add({
                                severity: 'warn',
                                summary: 'Delete',
                                detail: 'Data Deleted',
                                life: 3000
                            });
                        }
                    },
                    {
                        label: 'Setting',
                        icon: 'pi pi-times',
                        command: () => {
                            this.$toast.add({
                                severity: 'warn',
                                summary: 'Delete',
                                detail: 'Data Deleted',
                                life: 3000
                            });
                        }
                    },
                    {
                        label: 'Setting',
                        icon: 'pi pi-times',
                        command: () => {
                            this.$toast.add({
                                severity: 'warn',
                                summary: 'Delete',
                                detail: 'Data Deleted',
                                life: 3000
                            });
                        }
                    },
                ]


            }
        },
        created() {

        },
        computed: {
            myBgColorData() {
                return this.$store.state.mainstyle.myBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },
            currentUser() {
                return this.$store.state.auth.user
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("logout").then(() => {
                    this.$router.push("/");
                });
            },
            subMenuAlokasiTrigerred() {
                if (this.subMenuAlokasi == false) {
                    this.subMenuAlokasi = true
                    this.MenuIcon = 'pi pi-chevron-down'
                    this.selectedMenu = 'selectedMenu'
                } else {
                    this.subMenuAlokasi = false
                    this.MenuIcon = 'pi pi-chevron-right'
                    this.selectedMenu = ''
                }
            },
            subMenuHistoryTrigerred() {
                if (this.subMenuHistory == false) {
                    this.subMenuHistory = true
                    this.MenuIconHistory = 'pi pi-chevron-down'
                    this.selectedMenuHistory = 'selectedMenu'
                } else {
                    this.subMenuHistory = false
                    this.MenuIconHistory = 'pi pi-chevron-right'
                    this.selectedMenuHistory = ''
                }
            },
            sideBar() {
                this.visibleLeft == true ? this.visibleLeft = false : this.visibleLeft = true
            },
            darklight() {
                if (this.myBgColorData == 'mydarkbgcolor') {
                    // this.myBgColorData = 'mylightbgcolor'
                    this.darklightIcon = 'pi pi-moon'
                    this.$store.dispatch('mainstyle/setTheme', 'mylightbgcolor', {
                        root: true
                    })
                } else {
                    this.darklightIcon = 'pi pi-sun'
                    this.$store.dispatch('mainstyle/setTheme', 'mydarkbgcolor', {
                        root: true
                    })
                }
            },
            toggle(event) {
                this.$refs.op.toggle(event);
            }
        }
    }
</script>

<style>
td div {
    /* div will now take up full 200px of parent's height */
    height: 100%;
    width: 100%;
}
  
    .mydarkbgcolor {
        background-color: #28243d;
    }

    .mylightbgcolor {
        background-color: #f4f5fa;
        
    }

    .mydarkcardcolor {
        background-color: #312d4b;
    }

    .mylightcardcolor {
        background-color: #ffffff
    }

    .mydarktext-color {
        color: #cfcbe4;
    }

    .mylighttext-color {
        color: #726b7c;
    }

    .selectedMenu {
        background-color: #9155fd;
        color: white;

    }


    .hvr-fade {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        overflow: hidden;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: color, background-color;
        transition-property: color, background-color;
    }

    .hvr-fade:hover,
    .hvr-fade:focus,
    .hvr-fade:active {
        background-color: #9155fd;
        color: white;
    }

    .myhover:hover {
        background-color: #9155fd;
    }


    /* Pulse Grow */
    @-webkit-keyframes hvr-pulse-grow {
        to {
            -webkit-transform: scale(1.8);
            transform: scale(1.8);
        }
    }

    @keyframes hvr-pulse-grow {
        to {
            -webkit-transform: scale(1.8);
            transform: scale(1.8);
        }
    }

    .hvr-pulse-grow {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }

    .hvr-pulse-grow:hover,
    .hvr-pulse-grow:focus,
    .hvr-pulse-grow:active {
        -webkit-animation-name: hvr-pulse-grow;
        animation-name: hvr-pulse-grow;
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }

    /* Bob */
    @-webkit-keyframes hvr-bob {
        0% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }

        50% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
        }

        100% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
    }

    @keyframes hvr-bob {
        0% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }

        50% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
        }

        100% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
    }

    @-webkit-keyframes hvr-bob-float {
        100% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
    }

    @keyframes hvr-bob-float {
        100% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
    }

    .hvr-bob {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }

    .hvr-bob,
    .hvr-bob,
    .hvr-bob {
        -webkit-animation-name: hvr-bob-float, hvr-bob;
        animation-name: hvr-bob-float, hvr-bob;
        -webkit-animation-duration: .3s, 1.5s;
        animation-duration: .3s, 1.5s;
        -webkit-animation-delay: 0s, .3s;
        animation-delay: 0s, .3s;
        -webkit-animation-timing-function: ease-out, ease-in-out;
        animation-timing-function: ease-out, ease-in-out;
        -webkit-animation-iteration-count: 1, infinite;
        animation-iteration-count: 1, infinite;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-direction: normal, alternate;
        animation-direction: normal, alternate;
    }

    /* transition */
    .slide-enter-active,
    .slide-leave-active{
        transition: opacity 0.5s, transform 0.25s;
    }
    .slide-enter-from,
    .slide-leave-to{
        opacity: 0;
        transform: translateX(-2%);
    }
</style>