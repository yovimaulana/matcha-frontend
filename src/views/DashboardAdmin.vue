<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <!-- {{this.currentUser()}} -->
        <!-- <iframe src="https://embed.lottiefiles.com/animation/76498"></iframe> -->
        <!-- {{kegiatanData.data.matching}} <br><br> -->
        
         <div :class="'p-col-12 p-lg-12 p-ml-2 p-mr-2 ' ">
             <Breadcrumb :home="home" :model="items" />
         </div>
        <div class="p-col-12 p-lg-12">
            <Dropdown v-if="kegiatanOptions !== null"
                :class="'p-col-12 p-lg-12 '+myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                v-model="selectedKegiatan" :options="kegiatanOptions.data" optionLabel="name" :filter="true"
                placeholder="Pilih Kegiatan" :showClear="true" @change="getKegiatanData(selectedKegiatan)" style="border-radius: 14px;">
                <template #value="slotProps">
                    <div class="data-item data-item-value" v-if="slotProps.value">

                        <div>{{slotProps.value.name}}</div>
                    </div>
                    <span v-else>
                        {{slotProps.placeholder}}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="data-item">

                        <div>{{slotProps.option.name}}</div>
                    </div>
                </template>
            </Dropdown>
        </div>
        <!-- Matching Status -->
        <div class="p-col-12 p-lg-6" v-if="this.kegiatanData !== null">
 
            <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <template #title>
                    Matching
                </template>
                <template #content>
                    <div class="p-grid " style=" border-left-color: red; ">


                        <div class="p-col-5">

                            <div>
                                <span style="font-size: 40px;"> {{this.kegiatanData.data.matching.total}} </span> <br>
                                Total
                            </div>
                        </div>

                        <div class="p-col-2">
                            <Divider layout="vertical" />
                        </div>
                        <div class="p-col-5">

                            <div>
                                <span style="font-size: 40px;"> {{this.kegiatanData.data.matching.complete}} </span> <br>
                                Complete
                            </div>
                        </div>
                        <div class="p-col-12 p-mt-4">
                            <ProgressBar style="color:white;" :value="((this.kegiatanData.data.matching.complete/this.kegiatanData.data.matching.total)*100).toFixed(2)" />

                        </div>



                    </div>
                </template>

            </Card>


        </div>

        <!-- Assessment Status -->
        <div class="p-col-12 p-lg-6" v-if="this.kegiatanData !== null">

            <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px; ">
                <template #title>
                    Assessment
                </template>
                <template #content>
                    <div class="p-grid ">


                        <div class="p-col-5">

                            <div>
                                <span style="font-size: 40px;"> {{this.kegiatanData.data.assessment.total}} </span> <br>
                                Total
                            </div>
                        </div>

                        <div class="p-col-2">
                            <Divider layout="vertical" />
                        </div>
                        <div class="p-col-5">

                            <div>
                                <span style="font-size: 40px;"> {{this.kegiatanData.data.assessment.complete}} </span> <br>
                                Complete
                            </div>
                        </div>
                        <div class="p-col-12 p-mt-4">
                            <ProgressBar :value="((this.kegiatanData.data.assessment.complete/this.kegiatanData.data.assessment.total)*100).toFixed(2)" />

                        </div>



                    </div>
                </template>

            </Card>


        </div>


        <!-- Matching Assessment User -->
        <div class="p-col-12 p-lg-12" v-if="kegiatanData !== null">
         
            <DataTable :value="kegiatanData.data.users"  v-model:filters="filters"
                filterDisplay="menu" :globalFilterFields="['nama','jumlah_matching','sisa_matching','jumlah_assessment','sisa_assessment']" :paginator="true"
                responsiveLayout="scroll" :rows="10" dataKey="id" :rowHover="true"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10,25,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                >
                 <template #header>
                    <div :class="myCardBgColorData+' '+myTextColorData+' p-col-12 p-grid p-jc-between'">

                        <div :class="myCardBgColorData+' '+myTextColorData+ 'p-jc-start p-col-12 p-lg-3 p-mr-6'">
                            <h2 class="">Daftar User</h2>
                        </div>
                        <div class=" p-col-12 p-lg-3 p-mt-2 p-mr-4 "><span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span></div>
                    </div>

                   
                </template>
                <Column field="nama" header="Nama"></Column>
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
    import ProgressBar from 'primevue/progressbar'
    import Breadcrumb from 'primevue/breadcrumb';
import DataService from '../services/DataService';
import InputText from 'primevue/inputtext';
import {
        FilterMatchMode,
        FilterOperator
    } from 'primevue/api';
    // import UserService from '../services/UserService'
    export default {
        components: {
            ProgressBar,
            Breadcrumb,
            InputText
        },
        data() {
            return {
                filters: {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    },
                    'nama': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'jumlah_matching': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'sisa_matching': {
                        value: null,
                        matchMode: FilterMatchMode.IN
                    },
                    'jumlah_assessment': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.DATE_IS
                        }]
                    },
                    'sisa_assessment': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.EQUALS
                        }]
                    }
                },
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
           await this.getAllKegiatan()
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
           async getAllKegiatan(){
                await DataService.getKegiatanActive()
                .then(response => {
                    this.kegiatanOptions = response.data
                    console.log('kegiatanOptions', this.kegiatanOptions)
                })
                .catch(error => {
                    console.log(error)
                })
            },
            async getKegiatanData(selectedKegiatan){
                console.log(selectedKegiatan['id_kegiatan'])
                await DataService.getKegiatanData(selectedKegiatan['id_kegiatan'])
                .then(response => {
                    this.kegiatanData = response.data
                    console.log('KegiatanData', response.data)
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

    .p-datatable .p-datatable-header {
        background: none;
        color: none;
        border: none;
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
        /* border-radius: 18px; */
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