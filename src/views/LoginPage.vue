<template>
    <div class="p-grid p-jc-center p-ai-center vertical-container myBg"
        style="min-height: 100vh; min-width: 100vh; color: #726b7c;">    
        <Card style="width: 25rem; margin-bottom: 2em; color: #726b7c;border-radius:14px;" class="p-shadow-6">
            <template #title>
                <div style="text-align: center">
                    <img src="../assets/matcha.png" class="hvr-bob mybob p-mt-1 "
                        v-tooltip.top="{value: this.matchaMessage[Math.floor(Math.random()*this.matchaMessage.length)], class: 'custom-error'}"
                        style="width: 50%; height: 18%;" alt="" srcset="">
                    <div style="font-weight: 700;color:#78b34d">
                        MatchA App</div>
                    <span style="font-weight: normal;font-size: 18px;">Aplikasi Matching dan Assessment</span>
                </div>

            </template>
            <template #content>
                <div class="p-fluid  ">
                    <div class="p-grid p-jc-start p-ml-3 p-mb-6">
                        <span class="p-mb-1" style="font-size: 24px; font-weight: 600;">Halo, Selamat Datang! 👋🏻
                        </span>
                        <!-- <span>Silakan masuk ke akun Anda dan mulai bekerja</span>  -->
                        <div style="font-style: italic">
                        <span>Everything is so <span style="font-weight: 900;color:#78b34d"> MatchA </span> better with
                            you</span></div>
                    </div>

                    <div class="field p-mb-4 p-ml-3 p-mr-3 col-12 md:col-12 sm:col-12">
                        <span class="p-float-label p-input-icon-left">
                            <i class="pi pi-user" />
                           
                            <InputText id="inputtext" class="p-inputtext-lg" type="text" v-model="authForm.username" />
                             <label for="inputtext">Username</label>
                        </span>
                        <small id="username2-help" v-if="errorMessages.username !== null"
                                class="p-error">{{errorMessages.username}}</small>
                    </div>
                    <div class="field p-mb-4 p-ml-3 p-mr-3 col-12 md:col-12 sm:col-12">
                        <span class="p-float-label p-input-icon-left">
                            <i class="pi pi-lock" />
                            <Password :feedback="false" v-on:keyup.enter="userLogin()" id="inputtext-left" class="p-inputtext-lg"
                                 toggleMask v-model="authForm.password"> </Password>
                            <!-- <InputText v-on:keyup.enter="userLogin()" id="inputtext-left" class="p-inputtext-lg"
                                type="password" toggleMask v-model="authForm.password" /> -->
                            <label for="inputtext-left">Password</label>
                            
                        </span>
                        <small  v-if="errorMessages.password !== null"
                                class="p-error">{{errorMessages.password}}</small>

                    </div>
            

                    <div v-if="errors !== null"><small class="p-error">  {{errors}} </small> <br> <br></div>
                   
                    <div class="field p-mb-1 p-ml-3 p-mr-3 col-12 md:col-12 sm:col-12">

                        <Button :loading="loadingButton" label="Login" @click="userLogin()" icon="" class="p-mb-2 " />


                        <Button label="SSO BPS" class="p-button-info " icon="" />
                    </div>
                </div>
            </template>
        </Card>


    </div>



</template>
<script>
    // import DataService from '../services/DataService'
    import InputText from 'primevue/inputtext';
    import Tooltip from 'primevue/tooltip';
    import Password from 'primevue/password';
    export default {
        components: {
            InputText,
            Password
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
                authForm: {
                    username: null,
                    password: null,
                },
                errorMessages: {
                    username: null,
                    password: null
                },
                errors : null,
                loadingButton: false

            }
        },
        // created(){
        //       console.log('TES ENV', process.env.VUE_APP_BACKEND_URL)
        // },
        methods: {
            userLogin() {                
                if (this.authForm.username !== null && this.authForm.password !== null) {
                    this.loadingButton = true
                    this.$store.dispatch('login', this.authForm)
                        .then(response => {
                                                        
                            this.loadingButton = false
                            
                            // kalo username
                            if(response.data.meta.status == 'error')
                            {                                
                                this.errors = response.data.meta.message
                                return;
                            }
                            
                            let userRoles = response.data.data.user.roles,
                                filteredRoles = userRoles.find(role => role.name == "ROLE_ADMIN"),
                                nameRoute = filteredRoles == undefined ? 'dashboardUser' : 'dashboardAdmin';                            
                                                    
                            this.$router.push({name: nameRoute});                              
                                
                        }).catch(error => {
                            console.log('myerror', error)
                            this.loadingButton = false                            
                            this.errors = 'Ups ada error :('
                        })
                }
                this.authForm.username == null ? this.errorMessages.username = 'Username tidak boleh kosong' : null
                this.authForm.password == null ? this.errorMessages.password = 'Password tidak boleh kosong' : null
            }
        }
    }
</script>
<style scoped>
    .vertical-container {
        margin: 0;
        height: 200px;
        background: var(--surface-d);
        border-radius: 4px;
    }

    img {
        --animate-duration: 5s;
    }

    /* Bob */
    @-webkit-keyframes hvr-bob {
        0% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
        }

        50% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
        }

        100% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
        }
    }

    @keyframes hvr-bob {
        0% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
        }

        50% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
        }

        100% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
        }
    }

    @-webkit-keyframes hvr-bob-float {
        100% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
        }
    }

    @keyframes hvr-bob-float {
        100% {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
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


    .custom-error .p-tooltip-text {
        background-color: blue;
        color: rgb(255, 255, 255);
        font-size: 90px;
    }

    .custom-error .p-tooltip-arrow {
        background-color: blue;
    }

    .myBg {
        background-image: url('../assets/background.webp');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>