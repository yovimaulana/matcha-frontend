<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">




        <!-- Matching Assessment User -->
        <div class="p-col-12 p-lg-12">

            <DataTable :value="products" responsiveLayout="scroll"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <Column field="nama" header="Nama Kegiatan"></Column>
                <Column field="totalMatching" header="Jumlah Matching"></Column>
                <Column field="totalAssessment" header="Jumlah Assessment"></Column>
                
            </DataTable>


        </div>

        <!-- Assessment User -->





    </div>
</template>

<script scoped>
    // import ProgressBar from 'primevue/progressbar'
    // import UserService from '../services/UserService'
    export default {
        // components: {
        //     ProgressBar
        // },
        data() {
            return {
                myShadow: '',
                products: [{
                        "id": "1000",
                        "code": "f230fh0g3",
                        "nama": "Kegiatan A",
                        "totalMatching": 2000,
                        "sisaMatching": 1340,
                        "totalAssessment": 580,
                        "sisaAssessment": 320
                    },
                    {
                        "id": "1001",
                        "code": "g230fh0g3",
                        "nama": "Kegiatan B",
                        "totalMatching": 2040,
                        "sisaMatching": 1310,
                        "totalAssessment": 510,
                        "sisaAssessment": 120
                    },
                    {
                        "id": "1003",
                        "code": "g230fh4g3",
                        "nama": "Kegiatan C",
                        "totalMatching": 1740,
                        "sisaMatching": 1210,
                        "totalAssessment": 340,
                        "sisaAssessment": 190
                    },
                    {
                        "id": "1004",
                        "code": "g230fx4g3",
                        "nama": "Kegiatan D",
                        "totalMatching": 1540,
                        "sisaMatching": 1110,
                        "totalAssessment": 140,
                        "sisaAssessment": 160
                    },
                    {
                        "id": "1005",
                        "code": "g230sx4g3",
                        "nama": "Kegiatan E",
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
                productService: null
            }
        },

        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            }
        },
    }
</script>

<style lang="css" >
    .buttonCompareActive {
        background-color: #9155fd;
        color: white;
    }

    .buttonDataSourceActive {
        background-color: #9155fd;
        color: white;
    }

    :host>>>.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-state-active {
        background-color: #d90096;
        border: 1px solid #d600d9;
    }

    :host>>>.p-tabview .p-tabview-panels {
        background-color: red;
    }

    .p-datatable-wrapper {
        border-radius: 18px;
    }

    .p-progressbar .p-progressbar-label {
        color: white;
        line-height: 1.5rem;
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