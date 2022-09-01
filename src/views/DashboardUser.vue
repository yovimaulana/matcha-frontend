<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <!-- {{this.currentUser()}} -->
        <!-- <iframe src="https://embed.lottiefiles.com/animation/76498"></iframe> -->
        <!-- {{kegiatanData.data.matching}} <br><br> -->
        <!-- {{currentUser}} -->
         <div :class="'p-col-12 p-lg-12 p-ml-2 p-mr-2 ' ">
             <Breadcrumb :home="home" :model="items" />
         </div>
        
       
        <!-- <div v-if="currentUser">
        {{currentUser.id}}
        </div> -->
        <!-- Kegiatan User -->
        <div class="p-col-12 p-lg-12" v-if="kegiatanData !== null">

            <DataTable :value="kegiatanData.data.users" responsiveLayout="scroll"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <Column field="nama_kegiatan" header="Nama Kegiatan"></Column>
                <Column field="jumlah_matching" header="Jumlah Matching"></Column>
                <Column field="sisa_matching" header="Sisa Matching"></Column>
                <Column field="jumlah_assessment" header="Jumlah Assessment"></Column>
                <Column field="sisa_assessment" header="Sisa Assessment "></Column>
            </DataTable>


        </div>

        <!-- Assessment User -->





    </div>
</template>

<script scoped>
   
    import Breadcrumb from 'primevue/breadcrumb';
import DataService from '../services/DataService';
    // import UserService from '../services/UserService'
    export default {
        components: {
           
            Breadcrumb
        },
        data() {
            return {
                home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Dashboard'},
                
            ],
                myShadow: '',
                products: [{
                        "id": "1000",
                        "code": "f230fh0g3",
                        "nama": "Yovi",
                        "totalMatching": 2000,
                        "sisaMatching": 1340,
                        "totalAssessment": 580,
                        "sisaAssessment": 320
                    },
                    {
                        "id": "1001",
                        "code": "g230fh0g3",
                        "nama": "Jo",
                        "totalMatching": 2040,
                        "sisaMatching": 1310,
                        "totalAssessment": 510,
                        "sisaAssessment": 120
                    },
                    {
                        "id": "1003",
                        "code": "g230fh4g3",
                        "nama": "Maulana",
                        "totalMatching": 1740,
                        "sisaMatching": 1210,
                        "totalAssessment": 340,
                        "sisaAssessment": 190
                    },
                    {
                        "id": "1004",
                        "code": "g230fx4g3",
                        "nama": "Athan",
                        "totalMatching": 1540,
                        "sisaMatching": 1110,
                        "totalAssessment": 140,
                        "sisaAssessment": 160
                    },
                    {
                        "id": "1005",
                        "code": "g230sx4g3",
                        "nama": "Putro",
                        "totalMatching": 2540,
                        "sisaMatching": 1410,
                        "totalAssessment": 440,
                        "sisaAssessment": 130
                    },
                ],
                selectedCountry: null,
                countries: [{
                        name: 'Kegiatan 1',
                        code: 'AU'
                    },
                    {
                        name: 'Kegiatan 2',
                        code: 'BR'
                    },
                    {
                        name: 'Kegiatan 3',
                        code: 'CN'
                    },
                    {
                        name: 'Kegiatan 4',
                        code: 'EG'
                    },
                    {
                        name: 'Kegiatan 5',
                        code: 'FR'
                    },
                    {
                        name: 'Kegiatan 6',
                        code: 'DE'
                    },
                    {
                        name: 'Kegiatan 7',
                        code: 'IN'
                    },
                    {
                        name: 'Kegiatan 8',
                        code: 'JP'
                    },
                    {
                        name: 'Kegiatan 9',
                        code: 'ES'
                    },
                    {
                        name: 'Kegiatan 10',
                        code: 'US'
                    }
                ],
                productService: null,
                headerBg: '#ffffff',
                textColor: '#726b7c',
                kegiatanOptions: null,
                selectedKegiatan: null,
                kegiatanData : null
            }
        },
        watch: {
            myCardBgColorData(newX, oldX) {
                console.log(`new ${newX}`)
                if (newX == 'mydarkcardcolor') {
                    this.headerBg = '#312d4b'
                    this.textColor = '#cfcbe4'
                } else {
                    this.headerBg = '#ffffff'
                    this.textColor = '#726b7c'
                }
                console.log(`old ${oldX}`)
            },
              myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },
        },
       async created(){
            // this.getAllKegiatan()
            const token = localStorage.getItem('token');
            await this.$store.dispatch('get_user', token)
            await  this.getKegiatanDataUser()
        },

        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },
            currentUser() {
                return this.$store.state.auth.user
            }
        },
        methods: {
           async getKegiatanDataUser(){
                await DataService.getKegiatanDataUser(this.currentUser.id)
                .then(response => {
                     this.kegiatanData = response.data
                    console.log(' this.kegiatanData',  this.kegiatanData)
                })
                .catch(error => {
                    console.log(error)
                })
            }
         
        }
    }
</script>

<style lang="css" >

    td {
        background-color: v-bind(headerBg);
        color: v-bind(textColor);
    }

    .p-datatable-thead {
        background-color: v-bind(headerBg);
        color: v-bind(textColor);
    }

    .p-paginator {
        background-color: v-bind(headerBg);
        color: v-bind(textColor);
    }

    .p-dropdown-label {
        background-color: v-bind(headerBg);
        color: v-bind(textColor);
    }

    .buttonCompareActive {
        background-color: #9155fd;
        color: white;
    }

    .buttonDataSourceActive {
        background-color: #9155fd;
        color: white;
    }

    

    .p-datatable-wrapper {
        border-radius: 18px;
    }

    .p-progressbar .p-progressbar-label {
        color: white;
        line-height: 1.5rem;
    }

    .p-breadcrumb{
        border: none;
        border-radius: 14px;
    }

    nav{
       background-color: v-bind(headerBg) !important;
        color: v-bind(textColor) !important;
    }

    .p-menuitem-text{
        color: v-bind(textColor) !important;
    }

    .p-breadcrumb ul li .p-breadcrumb-chevron{
         color: v-bind(textColor) !important;
    }

    .p-breadcrumb ul li .p-menuitem-link .p-menuitem-icon{
         color: v-bind(textColor) !important;
    }

    .p-dropdown .p-dropdown-label .p-placeholder {
         color: v-bind(textColor) !important;
    }

    /* .p-tabmenu{
  background-color: aqua;
}

.p-tabmenuitem{
  background-color: red;

}
.p-highlight{
  background-color: red !important;background: red;
}
.p-tabmenu-nav{
  background-color: red !important;background: red !important;
}
.p-menuitem-text{
  background-color: red !important;background: red;
} */
    /* .ul{
  background-color: red;
} */
</style>