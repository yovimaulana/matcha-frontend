<template>
    <div>
        <Toast />
        <div class="p-col-12 p-lg-12">
            <Breadcrumb class="custom-breadcrumb" :home="home" :model="items" />
        </div>

        <div v-if="this.daftarKegiatan == null" class="p-grid">
            <div class="p-col-6">
                <Skeleton  width="50%" height="3rem"
            style="margin-top: 10px; margin-left: 17px; border-radius: 0.357rem; background-color: #8080802b;" />
            </div>
            <div class="p-col-6">
                <Skeleton  width="30%" height="3rem"
            style="margin-top: 10px; margin-right: 17px; border-radius: 0.357rem; background-color: #8080802b; float: right;" />
            </div>
        </div>        
        <Skeleton v-if="this.daftarKegiatan == null"  width="calc(100% - 30px)" height="20rem"
            style="margin-top: 10px; margin-left: 17px; border-radius: 0.357rem; background-color: #8080802b;" />

        <Toolbar v-if="this.daftarKegiatan !== null" class="mb-4 ccm-custom" style="border: none; padding-bottom: 0; padding-left: 0; padding-right: 0"> 
            <template #start>  
                <h3 style="color: grey; letter-spacing: 0.5px; text-transform: uppercase;">Daftar Kegiatan</h3>
            </template>
            <template #end>
                <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="addNewKegiatan" />
            </template>
        </Toolbar>
        <DataTable style="box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);" v-if="this.daftarKegiatan !== null"
            stateStorage="session" stateKey="dt-state-kegiatan"
            :value="this.daftarKegiatan" v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['name','description']" :scrollable="true" stripedRows responsiveLayout="scroll"
            :rowHover="true" dataKey="id" :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10,25,50]" :rows="10"
            class="p-datatable-sm p-m-2 animate__animated animate__fadeIn ccm-custom"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <template #empty>
                <h5>Data tidak tersedia!</h5>
            </template>
            <template #loading>
                Mohon menunggu;
            </template>
            <template #header>
                <div class="flex justify-content-between" style="text-align: right">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText type="text" v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>

            <Column field="name" header="Nama Kegiatan"></Column>
            <Column field="description" header="Deskripsi"></Column>
            <Column header="Status Matching" field="matching_active">
                <template #body="col">
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Active" v-if="col.data.matching_active == 1" icon="pi pi-circle-fill"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #aaedf1; color: rgb(8 107 113);border-color: rgb(4 137 145); font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Inactive" v-if="col.data.matching_active == null" icon="pi pi-times-circle"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Done" v-if="col.data.matching_active == 0" icon="pi pi-check-circle"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

                </template>
            </Column>

            <Column header="Status Assessment" field="assessment_active">
                <template #body="col">
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Active" v-if="col.data.assessment_active == 1" icon="pi pi-circle-fill"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #aaedf1; color: rgb(8 107 113);border-color: rgb(4 137 145); font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Inactive" v-if="col.data.assessment_active == null" icon="pi pi-times-circle"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #ffcdd2; color: #c63737;border-color: #c63737; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                    <Button @click="changeStatus(col)" v-tooltip.top="'Click to change status!'" label="Done" v-if="col.data.assessment_active == 0" icon="pi pi-check-circle"
                        class="p-button-sm p-button-rounded p-button-status-matching-assessment"
                        style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />

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

        <Dialog v-model:visible="statusDialog" style="width: 450px" class="p-fluid" :closable="false">
            <template #header>
                <div style="width: 100%;text-align: center;font-weight: bolder;text-transform: uppercase; font-size: larger;">Ubah Status <br/><span style="color:#9155fd; font-style:italic">{{headerStatus}}</span></div>
            </template>
            <div class="heading-status-kegiatan-name">
                {{this.modelKegiatan.name}}
            </div>
            <div class="header-status-kegiatan">
                Current Status: <span>{{this.currentStatusText}}</span>
            </div>
            <div class="p-grid">                
                <div class="field p-col-12 p-lg-6">
                    <label style="display: block;" class="p-mb-3">Status Matching</label>
                    <div class="formgrid p-grid">
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Assessment'" id="matchingInactive" name="category_matching" value="x" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingInactive">Inactive</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Assessment'" id="matchingActive" name="category_matching" value="1" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingActive">Active</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Assessment'" id="matchingDone" name="category_matching" value="0" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingDone">Done</label>
                        </div>
                    
                    </div>
                </div>

                <div class="field p-col-12 p-lg-6" >
                    <label style="display: block;" class="p-mb-3">Status Assessment</label>
                    <div class="formgrid grid">
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Matching'" id="AssessmentInactive" name="category_assessment" value="x" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="AssessmentInactive">Inactive</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Matching'" id="AssessmentActive" name="category_assessment" value="1" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="AssessmentActive">Active</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton :disabled="headerStatus == 'Matching'" id="assessmentDone" name="category_assessment" value="0" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="assessmentDone">Done</label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="container-status-matching" v-if="headerStatus == 'Matching' && this.modelKegiatan.matching_active != 'x'">
                <div class="field col-12 md:col-4">
                    <label for="start_matching">Start Matching</label>
                    <InputMask id="start_matching" mask="9999-99-99" v-model="this.modelKegiatan.ma_start" placeholder="9999-99-99" slotChar="yyyy-mm-dd" />
                    <small class="p-error">Format: Tahun - Bulan - Tanggal</small>
                </div>
                <div class="field col-12 md:col-4" style="margin-top:10px" v-if="this.modelKegiatan.matching_active == '0'">
                    <label for="end_matching">End Matching</label>
                    <InputMask id="end_matching" mask="9999-99-99" v-model="this.modelKegiatan.ma_end" placeholder="9999-99-99" slotChar="yyyy-mm-dd" />
                    <small class="p-error">Format: Tahun - Bulan - Tanggal</small>
                </div>
            </div>

            <div id="container-status-assessment" v-if="headerStatus == 'Assessment' && this.modelKegiatan.assessment_active != 'x'">
                <div class="field col-12 md:col-4">
                    <label for="start_assessment">Start Assessment</label>
                    <InputMask id="start_assessment" mask="9999-99-99" v-model="this.modelKegiatan.as_start" placeholder="9999-99-99" slotChar="yyyy-mm-dd" />
                    <small class="p-error">Format: Tahun - Bulan - Tanggal</small>
                </div>
                <div class="field col-12 md:col-4" style="margin-top:10px" v-if="this.modelKegiatan.assessment_active == '0'">
                    <label for="end_assessment">End Assessment</label>
                    <InputMask id="end_assessment" mask="9999-99-99" v-model="this.modelKegiatan.as_end" placeholder="9999-99-99" slotChar="yyyy-mm-dd" />
                    <small class="p-error">Format: Tahun - Bulan - Tanggal</small>
                </div>
            </div>
            
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="statusDialog=false; this.resetModelKegiatan()" />
                <Button :loading="loadingButton" label="Save" icon="pi pi-check" class="p-button" @click="saveChangeStatus();" />
            </template>
        </Dialog>

        <Dialog v-model:visible="kegiatanDialog" :style="{width: '450px'}" :header="dialogHeader" class="p-fluid">
            <div class="field">
                <label for="name">Nama Kegiatan</label>
                <InputText id="name" type="text" v-model="modelKegiatan.name" />
            </div>
            <br>
            <div class="field">
                <label for="description">Deskripsi</label><br>
                <Textarea id="description" v-model="modelKegiatan.description" required="true" rows="3" cols="55" />
                </div>
            <br>
            <!-- <div class="p-grid" v-if="editField">
                <div class="field p-col-12 p-lg-6">
                    <label style="display: block;" class="p-mb-3">Status Matching</label>
                    <div class="formgrid p-grid">
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="matchingActive" name="category_matching" value="1" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingActive">Active</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="matchingInactive" name="category_matching" value="x" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingInactive">Inactive</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="matchingDone" name="category_matching" value="0" v-model="this.modelKegiatan.matching_active" />
                            <label class="p-ml-2" for="matchingDone">Done</label>
                        </div>
                    
                    </div>
                </div>

                <div class="field p-col-12 p-lg-6" >
                    <label style="display: block;" class="p-mb-3">Status Assessment</label>
                    <div class="formgrid grid">
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="AssessmentActive" name="category_assessment" value="1" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="AssessmentActive">Active</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="AssessmentInactive" name="category_assessment" value="x" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="AssessmentInactive">Inactive</label>
                        </div>
                        <div class="field-radiobutton p-col-12">
                            <RadioButton id="assessmentDone" name="category_assessment" value="0" v-model="this.modelKegiatan.assessment_active" />
                            <label class="p-ml-2" for="assessmentDone">Done</label>
                        </div>
                    
                    </div>
                </div>
            </div> -->

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="kegiatanDialog=false; this.resetModelKegiatan()" />
                <Button :loading="loadingButton" v-if="this.dialogHeader !== 'Edit Kegiatan'" label="Save" icon="pi pi-check" class="p-button" @click="submit();;" />
                <Button :loading="loadingButton" v-if="this.dialogHeader == 'Edit Kegiatan'" label="Update" icon="pi pi-check" class="p-button" @click="update();;" />
            </template>
        </Dialog>

         <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Hapus Data" class="p-fluid">

            <p>Apakah Anda yakin ingin menghapus kegiatan? Data kegiatan akan hilang selamanya.</p>
   
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="deleteDialog=false" />
                <Button :loading="loadingButton" label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteFinal()" />
            </template>
        </Dialog>

    </div>
</template>

<script>
    import DataService from '../services/DataService'
    import Breadcrumb from 'primevue/breadcrumb';
    import Toolbar from 'primevue/toolbar';
    import Dialog from 'primevue/dialog'
    import InputText from 'primevue/inputtext';
    import RadioButton from 'primevue/radiobutton';
    import Textarea from 'primevue/textarea';
    import Toast from 'primevue/toast';
    import Skeleton from 'primevue/skeleton';
    import Tooltip from 'primevue/tooltip';
    import InputMask from 'primevue/inputmask';
    import {
        FilterMatchMode
    } from 'primevue/api';

    export default {
        components: {
            Toolbar,
            Dialog,
            InputText,
            RadioButton,
            Textarea,
            Toast,
            Breadcrumb,
            Skeleton,
            Tooltip,
            InputMask
        },
        data() {
            return {                
                home: {
                    icon: 'pi pi-home',
                },
                items: [
                    {
                        label: 'Manajemen Kegiatan'
                    },                
                ],
                filters: {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    },
                },                           
                daftarKegiatan: null,
                kegiatanDialog: false,
                modelKegiatan: {
                    id_kegiatan: null,
                    name: null,
                    description: null,
                    matching_active: null,
                    assessment_active: null,
                    ma_start: null,
                    ma_end: null,
                    sa_start: null,
                    sa_end: null
                },
                selectedId: null,
                selectedIndex: null,
                dialogHeader: null,
                
                editField: false,
                loadingButton: false,
                deleteDialog: false,
                statusDialog: false,
                headerStatus: null,
                startMatching: null,
                currentStatusText: null,
            }
        },
        watch: {},
        created() {
           this.getAllKegiatan()
        },
        computed: {},
        methods:{
            async getAllKegiatan(){
                try {
                    this.daftarKegiatan = null
                    const kegiatan = await DataService.getAllKegiatan()    
                    this.daftarKegiatan = kegiatan.data.data  
                } catch (error) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error !!',
                        detail: 'Something went wrong!',
                        life: 2000
                    });
                    console.log(error)
                }                                
            },
            editKeySelected(data){                

                this.editField = true
                this.dialogHeader = 'Edit Kegiatan'
                this.selectedId = data.data.id_kegiatan
                this.selectedIndex = data.index

                this.modelKegiatan.id_kegiatan = data.data.id_kegiatan
                this.modelKegiatan.name = data.data.name
                this.modelKegiatan.description = data.data.description
                this.modelKegiatan.matching_active = data.data.matching_active ? "1" : (data.data.matching_active == '0'  ? '0' : 'x')
                this.modelKegiatan.assessment_active = data.data.assessment_active ? "1" : (data.data.assessment_active == '0'  ? '0' : 'x')

                this.kegiatanDialog = true

            },
            async update(){
                
                const modelSent = {...this.modelKegiatan}
                modelSent.matching_active = modelSent.matching_active == 'x' ? null : (modelSent.matching_active == '1' ? 1 : 0)
                modelSent.assessment_active = modelSent.assessment_active == 'x' ? null : (modelSent.assessment_active == '1' ? 1 : 0)

                try {
                    this.loadingButton = true
                    const result = await DataService.updateKegiatan(this.modelKegiatan.id_kegiatan, modelSent)
                    this.loadingButton = false

                    if(result.data.meta.status == 'error') {
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error !!',
                            detail: result.data.data.error_message,
                            life: 2000
                        });                        
                        return
                    }
                    
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Sukses !!',
                        detail: 'Berhasil update data kegiatan',
                        life: 2000
                    });
                    this.kegiatanDialog = false
                    this.resetModelKegiatan()
                    this.getAllKegiatan()

                } catch (error) {
                    this.loadingButton = false
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error !!',
                        detail: 'Something went wrong!',
                        life: 2000
                    });
                    console.log(error)
                }                          
            },
            resetModelKegiatan(){
                this.selectedId = null
                this.selectedIndex = null
                this.modelKegiatan.id_kegiatan = null
                this.modelKegiatan.name = null
                this.modelKegiatan.description = null
                this.modelKegiatan.matching_active = null
                this.modelKegiatan.assessment_active = null
                this.modelKegiatan.ma_start = null
                this.modelKegiatan.ma_end = null
                this.modelKegiatan.as_start = null
                this.modelKegiatan.as_end = null
            },            
            async deleteSelectedKeyOption(data){
                this.selectedId = data.data.id_kegiatan
                this.selectedIndex = data.index
            },
            async deleteFinal() {

                const kegiatan = {
                    "kegiatan": this.selectedId
                }

                try {
                    this.loadingButton = true;
                    const result = await DataService.deleteKegiatan(this.selectedId, kegiatan)
                    this.loadingButton = false;
                    
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Berhasil !',
                        detail: 'Data berhasil dihapus',
                        life: 2000
                    });
                    this.deleteDialog = false
                    this.getAllKegiatan()
                } catch (error) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error !!',
                        detail: 'Something went wrong!',
                        life: 2000
                    });
                    this.loadingButton = false;
                    console.log(error)
                }                                     
            },
            addNewKegiatan() {
                this.kegiatanDialog = true
                this.editField = false
                this.dialogHeader = 'Tambah Kegiatan'
            },
            async submit() {
                try {
                    this.loadingButton = true
                    const result = await DataService.postKegiatan(this.modelKegiatan)
                    this.loadingButton = false
                    console.log(result)
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Berhasil !',
                        detail: 'Data berhasil disimpan',
                        life: 2000
                    });
                    this.kegiatanDialog = false
                    this.resetModelKegiatan()                    
                    this.getAllKegiatan()
                } catch (error) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error !!',
                        detail: 'Something went wrong!',
                        life: 2000
                    });
                    this.loadingButton = true
                    console.log(error)
                }               
            },
            changeStatus(data) {
                this.modelKegiatan.id_kegiatan = data.data.id_kegiatan
                this.modelKegiatan.name = data.data.name
                this.modelKegiatan.description = data.data.description
                this.modelKegiatan.matching_active = data.data.matching_active ? "1" : (data.data.matching_active == '0'  ? '0' : 'x')
                this.modelKegiatan.assessment_active = data.data.assessment_active ? "1" : (data.data.assessment_active == '0'  ? '0' : 'x')                
                this.modelKegiatan.ma_start = data.data.ma_start ? new Date(data.data.ma_start).toLocaleDateString('en-CA') : null
                this.modelKegiatan.ma_end = data.data.ma_end ? new Date(data.data.ma_end).toLocaleDateString('en-CA') : null
                this.modelKegiatan.as_start = data.data.as_start ? new Date(data.data.as_start).toLocaleDateString('en-CA') : null
                this.modelKegiatan.as_end = data.data.as_end ? new Date(data.data.as_end).toLocaleDateString('en-CA') : null
                if(data.field == 'matching_active') {
                    this.headerStatus = 'Matching'
                    this.currentStatusText = data.data.matching_active ? "Active" : (data.data.matching_active == '0'  ? 'Done' : 'Inactive')                    
                } else {
                    this.headerStatus = 'Assessment'
                    this.currentStatusText = data.data.assessment_active ? "Active" : (data.data.assessment_active == '0'  ? 'Done' : 'Inactive')
                }                                
                this.statusDialog = true
            },
            async saveChangeStatus() {
                const modelSent = {...this.modelKegiatan}
                modelSent.matching_active = modelSent.matching_active == 'x' ? null : (modelSent.matching_active == '1' ? 1 : 0)
                modelSent.assessment_active = modelSent.assessment_active == 'x' ? null : (modelSent.assessment_active == '1' ? 1 : 0)
                modelSent.ma_end = modelSent.ma_end ? modelSent.ma_end : null
                modelSent.ma_start = modelSent.ma_start ? modelSent.ma_start : null
                modelSent.as_start = modelSent.as_start ? modelSent.as_start : null
                modelSent.as_end = modelSent.as_end ? modelSent.as_end : null
                

                try {
                    this.loadingButton = true
                    const result = await DataService.updateKegiatan(this.modelKegiatan.id_kegiatan, modelSent)
                    this.loadingButton = false

                    if(result.data.meta.status == 'error') {
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error !!',
                            detail: result.data.data.error_message,
                            life: 2000
                        });                        
                        return
                    }
                    
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Sukses !!',
                        detail: 'Berhasil update data kegiatan',
                        life: 2000
                    });
                    this.statusDialog = false
                    this.resetModelKegiatan()
                    this.getAllKegiatan()

                } catch (error) {
                    this.loadingButton = false
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error !!',
                        detail: 'Something went wrong!',
                        life: 2000
                    });
                    console.log(error)
                }  

            }
        }
    }
</script>

<style scoped>       

    ::v-deep(tr td) {
        padding: 30px !important;        
    }

    ::v-deep(thead th) {
        background-color: #f3f2f7 !important;
        vertical-align: top;
        text-transform: uppercase;
        font-size: .857rem;
        letter-spacing: .5px;
        text-align: center !important;
        height: 80px;
    }

    ::v-deep(div.p-column-header-content) {
        width: 100%;
    }

    ::v-deep(span.p-column-title) {
        margin: 0 auto;
    }

    .p-button-status-matching-assessment {
        margin: 0 auto;
        /* cursor: default; */
    }

    .p-button-status-matching-assessment:focus {
        box-shadow: none;
    }

    .ccm-custom {
        margin-left: 15px !important;
        width: calc(100% - 30px);
    }

    .header-status-kegiatan {
        background: #61e4be;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        color: darkgreen;
        font-weight: 700;
        text-transform: uppercase;
    }

    .heading-status-kegiatan-name {
        overflow: hidden;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 15px;
        font-weight: bolder;
    }

    .heading-status-kegiatan-name:before, .heading-status-kegiatan-name:after {
        background-color: #000;
        content: "";
        display: inline-block;
        height: 4px;
        position: relative;
        vertical-align: middle;
        width: 50%;
    }

    .heading-status-kegiatan-name:before {
        right: 0.5em;
        margin-left: -50%;
    }

    .heading-status-kegiatan-name:after {
        left: 0.5em;
        margin-right: -50%;
    }    

</style>