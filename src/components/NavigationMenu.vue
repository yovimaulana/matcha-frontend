<template>
    <div class="p-d-flex p-grid p-jc-between ">
        <div :class="myBgColorData+' '+myTextColorData" style="border-color: transparent;">
            <router-link v-if="currentUser.roles.find(role => role.name == 'ROLE_ADMIN') != undefined"
                :to="{name: 'dashboardAdmin'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-th-large p-mr-2 p-ml-2"></i>
                        Dashboard
                    </div>
                </div>
            </router-link>
            <router-link v-else :to="{name: 'dashboardUser'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-th-large p-mr-2 p-ml-2"></i>
                        Dashboard
                    </div>
                </div>
            </router-link>
            <br>

            <router-link :to="{name: 'matching'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-table p-mr-2 p-ml-2"></i>
                        Matching
                    </div>
                </div>
            </router-link><br>



            <router-link :to="{name: 'assessment'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-check-circle p-mr-2 p-ml-2"></i>
                        Assessment
                    </div>
                </div>
            </router-link><br>




            <div v-if="currentUser.roles.find(role => role.name == 'ROLE_ADMIN') != undefined"
                @click="subMenuAlokasiTrigerred()" :class="myTextColorData+ ' hvr-fade'+' '+selectedMenu"
                style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                <div>
                    <i :class="MenuIcon+' p-mr-2 p-ml-2'"></i>
                    Alokasi
                </div>
            </div>




            <div v-show="subMenuAlokasi" class="animate__animated animate__fadeIn animate__faster">

                <router-link :to="{name: 'alokasiMatching'}" @click="this.$emit('showSideBar')">
                    <div :class="myTextColorData+ ' hvr-fade'"
                        style="padding: 10px;font-size: 16px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                        <div>
                            <i class="pi pi-circle p-mr-2 p-ml-2"></i>
                            Matching
                        </div>
                    </div>
                </router-link><br>
                <router-link :to="{name: 'alokasiAssessment'}" @click="this.$emit('showSideBar')">
                    <div :class="myTextColorData+ ' hvr-fade'"
                        style="padding: 10px;font-size: 16px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                        <div>
                            <i class="pi pi-circle p-mr-2 p-ml-2"></i>
                            Assessment
                        </div>
                    </div>
                </router-link>

            </div>
            <br>
            <router-link v-if="currentUser.roles.find(role => role.name == 'ROLE_ADMIN') != undefined"
                :to="{name: 'kegiatan'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-box p-mr-2 p-ml-2"></i>
                        Kegiatan
                    </div>
                </div>
            </router-link>
            <br>
            <router-link v-if="currentUser.roles.find(role => role.name == 'ROLE_ADMIN') != undefined"
                :to="{name: 'manajemenUser'}" @click="this.$emit('showSideBar')">
                <div :class="myTextColorData+ ' hvr-fade'"
                    style="padding: 10px;font-size: 20px;font-weight: 600; border-radius: 30px; text-decoration: none;width: 150%;margin-left: 10px;">

                    <div>
                        <i class="pi pi-user p-mr-2 p-ml-2"></i>
                        Users
                    </div>
                </div>
            </router-link>
            <br>
            <br>
        </div>
    </div>
</template>

<script>
    import Tooltip from 'primevue/tooltip';
    export default {
        components: {



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
                    // {
                    //     label: 'Vue Website',
                    //     icon: 'pi pi-external-link',
                    //     url: 'https://vuejs.org/'
                    // },
                    // {
                    //     label: 'Router',
                    //     icon: 'pi pi-upload',
                    //     to: '/fileupload'
                    // }
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
                if (this.sidebarClass == "p-col-0 p-md-0 p-lg-0") {
                    // this.sidebarClass = "p-col-2 p-md-2 p-lg-2"
                    // this.contentClass = "p-col-10 p-md-10 p-lg-10"
                    this.showsidebar = true
                    this.visibleLeft = true
                } else {
                    // this.sidebarClass = "p-col-0 p-md-0 p-lg-0"
                    // this.contentClass = "p-col-12 p-md-12 p-lg-12"
                    // this.showsidebar = false
                }
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
    .router-link-active .router-link-exact-active {
        color: red !important;
        background-color: red !important;
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

    .hvr-bob:hover,
    .hvr-bob:focus,
    .hvr-bob:active {
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
</style>