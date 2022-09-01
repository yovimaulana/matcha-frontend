<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <Toast />



        <!-- Matching Assessment User -->
        <div class="p-col-12 p-lg-12">
            <!-- <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <template #content>
                    <Toolbar class="p-mb-4">
                        <template #end>
                            <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2"
                                @click="kegiatanDialog=true;this.resetModelKegiatan();this.dialogHeader='Tambah Kegiatan'" />
                        </template>
                    </Toolbar>
                    <DataTable v-if="daftarKegiatan !== null" :value="daftarKegiatan.data" responsiveLayout="scroll"
                        :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                        style="border-radius: 18px;">

                        <Column field="name" header="Nama Kegiatan"></Column>
                        <Column field="description" header="description"></Column>

                        <Column header="Status Matching" field="matching_active">
                            <template #body="col">

                                <Button label="Active" v-if="col.data.matching_active == 1" icon="pi pi-check-circle"
                                    class="p-button-sm p-button-rounded"
                                    style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                                <Button label="Inactive" v-if="col.data.matching_active == null"
                                    icon="pi pi-times-circle" class="p-button-sm p-button-rounded"
                                    style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

                            </template>
                        </Column>

                        <Column header="Status Assessment" field="assessment_active">
                            <template #body="col">

                                <Button label="Active" v-if="col.data.assessment_active == 1" icon="pi pi-check-circle"
                                    class="p-button-sm p-button-rounded"
                                    style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                                <Button label="Inactive" v-if="col.data.assessment_active == null"
                                    icon="pi pi-times-circle" class="p-button-sm p-button-rounded"
                                    style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

                            </template>
                        </Column>

                        <Column header="Aksi">
                            <template #body="col">

                                <Button icon="pi pi-pencil" @click="editKeySelected(col)"
                                    class="p-button-raised p-mr-2" />
                                <Button icon="pi pi-trash" @click="deleteSelectedKeyOption(col)"
                                    class="p-button-raised p-button-danger" />
                            </template>
                        </Column>
                    </DataTable>
                </template>

            </Card> -->
            <!-- {{this.daftarKegiatan}} -->
            <Toolbar class="p-mb-4 p-shadow-6">
                <template #end>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2"
                        @click="kegiatanDialog=true;this.resetModelKegiatan();this.dialogHeader='Tambah Kegiatan';this.editField = false;" />
                </template>
            </Toolbar>
            <DataTable v-if="daftarKegiatan !== null" :value="daftarKegiatan.data" 
            v-model:filters="filters"
                filterDisplay="menu" :globalFilterFields="['name','username','email','nip','roles']" :paginator="true"
                responsiveLayout="scroll" :rows="10" dataKey="id" :rowHover="true"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10,25,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-shadow-6 p-m-2 animate__animated animate__fadeIn '"
                >
                <template #header>
                  
                    <div :class="myCardBgColorData+' '+myTextColorData+' p-col-12 p-grid p-jc-between'">

                        <div :class="myCardBgColorData+' '+myTextColorData+ 'p-jc-start p-col-12 p-lg-3 p-mr-6'">
                            <h2 class="">Daftar Kegiatan</h2>
                        </div>
                        <div class=" p-col-12 p-lg-3 p-mt-2 p-mr-4 "><span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span></div>
                    </div>

                   
                </template>

                <Column field="name" header="Nama Kegiatan"></Column>
                <Column field="description" header="Deskripsi"></Column>

                <Column header="Status Matching" field="matching_active">
                    <template #body="col">

                        <Button label="Active" v-if="col.data.matching_active == 1" icon="pi pi-check-circle"
                            class="p-button-sm p-button-rounded"
                            style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                        <Button label="Inactive"
                            v-if="col.data.matching_active == null || col.data.matching_active == 0"
                            icon="pi pi-times-circle" class="p-button-sm p-button-rounded"
                            style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

                    </template>
                </Column>

                <Column header="Status Assessment" field="assessment_active">
                    <template #body="col">

                        <Button label="Active" v-if="col.data.assessment_active == 1" icon="pi pi-check-circle"
                            class="p-button-sm p-button-rounded"
                            style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                        <Button label="Inactive"
                            v-if="col.data.assessment_active == null || col.data.assessment_active == 0"
                            icon="pi pi-times-circle" class="p-button-sm p-button-rounded"
                            style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

                    </template>
                </Column>

                <Column header="Aksi">
                    <template #body="col">

                        <Button icon="pi pi-pencil" @click="editKeySelected(col)" class="p-button-raised p-mr-2" />
                        <Button icon="pi pi-trash" @click="deleteSelectedKeyOption(col);this.deleteDialog=true"
                            class="p-button-raised p-button-danger" />
                    </template>
                </Column>
            </DataTable>


        </div>

        <Dialog v-model:visible="kegiatanDialog" :style="{width: '450px'}" :header="dialogHeader" class="p-fluid">

            <div class="field">
                <label for="name">Nama Kegiatan</label>
                <!-- <InputText id="name" v-model.trim="product.name" required="true" autofocus
                    :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small> -->

                <InputText id="name" type="text" v-model="modelKegiatan.name" />
            </div>
            <br>
            <div class="field">
                <label for="description">Deskripsi</label><br>
                <Textarea id="description" v-model="modelKegiatan.description" required="true" rows="3" cols="55" />
                </div>
            <br>
            <div class="p-grid" v-if="editField">
            <div class="field p-col-12 p-lg-6">
                <label class="p-mb-3">Status Matching</label>
                <div class="formgrid p-grid">
                    <div class="field-radiobutton p-col-12">
                        <RadioButton id="matchingActive" name="category" :value="1" v-model="modelKegiatan.matching_active" />
                        <label class="p-ml-2" for="matchingActive">Active</label>
                    </div>
                    <div class="field-radiobutton p-col-12">
                        <RadioButton id="matchingInctive" name="category" :value="null" v-model="modelKegiatan.matching_active" />
                        <label class="p-ml-2" for="matchingInctive">Inactive</label>
                    </div>
                     <div class="field-radiobutton p-col-12">
                        <RadioButton id="matchingInctive" name="category" :value="0" v-model="modelKegiatan.matching_active" />
                        <label class="p-ml-2" for="matchingInctive">Selesai</label>
                    </div>
                  
                </div>
            </div>

            <div class="field p-col-12 p-lg-6" >
                <label class="p-mb-3">Status Assessment</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton p-col-12">
                        <RadioButton id="AssessmentActive" name="category" :value="1" v-model="modelKegiatan.assessment_active" />
                        <label class="p-ml-2" for="AssessmentActive">Active</label>
                    </div>
                    <div class="field-radiobutton p-col-12">
                        <RadioButton id="AssessmentInactive" name="category" :value="null" v-model="modelKegiatan.assessment_active" />
                        <label class="p-ml-2" for="AssessmentInactive">Inactive</label>
                    </div>
                      <div class="field-radiobutton p-col-12">
                        <RadioButton id="matchingInctive" name="category" :value="0" v-model="modelKegiatan.matching_active" />
                        <label class="p-ml-2" for="matchingInctive">Selesai</label>
                    </div>
                  
                </div>
            </div>
            </div>


            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="kegiatanDialog=false; this.resetModelKegiatan()" />
                <Button :loading="loadingButton" v-if="this.dialogHeader !== 'Edit Kegiatan'" label="Save" icon="pi pi-check" class="p-button-text" @click="submit();;" />
                 <Button :loading="loadingButton" v-if="this.dialogHeader == 'Edit Kegiatan'" label="Update" icon="pi pi-check" class="p-button-text" @click="update();;" />
            </template>
        </Dialog>

         <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Hapus Data" class="p-fluid">

            <p>Apakah Anda yakin ingin menghapus kegiatan? Data kegiatan akan hilang selamanya.</p>
   
           


            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="deleteDialog=false" />
                <Button :loading="loadingButton" label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteFinal()" />
            </template>
        </Dialog>

        <!-- Assessment User -->





    </div>
</template>

<script scoped>
    import DataService from '../services/DataService'
    import Toolbar from 'primevue/toolbar';
    import Dialog from 'primevue/dialog'
    import InputText from 'primevue/inputtext';
    import RadioButton from 'primevue/radiobutton';
    import Textarea from 'primevue/textarea';
      import Toast from 'primevue/toast';
      import {
        FilterMatchMode,
        FilterOperator
    } from 'primevue/api';
    // import ProgressBar from 'primevue/progressbar'
    // import UserService from '../services/UserService'
    export default {
        components: {
            Toolbar,
            Dialog,
            InputText,
            RadioButton,
            Textarea,
            Toast
        },
        data() {
            return {
                filters: {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    },
                    'name': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'description': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'matching_active': {
                        value: null,
                        matchMode: FilterMatchMode.IN
                    },
                    'assessment_active': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.DATE_IS
                        }]
                    },
                    'created_at': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.EQUALS
                        }]
                    },
                    'updated_at': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.EQUALS
                        }]
                    }
                },
                myShadow: '',
              
                selectedCountry: null,
             
                productService: null,
                daftarKegiatan: null,
                kegiatanDialog: false,
                modelKegiatan: {
                    id_kegiatan: null,
                    name: null,
                    description: null,
                    matching_active: null,
                    assessment_active: null,
                },
                selectedId: null,
                selectedIndex: null,
                dialogHeader: null,
                
                // tablestyle
                headerBg: '#ffffff',
                textColor: '#726b7c',
                editField: false,
                loadingButton: false,
                deleteDialog: false,
                //
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
            }
        },
        async created() {
           await this.getAllKegiatan()
        },

        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },

            
        },
        methods:{
            async getAllKegiatan(){
                 await DataService.getAllKegiatan()
                .then(response => {
                    this.daftarKegiatan = response.data
                    console.log('daftarKegiatan', this.daftarKegiatan)
                })
                .catch(error => {
                    console.log(error)
                })
            },
                editKeySelected(data){
                    console.log('data',data)
                    this.editField = true
                    this.dialogHeader = 'Edit Kegiatan'
                    this.selectedId = data.data.id_kegiatan
                    this.selectedIndex = data.index
                    this.modelKegiatan.id_kegiatan = data.data.id_kegiatan
                    this.modelKegiatan.name = data.data.name
                    this.modelKegiatan.description = data.data.description
                    data.data.matching_active == "1" ? this.modelKegiatan.matching_active=true : this.modelKegiatan.matching_active=false 
                    data.data.assessment_active == "1" ?  this.modelKegiatan.assessment_active=true :  this.modelKegiatan.assessment_active=false 

                    
                    

                    console.log(this.modelKegiatan)
                    this.kegiatanDialog = true
                },
                 async    update(){
                    this.loadingButton = true
                    console.log('selectedId', this.modelKegiatan)
                   await DataService.updateKegiatan(this.modelKegiatan.id_kegiatan, this.modelKegiatan).then(response => {
                    console.log('Update Kegiatan Response', response)
                   
                    })
                    .catch(error => {
                        console.log(error)
                    })
                     await this.getAllKegiatan().then(response => {
                    console.log('All Kegiatan Response', response)
                     this.kegiatanDialog = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                                         this.$toast.add({
                    severity: 'success',
                    summary: 'Berhasil !',
                    detail: 'Data berhasil diupdate',
                    life: 3000
                });
                },
                resetModelKegiatan(){
                    this.selectedId = null
                    this.selectedIndex = null
                    this.modelKegiatan.id_kegiatan = null,
                    this.modelKegiatan.name = null
                    this.modelKegiatan.description = null
                    this.modelKegiatan.matching_active = null
                    this.modelKegiatan.assessment_active = null
                },
                async submit(){
                    this.editField = false
                    this.loadingButton = true
                    console.log('Submit Kegiatan Baru', this.modelKegiatan)
                    await DataService.postKegiatan(this.modelKegiatan).then(response => {
                    console.log('Delete Response', response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    await this.getAllKegiatan().then(response => {
                    console.log('All Kegiatan Response', response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    this.kegiatanDialog = false
                    this.loadingButton = false
                     this.$toast.add({
                    severity: 'success',
                    summary: 'Berhasil !',
                    detail: 'Data berhasil ditambahkan',
                    life: 3000
                });
                },
                async deleteSelectedKeyOption(data){
                    console.log('delete', data.data.id_kegiatan)
                    this.selectedId = data.data.id_kegiatan
                },
                async deleteFinal(){
                    const kegiatan={
                        "kegiatan": this.selectedId
                    }
                    this.loadingButton = true;
                    await DataService.deleteKegiatan(this.selectedId, kegiatan).then(response => {
                    
                    console.log('Delete Response', response)
                    
                })
                .catch(error => {
                    console.log(error)
                })
                    await this.getAllKegiatan().then(response => {
                    
                    console.log('All Kegiatan Response', response)
                    this.loadingButton = false
                    this.deleteDialog = false
                     this.$toast.add({
                    severity: 'success',
                    summary: 'Berhasil !',
                    detail: 'Data berhasil dihapus',
                    life: 3000
                });
                })
                .catch(error => {
                    console.log(error)
                })

                }
            }
    }
</script>

<style lang="css">

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

    :host>>>.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-state-active {
        background-color: #d90096;
        border: 1px solid #d600d9;
    }

    :host>>>.p-tabview .p-tabview-panels {
        background-color: red;
    }

    .p-datatable-wrapper {
        /* border-radius: 18px; */
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