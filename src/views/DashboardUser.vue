<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <div class="p-col-12 p-lg-12">
            <Breadcrumb class="custom-breadcrumb" :home="home" :model="items" />
        </div>
        <Card class="custom-card-matcha">
            <template #title>
                <div class="p-grid">
                    <div class="p-col-6">
                        <div style="font-size: 1rem">Progres Kegiatan</div>
                    </div>
                    <div class="p-col-6" style="text-align: right">
                        <Dropdown @change="getProgressKegiatanUser(yearSelected)" v-model="yearSelected" :options="yearOption" optionLabel="name" placeholder="Pilih Tahun Kegiatan" />
                    </div>
                </div>
            </template>
            <template #content>
                <Skeleton v-show="onLoadData" height="15rem" />
                <DataTable v-if="kegiatanData != null" :value="kegiatanData.data.users" responsiveLayout="scroll"
                    class="animate__animated animate__fadeIn"
                    style="border-radius: 18px;">
                    <template #empty>
                        <h5>Data tidak tersedia!</h5>
                    </template>
                    <Column field="nama_kegiatan" header="Nama Kegiatan"></Column>
                    <Column field="jumlah_matching" header="Jumlah Matching">
                        <template #body="col">
                            {{col.data.jumlah_matching}} <i v-if="col.data.sisa_matching == '0'" @click="this.downloadReport(col)" class="pi pi-download" style="cursor: pointer; color: green; margin-left: 10px;" v-tooltip.top="'Click to download Report (max: 1000 rows)!'"></i>                            
                        </template>
                    </Column>
                    <Column field="sisa_matching" header="Sisa Matching"></Column>
                    <Column field="jumlah_assessment" header="Jumlah Assessment">
                        <template #body="col">
                            {{col.data.jumlah_assessment}} <i v-if="col.data.sisa_assessment == '0'"  @click="this.downloadReport(col)" class="pi pi-download" style="cursor: pointer; color: green; margin-left: 10px;" v-tooltip.top="'Click to download Report (max: 1000 rows)!'"></i>                            
                        </template>
                    </Column>
                    <Column field="sisa_assessment" header="Sisa Assessment "></Column>
                </DataTable>
                <div v-show="onErrorLoad" style="text-align: center">
                    <img class="errImg" src="../assets/err404.png" alt="Error Image">                    
                    <Button @click="this.getKegiatanDataUser()" v-tooltip.right="'Click to reload data!'" class="p-button-danger p-button-outlined onclick-btn-custom" style="margin-top: 5px; margin-bottom: 15px" label="RELOAD" icon="pi pi-refresh" />
                </div>                     
            </template>
        </Card>
        <Toast />
        <Loading v-model:active="loadingDialog" :is-full-page="true" :color="'#86d166'" :background-color="'black'"
            :opacity="0.75">
            <slot>
                <MyLoading></MyLoading>
            </slot>
        </Loading>  
    </div>
</template>

<script scoped>
    import Breadcrumb from 'primevue/breadcrumb';
    import DataService from '../services/DataService';
    import Card from 'primevue/card';
    import Skeleton from 'primevue/skeleton';
    import Button from 'primevue/button';
    import Toast from 'primevue/toast';
    import exportFromJSON from "export-from-json";
    import MyLoading from '../components/MyLoading2.vue'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    // import UserService from '../services/UserService'
    export default {
        components: {
            Breadcrumb,
            Card,
            Skeleton,
            Button,
            Toast,
            exportFromJSON,
            Loading,
            MyLoading
        },
        data() {
            return {
                home: {
                    icon: 'pi pi-home',
                    to: '/'
                },
                items: [{
                        label: 'Dashboard'
                    },

                ],
                yearOption: [
                    {name: '2022', value: '2022'},
                    {name: '2023', value: '2023'},
                    {name: '2024', value: '2024'},
                    {name: '2025', value: '2025'},
                    {name: '2026', value: '2026'},
                    {name: '2027', value: '2027'},
                    {name: '2028', value: '2028'},
                    {name: 'Show All', value: ''}
                ],
                yearSelected: null,
                kegiatanData: null,
                onLoadData: false,
                onErrorLoad: false,
                loadingDownload: false, 
                loadingDialog: false              
            }
        },
        watch: {},
        async created() {
            const token = localStorage.getItem('token');
            await this.$store.dispatch('get_user', token)   
            this.yearSelected = this.yearOption.find(data => data.value == new Date().getFullYear())           
            await this.getKegiatanDataUser(new Date().getFullYear())
        },

        computed: {            
            currentUser() {
                return this.$store.state.auth.user
            }
        },
        methods: {
            async getKegiatanDataUser(year) {
                this.onLoadData = true
                this.onErrorLoad = false
                this.kegiatanData = null
                try {
                    const result = await DataService.getKegiatanDataUser(this.currentUser.id, year)
                    
                    if(result.data.meta.status == 'error') throw new Error(result.data.meta.message)
                    
                    this.onLoadData = false
                    this.onErrorLoad = false                        
                    this.kegiatanData = result.data
                } catch (error) {
                    this.onLoadData = false
                    this.onErrorLoad = true
                    this.$toast.add({severity:'error', summary: 'Error Occured!', detail:'Gagal menampilkan data :(', life: 3000});
                    console.log(error)
                }               
            },
            getProgressKegiatanUser(year) {
                this.getKegiatanDataUser(year.value)
            },
            async downloadReport(dataReport) {
                
                try {
                    // this.loadingDownload = true
                    this.loadingDialog = true
                    const result = await DataService.getReportMatchingUser(this.currentUser.id, dataReport.data.id, (dataReport.field == 'jumlah_matching' ? 'matching' : 'assessment'))
                    
                    // export to csv
                    const data = result.data.data
                    const fileName = `[REPORT MATCHA] ${dataReport.field == 'jumlah_matcing' ? 'MATCHING' : 'ASSESSMENT'} - `+dataReport.data.nama_kegiatan.toUpperCase();
                    const exportType = exportFromJSON.types.csv;
                    if (data) exportFromJSON({ data, fileName, exportType });

                    // this.loadingDownload = false     
                    this.loadingDialog = false          
                } catch (error) {
                    this.$toast.add({severity:'error', summary: 'Error Occured!', detail:'Something went wrong!', life: 3000});
                    // this.loadingDownload = false
                    this.loadingDialog = false
                    console.log(error)
                }
            }

        }
    }
</script>

<style scoped>

    button.onclick-btn-custom {
        box-shadow: none !important;
    }    

    ::v-deep(thead th) {
        background-color: #f3f2f7 !important;
        vertical-align: top;
        text-transform: uppercase;
        font-size: .857rem;
        letter-spacing: .5px;
    }

    .errImg {        
        width: 20%;
        display: block;
        margin: 0 auto;
    }

    .errMsg {
        display: block; 
        margin: 0 auto;
        width: 70%;
        padding: 15px;
        font-size: 12px;
    }


    @media (max-width: 420px) {
        .errImg {
            width: 50%;
        }

        .errMsg {
            width: 100%;
        }

    }

    @media (min-width:421px) and (max-width: 720px) {
        .errImg {
            width: 30%;
        }
        .errMsg {
            width: 100%;
        }
    }    
</style>