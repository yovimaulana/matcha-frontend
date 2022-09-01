<template>
    <div>
        <Toast />
        <div :class="'p-col-12 p-lg-12'">
            <Breadcrumb :home="home" :model="items" />
        </div>

        <Dropdown v-if="kegiatanOptions !== null"
            :class="'p-col-12 p-lg-12 '+myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
            v-model="selectedKegiatan" :options="kegiatanOptions.data" optionLabel="name" :filter="true"
            placeholder="Pilih Kegiatan" :showClear="true" @change="getUserData(currentUser.id)"
            style="border-radius: 0.357rem; width: 98%">
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

        <div v-if="this.successMessage !== null">
            <br><br>
            <img src="../assets/matcha.png" class="hvr-bob mybob p-mt-1 " style="width: 30%; height: 18%;" alt=""
                srcset="">
            <br><br>
            <h1>Selamat. Kamu sudah selesai Assessment</h1>
            <h3> Ayo kerja lagi.</h3>
            <p style="font-style: italic; ">
                <span>So little time, so <span style="font-weight: 900;color:#78b34d"> MatchA </span> to do</span>
            </p>
        </div>

        <div v-if="this.errorMessages.length !== 0">
            <br><br>
            <img src="../assets/matcha404.png" class="hvr-bob mybob p-mt-1 " style="width: 30%; height: 18%;" alt=""
                srcset="">
            <br><br>
            <h1>Aww...Jangan Nangis.</h1>
            <h3>Ini cuma error kecil! Ayo kerja lagi.</h3>
            <p style="font-style: italic; ">
                <span>So little time, so <span style="font-weight: 900;color:#78b34d"> MatchA </span> to do</span>
            </p>
        </div>

        <!-- frame ala ala -->
        <div class="p-grid p-jc-center">
            <iframe v-if="this.dataKegiatan == null && this.errorMessages.length == 0 && this.successMessage == null"
                src="https://embed.lottiefiles.com/animation/107059" style="max-height:100%; overflow: auto;"
                class="p-mt-4" width="500" height="500" frameBorder="0"></iframe>
        </div>

        <div v-if="this.errorMessages.length !== 0">
            <br><br>
            <Message v-for="(error) in this.errorMessages" v-bind:key="error" severity="error">{{error}}</Message>
        </div>

        <!-- progres assessment user -->
        <div v-if="this.dataKegiatan !== null">
            <div class="p-col-12 p-lg-12" style="padding-left:0; padding-right: 0">
                <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                    :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                    style="border-radius: 0.357rem;">
                    <template #title>
                        Progress
                    </template>
                    <template #content>
                        <div class="p-grid p-jc-center " style=" border-left-color: red; ">
                            <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                                <div>
                                    <span style="font-size: 40px;"> {{dataKegiatan['summary']['belum_assessment']}}
                                    </span> <br>
                                    Belum Assessment
                                </div>
                            </div>
                            <div class="p-col-1">
                                <Divider layout="vertical" />
                            </div>
                            <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                                <div>
                                    <span style="font-size: 40px;"> {{dataKegiatan['summary']['sudah_assessment']}}
                                    </span> <br>
                                    Sudah Assessment
                                </div>
                            </div>
                            <div class="p-col-1">
                                <Divider layout="vertical" />
                            </div>
                            <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                                <div>
                                    <span style="font-size: 40px;"> {{
                                    dataKegiatan['summary']['total_data_assessment']}}
                                    </span>
                                    <br>
                                    Total
                                </div>
                            </div>
                            <div class="p-col-12 p-mt-4">
                                <ProgressBar style="color:white;"
                                    :value="parseFloat(((dataKegiatan['summary']['sudah_assessment'] / dataKegiatan['summary']['total_data_assessment'])*100).toFixed(2))" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>

        <div v-if="this.dataAssessmentNonArray !== null" class="p-col-12 p-grid p-jc-between p-m-2 p-p-2"
            style="margin-left:0px !important">
            <Button style="font-weight: 900;border-radius: 0.357rem; width: 45%" label="Skip" icon="pi pi-forward"
                class="p-col-12 p-lg-6 p-button-info p-jc-center p-ripple p-button-lg p-button-raised" @click="skip()">
                <i class="pi pi-forward p-mr-2"></i> Skip
            </Button>
            <Button style="font-weight:900;border-radius: 0.357rem; width:45%" :label="'Submit'"
                class="p-col-12 p-lg-6 p-button-success p-jc-center p-ripple p-button-lg p-button-raised"
                icon="pi pi-send" @click="submit()">
                <i class="pi pi-send p-mr-2"></i> Submit
            </Button>
        </div>

        <DataTable style="box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%); margin-left: 8px; margin-right: 8px"
            v-if="dataAssessmentNonArray !== null" :value="dataAssessmentNonArray"
            :class="myCardBgColorData+' '+myTextColorData" responsiveLayout="scroll" stripedRows>
            <Column field="title" :class="myCardBgColorData+' '+myTextColorData" header="Variabel"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{slotProps.data.title}}
                </template>
            </Column>

            <Column field="value" :class="myCardBgColorData+' '+myTextColorData" header="Data SBR"
                headerStyle="width:3em;">
                <template #body="slotProps">
                    <RadioButton
                        v-if="!['provinsi', 'kabupaten_kota', 'kecamatan', 'kelurahan_desa'].includes(slotProps.data.variable)"
                        v-model="selectedDataNonArray[slotProps.data.variable]"
                        :id="'rb'+(slotProps.index)" :name="slotProps.data.variable"
                        :value="slotProps.data.value.sbr.value"
                        @change="onChangeValue(slotProps.data.variable, 'sbr')" />
                    <label :for="'rb'+(slotProps.index)" class="p-ml-2">
                        {{slotProps.data.value.sbr.value}}
                    </label>
                </template>
            </Column>

            <template v-for="i in dataAssessmentNonArray[0].value.assessment.length" :key="i">
                <Column :field="'sumber'+(i)" :class="myCardBgColorData+' '+myTextColorData"
                    :header="'Data Assessment - '+(i) " headerStyle="width:3em;">
                    <template #body="slotProps">
                        <RadioButton
                            v-if="!['provinsi', 'kabupaten_kota', 'kecamatan', 'kelurahan_desa'].includes(slotProps.data.variable)"
                            v-model="selectedDataNonArray[slotProps.data.variable]" :name="slotProps.data.variable"
                            :id="'rba'+(slotProps.index)+'-'+(i)" :value="slotProps.data.value.assessment[i-1]['value']"
                            @change="onChangeValue(slotProps.data.variable, 'assessment', i-1)" />
                        <label class="p-ml-2" :for="'rba' + (slotProps.index) + '-' + (i)">
                            {{slotProps.data.value.assessment[i-1]['value']}}
                        </label>
                    </template>
                </Column>
            </template>

            <Column :class="myCardBgColorData+' '+myTextColorData" header="Selected Value" headerStyle="width:3em;">
                <template #body="slotProps">
                    <div>
                        <p style="background-color: lightgrey; padding:5px">{{
                        selectedDataNonArray[slotProps.data.variable]
                        }}</p>
                        <Button icon="pi pi-pencil" class="p-button-warning p-button-sm p-button-raised" label="Edit"
                            @click="editValueSelected(slotProps.data.variable)" />
                    </div>
                </template>
            </Column>

        </DataTable>

        <DataTable v-if="dataAssessmentAktivitas != null" :rowClass="rowClass" rowGroupMode="rowspan"
            groupRowsBy="dataAssessmentAktivitas.status"
            style="box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%); margin-left: 8px; margin-right: 8px; margin-top: 10px"
            :value="dataAssessmentAktivitas" :class="myCardBgColorData+' '+myTextColorData" responsiveLayout="scroll">
            <template #header>
                <div class="table-header-tmp">
                    KEGIATAN / AKTIVITAS PERUSAHAAN
                </div>
            </template>
            <Column header="#" headerStyle="width:3em">
                <template #body="slotProps">
                    {{slotProps.index + 1}}
                </template>
            </Column>
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <span>{{slotProps.data.status}}</span>
                </template>
            </Column>
            <Column field="sumber" :class="myCardBgColorData+' '+myTextColorData" header="Sumber Data"></Column>
            <Column field="aktivitas" :class="myCardBgColorData+' '+myTextColorData" header="Aktivitas"></Column>
            <Column field="jenis" :class="myCardBgColorData+' '+myTextColorData" header="Jenis"></Column>
            <Column field="kategori" :class="myCardBgColorData+' '+myTextColorData" header="Kategori"></Column>
            <Column field="kbli" :class="myCardBgColorData+' '+myTextColorData" header="KBLI"></Column>
            <Column :class="myCardBgColorData+' '+myTextColorData" header="Action">
                <template #body="slotProps">
                    <Button
                        @click="dataAssessmentAktivitas[slotProps.index]['tpsumber'] = 'sbr'; dataAssessmentAktivitas[slotProps.index]['status'] = 'SAVED' "
                        v-if="slotProps.data.tpsumber == 'assessment'" icon="pi pi-plus"
                        class="p-button-primary p-button-sm p-button-raised" label="" title="Add to SBR" />
                    <Button @click="openDialogAktivitas(slotProps)" v-if="slotProps.data.tpsumber == 'sbr'"
                        icon="pi pi-pencil" class="p-button-warning p-button-sm p-button-raised" label=""
                        title="Edit SBR" />
                    <br />
                    <Button
                        @click="dataAssessmentAktivitas[slotProps.index]['tpsumber'] = 'assessment'; dataAssessmentAktivitas[slotProps.index]['status'] = 'IGNORED'"
                        style="margin-top: 5px"
                        v-if="slotProps.data.tpsumber == 'sbr' && slotProps.data.orisumber == 'assessment'"
                        icon="pi pi-undo" class="p-button-danger p-button-sm p-button-raised" label=""
                        title="Batal Tambah SBR" />
                </template>
            </Column>
            <template #footer>
                Total data aktivitas yang akan disimpan: {{dataAssessmentAktivitas.filter(el => el.tpsumber ==
                'sbr').length}}
            </template>
        </DataTable>

        <Toast />

        <Loading v-model:active="loadingDialog" :is-full-page="true" :color="'#86d166'" :background-color="'black'"
            :opacity="0.7">
            <slot>
                <MyLoading></MyLoading>
            </slot>
        </Loading>

        <!-- dialog aktivitas perusahaan -->
        <Dialog :header="'Edit Aktivitas'" v-model:visible="displayDialogAktivitas" :style="{width: '50vw'}">
            <div class="field">
                <label style="margin-bottom: 0.5rem; color: darkgrey; font-size: smaller"
                    for="act_aktivitas">Aktivitas</label>
                <InputText style="width:100%" id="act_aktivitas" v-model="dataEditedAktivitas['aktivitas']" />
            </div>
            <div class="field" style="margin-top:10px">
                <label style="margin-bottom: 0.5rem; color: darkgrey; font-size: smaller" for="act_jenis">Jenis</label>
                <Dropdown id="act_jenis" style="width: 100%" :options="optionJenisAktivitas" optionLabel="nama"
                    optionValue="nama" placeholder="" :filter="true" v-model="dataEditedAktivitas['jenis']" />
            </div>
            <div class="field" style="margin-top:10px">
                <label style="margin-bottom: 0.5rem; color: darkgrey; font-size: smaller"
                    for="act_kategori">Kategori</label>
                <InputText style="width:100%" id="act_kategori" v-model="dataEditedAktivitas['kategori']" />
            </div>
            <div class="field" style="margin-top:10px">
                <label style="margin-bottom: 0.5rem; color: darkgrey; font-size: smaller" for="act_kbli">KBLI</label>
                <InputText style="width:100%" id="act_kbli" v-model="dataEditedAktivitas['kbli']" />
            </div>

            <template #footer>
                <Button label="No" icon="pi pi-times" @click="displayDialogAktivitas=false" class="p-button-text" />
                <Button label="Save" icon="pi pi-check" @click="saveEditedAktivitas()" />
            </template>
        </Dialog>

        <!-- dialog edit value text dropdown dan date -->
        <Dialog :header="'Edit Value - '+titleDialogEdit" v-model:visible="displayFormEditTextAndDate"
            :style="{width: '50vw'}">
            <div v-if="dialogTypeEdit=='text'">

                <InputText autofocus @keyup.enter="saveTempEditDialog(this.selectedKeyForEdit)" style="width:100%;"
                    v-model="editedValue" />
            </div>
            <div style="text-align: center" v-else-if="dialogTypeEdit == 'date'">
                <Calendar v-model="editedValue" dateFormat="yy-mm-dd" :inline="true" />
            </div>
            <div v-else-if="dialogTypeEdit == 'dropdown'">
                <Skeleton v-if="optionEditDialog == null" width="100%" height="2.5rem" />
                <Dropdown v-else style="width: 100%" v-model="editedValue" :options="optionEditDialog"
                    optionLabel="nama" optionValue="nama" placeholder="" :filter="true" />
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="displayFormEditTextAndDate=false" class="p-button-text" />
                <Button label="Save" icon="pi pi-check" @click="saveTempEditDialog(this.selectedKeyForEdit)" />
            </template>
        </Dialog>

    </div>
    <ScrollTop />
</template>
<script>
import DataService from '../services/DataService'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import ProgressBar from 'primevue/progressbar'
import Message from 'primevue/message'
import Toolbar from 'primevue/toolbar'
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Skeleton from 'primevue/skeleton';
import ScrollTop from 'primevue/scrolltop';

import MyLoading from '../components/MyLoading.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        InputText,
        ProgressBar,
        Message,
        RadioButton,
        Dialog,
        Toast,
        Toolbar,
        Breadcrumb,
        MyLoading,
        Loading,        
        Calendar,
        Dropdown,
        Skeleton,
        ScrollTop
    },    
    data() {
        return {
            myShadow: '',
            home: {
                icon: 'pi pi-home',
            },
            items: [{
                label: 'Assessment',
                to: '/assessment'
            },
            ],    
            optionJenisAktivitas: [
                {nama: 'SBR_MAIN_ACTIVITY'},
                {nama: 'SBR_SECONDARY_ACTIVITY'},
                {nama: 'SBR_OTHER_ACTIVITY'},
            ],  
            dataToSend : {},
            dataEditedAktivitas: {},     
            selectedKegiatan: null,
            kegiatanOptions: null,
            loadingDialog: false, 
            errorMessages: [],
            successMessage: null,
            dataKegiatan: null,
            selectedDataNonArray: {},
            selectedDataNonArrayHidden: {},
            selectedDataValue: {},
            selectedKeyForEdit: null,
            editedValue: null,
            displayFormEditTextAndDate: false,
            titleDialogEdit: '',
            idAlokasi: null,
            idPerusahaan: null,
            optionEditDialog: null,            
            displayDialogAktivitas: false,
            metaVariable: [                
                {
                    'variable' : 'alamat',
                    'title': 'Alamat',
                    'type': 'text',
                    'value': null
                },
                // 'jam_buka': 'Jam Buka',
                // 'jam_tutup': 'Jam Tutup',
                {
                    'variable': 'jumlah_kamar',
                    'title': 'Jumlah Kamar',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'kode_pos',
                    'title': 'Kode Pos',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'kodese',
                    'title': 'Kode SE',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'latitude',
                    'title': 'Latitude',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'longitude',
                    'title': 'Longitude',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'nama',
                    'title': 'Nama Perusahaan',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'nama_komersial',
                    'title': 'Nama Komersial Perusahaan',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'nomor_kode_area',
                    'title': 'Kode Area',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'npwp',
                    'title': 'NPWP',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'pajak_tahun_pendaftarannpwp',
                    'title': 'Tahun Pendaftaran NPWP',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'pajak_tahunspt',
                    'title': 'Tahun SPT',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'pajak_tanggal_update',
                    'title': 'Tanggal Update Pajak',
                    'type': 'date',
                    'value': null
                },
                {
                    'variable': 'pendapatan_per_tahun',
                    'title': 'Pendapatan Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_pendapatan',
                    'title': 'Tahun Referensi Pendapatan',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'pengeluaran_per_tahun',
                    'title': 'Pengeluaran Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_pengeluaran',
                    'title': 'Tahun Referensi Pengeluaran',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'pengusaha_pemilik',
                    'title': 'Nama Pemilik Usaha',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_beroperasi',
                    'title': 'Tahun Perusahaan Beroperasi',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_pendirian',
                    'title': 'Tahun Perusahaan Berdiri',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'aset',
                    'title': 'Aset',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_aset',
                    'title': 'Tahun Referensi Aset',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'total_kompensasi_asing_per_tahun',
                    'title': 'Total Kompensasi Asing Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_kompensasi_asing',
                    'title': 'Tahun Referensi Kompensasi Asing',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'total_kompensasi_lokal_per_tahun',
                    'title': 'Total Kompensasi Lokal Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_kompensasi_lokal',
                    'title': 'Tahun Referensi Kompensasi Lokal',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'total_tenaga_kerja_asing_per_tahun',
                    'title': 'Total Tenaga Kerja Asing Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_tenaga_kerja_asing',
                    'title': 'Tahun Referensi Tenaga Kerja Asing',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'total_tenaga_kerja_lokal_per_tahun',
                    'title': 'Total Tenaga Kerja Lokal Per Tahun',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tahun_ref_tenaga_kerja_lokal',
                    'title': 'Tahun Referensi Tenaga Kerja Lokal',
                    'type': 'text',
                    'value': null
                },
                {
                    'variable': 'tanggal_lahir_pengusaha',
                    'title': 'Tanggal Lahir Pengusaha',
                    'type': 'date',
                    'value': null
                },
                {
                    'variable': 'aktivitas_perusahaan',
                    'title': 'Aktivitas',
                    'type': 'array',
                    'value': null,                    
                },
                {
                    'variable': 'alamat_email_perusahaan',
                    'title': 'Email',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'alamat_fax_perusahaan',
                    'title': 'Fax',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'alamat_telepon_perusahaan',
                    'title': 'Telepon',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'alamat_web_perusahaan',
                    'title': 'Web',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'kontak_perusahaan',
                    'title': 'Kontak Perusahaan',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'pemegang_saham',
                    'title': 'Saham',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'produk_perusahaan',
                    'title': 'Produk',
                    'type': 'array',
                    'value': null,
                },
                {
                    'variable': 'jaringan_usaha',
                    'title': 'Jaringan Usaha',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'jaringan-usaha',
                    'evfunc': 'jaringan-usaha',
                    'master': null
                },
                {
                    'variable': 'jenis_badan_hukum_badan_usaha',
                    'title': 'Badan Hukum',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'badan-hukum',
                    'evfunc': 'badan-hukum',
                    'master': null
                },
                // {
                //     'variable': 'kbji_pengusaha_nama',
                //     'title': 'KBJI Pengusaha',
                //     'type': 'dropdown',
                //     'value': null,
                //     'refMaster': 'kbji-pengusaha'
                // },
                {
                    'variable': 'kewarganegaraan_pengusaha',
                    'title': 'Kewarganegaraan Pengusaha',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'kewarganegaraan-pengusaha',
                    'evfunc': 'negara',
                    'master': null
                },
                {
                    'variable': 'pajak_jeniswp',
                    'title': 'Jenis Wajib Pajak',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'jeniswp',
                    'evfunc': 'jenis-wp',
                    'master': null
                },
                {
                    'variable': 'pajak_skala_usaha',
                    'title': 'Skala Usaha Pajak',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'skalawp',
                    'evfunc': 'skala-wp',
                    'master': null
                },
                {
                    'variable': 'pajak_statuswp',
                    'title': 'Status Wajib Pajak',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'statuswp',
                    'evfunc': 'status-wp',
                    'master': null
                },
                {
                    'variable': 'sektor_institusi',
                    'title': 'Sektor Institusi',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'sektor-institusi',
                    'evfunc': 'sektor-institusi',
                    'master': null
                },
                {
                    'variable': 'skala_usaha',
                    'title': 'Skala Usaha',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'skala-usaha',
                    'evfunc': null,
                    'master': [
                        { 'id': null, 'nama': 'SBR_MIKRO', 'kode': 'SBR_MIKRO' },
                        { 'id': null, 'nama': 'SBR_KECIL', 'kode': 'SBR_KECIL' },
                        { 'id': null, 'nama': 'SBR_MENENGAH', 'kode': 'SBR_MENENGAH' },
                        { 'id': null, 'nama': 'SBR_BESAR', 'kode': 'SBR_BESAR' },
                        { 'id': null, 'nama': 'SBR_BESAR_TENTATIF', 'kode': 'SBR_BESAR_TENTATIF' },
                    ]
                },
                {
                    'variable': 'tahun_ref_skala_usaha',
                    'title': 'Tahun Referensi Skala Usaha',
                    'type': 'text',
                    'value': null,                                      
                },                
                {
                    'variable': 'status_perusahaan',
                    'title': 'Status Perusahaan',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'status-perusahaan',
                    'evfunc': 'status-perusahaan',
                    'master': null
                },  
                {
                    'variable': 'unit_statistik',
                    'title': 'Unit Statistik',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'unit-statistik',
                    'evfunc': null,
                    'master': [
                        { 'id': null, 'nama': 'SBR_ENTERPRISE', 'kode': 'SBR_ENTERPRISE' },
                        { 'id': null, 'nama': 'SBR_ENTERPRISE_GROUP', 'kode': 'SBR_ENTERPRISE_GROUP' },
                        { 'id': null, 'nama': 'SBR_ESTABLISHMENT', 'kode': 'SBR_ESTABLISHMENT' },
                        { 'id': null, 'nama': 'SBR_ANCILLARY_UNIT', 'kode': 'SBR_ANCILLARY_UNIT' },
                    ]
                },
                {
                    'variable': 'jenis_kelamin_pengusaha',
                    'title': 'Jenis Kelamin Pengusaha',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'jk-pengusaha',
                    'evfunc': null,
                    'master': [
                        { 'id': null, 'nama': 'L', 'kode': 'L' },
                        { 'id': null, 'nama': 'P', 'kode': 'P' },
                    ]
                },      
                {
                    'variable': 'multi_national_status',
                    'title': 'Multinational Status',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'multinational-status',
                    'evfunc': null,
                    'master': [
                        { 'id': null, 'nama': 'SBR_MNE', 'kode': 'SBR_MNE' },
                        { 'id': null, 'nama': 'SBR_NON_MNE', 'kode': 'SBR_NON_MNE' },
                    ]
                },
                {
                    'variable': 'status_kepemilikan',
                    'title': 'Status Kepemilikan',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'status-kepemilikan',
                    'evfunc': null,
                    'master': [
                        { 'id': null, 'nama': 'SBR_PMDN', 'kode': 'SBR_PMDN' },
                        { 'id': null, 'nama': 'SBR_PMA', 'kode': 'SBR_PMA' },
                    ]
                },  
                {
                    'variable': 'negara',
                    'title': 'Negara',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'negara-perusahaan',                    
                    'evfunc': 'negara',
                    'master': null
                },      
                {
                    'variable': 'provinsi',
                    'title': 'Provinsi',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'provinsi-perusahaan',
                    'evfunc': 'provinsi',
                    'master': null
                },  
                {
                    'variable': 'kabupaten_kota',                    
                    'title': 'Kabupaten/Kota',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'kabupaten-perusahaan',
                    'evfunc': 'kabupaten',
                    'master': null
                },
                {
                    'variable': 'kecamatan',
                    'title': 'Kecamatan',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'kecamatan-perusahaan',
                    'evfunc': 'kecamatan',
                    'master': null
                },
                {
                    'variable': 'kelurahan_desa',
                    'title': 'Desa',
                    'type': 'dropdown',
                    'value': null,
                    'refMaster': 'desa-perusahaan',
                    'evfunc': 'desa',
                    'master': null
                },
                
            ],            
            dataAssessmentNonArray: null,
            dataAssessmentArray: null,
            dataAssessmentAktivitas: null,
            dialogTypeEdit: null,
            masterJaringanUsaha: null,
            masterBadanHukum: null,
            masterNegara: null,
            masterJenisWP: null,
            masterSkalaWP: null,
            masterStatusWP: null,
            masterSektorInstitusi: null,
            masterSkalaUsaha: [
                { 'id': null, 'nama': 'SBR_MIKRO', 'kode': 'SBR_MIKRO' },
                { 'id': null, 'nama': 'SBR_KECIL', 'kode': 'SBR_KECIL' },
                { 'id': null, 'nama': 'SBR_MENENGAH', 'kode': 'SBR_MENENGAH' },
                { 'id': null, 'nama': 'SBR_BESAR', 'kode': 'SBR_BESAR' },
                { 'id': null, 'nama': 'SBR_BESAR_TENTATIF', 'kode': 'SBR_BESAR_TENTATIF' },
            ],
            masterStatusPerusahaan: null,
            masterUnitStatistik: [
                {'id': null, 'nama': 'SBR_ENTERPRISE', 'kode': 'SBR_ENTERPRISE'},
                { 'id': null, 'nama': 'SBR_ENTERPRISE_GROUP', 'kode': 'SBR_ENTERPRISE_GROUP' },
                { 'id': null, 'nama': 'SBR_ESTABLISHMENT', 'kode': 'SBR_ESTABLISHMENT' },
                { 'id': null, 'nama': 'SBR_ANCILLARY_UNIT', 'kode': 'SBR_ANCILLARY_UNIT' },
            ],
            masterJkPengusaha: [
                {'id': null, 'nama': 'L', 'kode': 'L'},
                { 'id': null, 'nama': 'P', 'kode': 'P' },
            ],
            masterMultinationalStatus: [
                { 'id': null, 'nama': 'SBR_MNE', 'kode': 'SBR_MNE' },
                { 'id': null, 'nama': 'SBR_NON_MNE', 'kode': 'SBR_NON_MNE' },
            ],
            masterStatusKepemilikan: [
                { 'id': null, 'nama': 'SBR_PMDN', 'kode': 'SBR_PMDN' },
                { 'id': null, 'nama': 'SBR_PMA', 'kode': 'SBR_PMA' },
            ],
            masterProvinsi: null,
            masterKabupatenKota: null,
            masterKecamatan: null,
            masterDesa: null,
            masterDropdown: null
        }
    },
    async created() {        
        await DataService.getKegiatanActiveAssessment()
        .then(response => {
            this.kegiatanOptions = response.data                            
        })
        .catch(error => {
            console.log(error)
        });
        
    },
    watch: {
        myCardBgColorData(newX) {
            // console.log(`new ${newX}`)
            if (newX == 'mydarkcardcolor') {
                this.headerBg = '#312d4b'
                this.textColor = '#cfcbe4'
            } else {
                this.headerBg = '#ffffff'
                this.textColor = '#726b7c'
            }
        },
        displayFormEditTextAndDate(value) {
            // klo dialog nutup
            if(!value) {
                this.optionEditDialog = null
            }
        },
        displayDialogAktivitas(value) {
            if (!value) this.dataEditedAktivitas = {}
        },
        // 'selectedDataNonArray.provinsi'(value) {            
        //     this.selectedDataNonArray['kabupaten_kota'] = null
        //     this.selectedDataNonArrayHidden['kabupaten_kota_id'] = null
        //     this.selectedDataNonArray['kecamatan'] = null
        //     this.selectedDataNonArrayHidden['kecamatan_id'] = null
        //     this.selectedDataNonArray['kelurahan_desa'] = null
        //     this.selectedDataNonArrayHidden['kelurahan_desa_id'] = null
        // },
        // 'selectedDataNonArray.kabupaten_kota'(value) {            
        //     this.selectedDataNonArray['kecamatan'] = null
        //     this.selectedDataNonArrayHidden['kecamatan_id'] = null
        //     this.selectedDataNonArray['kelurahan_desa'] = null
        //     this.selectedDataNonArrayHidden['kelurahan_desa_id'] = null
        // },
        // 'selectedDataNonArray.kecamatan'(value) {            
        //     this.selectedDataNonArray['kelurahan_desa'] = null
        //     this.selectedDataNonArrayHidden['kelurahan_desa_id'] = null
        // },
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
        onChangeValue(param, source, index = null) {
            if (param == 'kabupaten_kota' && this.selectedDataNonArray['provinsi'] == null) { this.toastMessage('error', 'Error!', 'Ups, Isian provinsi harus terisi dahulu! :('); this.selectedDataNonArray[param] = null; return; }
            if (param == 'kecamatan' && this.selectedDataNonArray['kabupaten_kota'] == null) { this.toastMessage('error', 'Error!', 'Ups, Isian kabupaten/kota harus terisi dahulu! :('); this.selectedDataNonArray[param] = null; return; }
            if (param == 'kelurahan_desa' && this.selectedDataNonArray['kecamatan'] == null) { this.toastMessage('error', 'Error!', 'Ups, Isian kecamatan harus terisi dahulu! :('); this.selectedDataNonArray[param] = null; return; }                    

            let tempT = this.dataAssessmentNonArray.filter((data) => data.variable == param)
            // console.log(tempT, source, index)
            if(tempT[0]['type'] == 'dropdown' && tempT[0]['evfunc'] != null) {                
                this.selectedDataNonArrayHidden[param+'_id'] = index == null ? tempT[0]['value'][source]['id'] : tempT[0]['value'][source][index]['id']
            } else {                
                this.selectedDataNonArrayHidden[param] = index == null ? tempT[0]['value'][source]['value'] : tempT[0]['value'][source][index]['value']
            }            
            // console.log(this.selectedDataNonArrayHidden)
        },
        saveTempEditDialog(keyEdit) {
            this.displayFormEditTextAndDate = false;
            let tempT = this.dataAssessmentNonArray.filter((data) => data.variable == keyEdit)
            if(tempT[0]['type'] == 'dropdown' && tempT[0]['evfunc'] != null) {
                // console.log(this.optionEditDialog, this.editedValue)
                let tempY = this.optionEditDialog.filter((ev) => ev.nama == this.editedValue)                
                this.selectedDataNonArrayHidden[keyEdit+'_id'] = tempY[0]['id']
            } else {
                this.selectedDataNonArrayHidden[keyEdit] = this.editedValue
            }            
            this.selectedDataNonArray[keyEdit] = this.editedValue
            // console.log(this.selectedDataNonArrayHidden)
        },
        skip() {
            this.getData()
        },
        convertDate(data) {
            
            if(data == null) return;

            let year = data.getFullYear(),
                month = data.getMonth() + 1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth(),
                day = data.getDate() < 10 ? '0'+data.getDate() : data.getDate();
            return `${year}-${month}-${day}`
        }, 
        // async getIdFromDropdown(vardata, data) {
        //     if(data == null) return null;

        //     if(vardata.evfunc == null) return data
            
        //     let tempMaster = await this.getMasterData(vardata.evfunc, data).then(() => {
        //         return this.masterDropdown
        //     })
            
        //     let idTemp = null
        //     if(tempMaster.length > 0) idTemp = tempMaster[0]['id']

        //     console.log(tempMaster.filter((master) => master.nama == data), data)

        //     return idTemp

        // },
        async submit() {
            // let variableNonArray = this.metaVariable.filter(object => {
            //     return ['text', 'date', 'dropdown'].includes(object.type);
            // });
            // for (let i = 0; i < variableNonArray.length; i++) { 
            //     let dataTmp = null
            //     if (variableNonArray[i]['type'] == 'date') { 
            //         dataTmp = this.convertDate(this.selectedDataNonArray[variableNonArray[i]['variable']]) 
            //     } else if (variableNonArray[i]['type'] == 'dropdown') {                     
            //         // dataTmp = await this.getIdFromDropdown(variableNonArray[i], this.selectedDataNonArray[variableNonArray[i]['variable']])                    
            //     } else { 
            //         dataTmp = this.selectedDataNonArray[variableNonArray[i]['variable']] 
            //     }
                
            //     this.dataToSend[variableNonArray[i]['variable'].replace("nama", "id")] = dataTmp
            // }
            
            // console.log(this.selectedDataNonArray, this.dataAssessmentAktivitas, this.dataToSend)

            console.log(this.selectedDataNonArrayHidden)
        },
        saveEditedAktivitas() {
            this.displayDialogAktivitas = false
            this.dataAssessmentAktivitas[this.dataEditedAktivitas['index']]['aktivitas'] = this.dataEditedAktivitas['aktivitas']
            this.dataAssessmentAktivitas[this.dataEditedAktivitas['index']]['jenis'] = this.dataEditedAktivitas['jenis']
            this.dataAssessmentAktivitas[this.dataEditedAktivitas['index']]['kategori'] = this.dataEditedAktivitas['kategori']
            this.dataAssessmentAktivitas[this.dataEditedAktivitas['index']]['kbli'] = this.dataEditedAktivitas['kbli']
            console.log(this.dataAssessmentAktivitas)
        },
        openDialogAktivitas(data) {        
            this.displayDialogAktivitas = true
            this.dataEditedAktivitas['index'] = data.index
            this.dataEditedAktivitas['aktivitas'] = data.data.aktivitas
            this.dataEditedAktivitas['jenis'] = data.data.jenis
            this.dataEditedAktivitas['kategori'] = data.data.kategori
            this.dataEditedAktivitas['kbli'] = data.data.kbli            
        },
        rowClass(data) {
            return data.tpsumber === 'assessment' ? 'row-assessment' : null;
        },    
        isAssessmentDone(response) {
            let status = false;
            if (response.data.data.summary.sudah_assessment == response.data.data.summary
                .total_data_assessment) 
            {
                this.dataKegiatan = null
                this.dataAssessmentNonArray = null
                this.errorMessages = []
                this.successMessage = "Selamat. Kamu sudah selesai Assessment"
                this.loadingDialog = false
                status = true
            } 
            return status
        },      
        async getData() {
            this.loadingDialog = true
            await DataService.getDataAssessment(this.selectedKegiatan.id_kegiatan, this.currentId)
                .then(response => {
                    
                    if(response.data.meta.status == 'success')
                    {
                        // kalo assessment sudah selesai, stop proses.
                        if(this.isAssessmentDone(response)) return;

                        
                        this.dataKegiatan = response.data.data
                        // this.dataToSend['id_perusahaan'] = this.dataKegiatan.id_perusahaan
                        // this.dataToSend['id_alokasi'] = this.dataKegiatan.id_alokasi
                        // this.dataToSend['idsbr'] = this.dataKegiatan.data_sbr.idsbr
                        
                        // variable assessment type text
                        let variableNonArray = this.metaVariable.filter(object => {
                            return ['text', 'date', 'dropdown'].includes(object.type);
                        });

                        
                        for(let i=0; i<variableNonArray.length; i++) {                        
                            let tempVar = {},
                                isEqualTemp = true;                            

                            tempVar['sbr'] = {
                                'value': this.dataKegiatan.data_sbr[variableNonArray[i]['variable'] + (variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? '_nama' : '')],
                                'id': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_sbr[variableNonArray[i]['variable']+'_id'] : null,
                                'nama': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_sbr[variableNonArray[i]['variable'] + '_nama'] : null,
                                'kode': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_sbr[variableNonArray[i]['variable'] + '_kode'] : null,                                
                            };

                            let tempAss = [];
                            for(let j=0; j<this.dataKegiatan.data_assessment.length; j++) {
                                let tempAssEach = {
                                    'sumber': this.dataKegiatan.data_assessment[j].sumber_data,
                                    'no': j + 1,
                                    'value': this.dataKegiatan.data_assessment[j][variableNonArray[i]['variable'] + (variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? '_nama' : '')],
                                    'id': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_assessment[j][variableNonArray[i]['variable'] + '_id'] : null,
                                    'nama': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_assessment[j][variableNonArray[i]['variable'] + '_nama'] : null,
                                    'kode': variableNonArray[i]['type'] == 'dropdown' && variableNonArray[i]['evfunc'] != null ? this.dataKegiatan.data_assessment[j][variableNonArray[i]['variable'] + '_kode'] : null,
                                }

                                tempAss.push(tempAssEach)
                                if(tempVar['sbr']['value'] != tempAssEach['value']) isEqualTemp = false
                            }                            
                            tempVar['assessment'] = tempAss;
                            variableNonArray[i]['value'] = tempVar;    
                            
                            // init radio name
                            this.selectedDataNonArray[variableNonArray[i]['variable']] = isEqualTemp ? tempVar['sbr']['value'] : null;
                        }

                        this.dataAssessmentNonArray = variableNonArray;                        

                        // aktivitas perusahaan
                        let tempDataAktivitas = [];
                        let aktivitasSBR = this.dataKegiatan.data_sbr.aktivitas_perusahaan;
                        for (let i = 0; i < aktivitasSBR.length; i++) {
                            tempDataAktivitas.push({
                                'id': aktivitasSBR[i]['id'],
                                'status': 'SAVED',
                                'orisumber': 'sbr',
                                'tpsumber': 'sbr',
                                'sumber': 'Data SBR',
                                'aktivitas': aktivitasSBR[i]['aktivitas'],
                                'jenis': aktivitasSBR[i]['jenis'],
                                'kategori': aktivitasSBR[i]['kategori'],
                                'kbli': aktivitasSBR[i]['kbli'],
                            })
                        }
                        let aktivitasAssessment = this.dataKegiatan.data_assessment;
                        for(let i=0; i<aktivitasAssessment.length; i++) {
                            tempDataAktivitas.push({
                                'id': null,
                                'status': 'IGNORED',
                                'orisumber': 'assessment',
                                'tpsumber': 'assessment',
                                'sumber': 'Data Assessment ('+aktivitasAssessment[i]['sumber_data']+')',
                                'aktivitas': aktivitasAssessment[i]['aktivitas_perusahaan'],
                                'jenis': '-',
                                'kategori': aktivitasAssessment[i]['kategori_aktivitas_perusahaan'],
                                'kbli': aktivitasAssessment[i]['kbli_aktivitas_perusahaan'],
                            })
                        }
                        this.dataAssessmentAktivitas = tempDataAktivitas                        


                        // console.log(this.dataAssessmentNonArray)
                        this.setDefaultCon()
                        return;
                    }

                    this.errorHandler(response.data.meta.message)
                })
                .catch(error => {
                    console.log(error)
                    this.errorHandler(error.response.data.meta.message)
                })
        },
        async getUserData($id) {
            // console.log('userid', $id)
            this.currentId = $id
            this.getData()
        },                
        async getMasterData(param, param2 = null) {              
            await DataService.getDataMaster(param, param2).then(response => {
                this.masterDropdown = response.data.data
            }).catch(error => {
                console.log(error)
                this.errorHanlder(error.response.data.meta.message)
            })
        },
        setDefaultCon() {
            this.errorMessages = []
            this.successMessage = null
            this.loadingDialog = false
        },
        errorHandler(errorMessage) {
            this.dataKegiatan = null
            this.dataAssessmentNonArray = null
            this.loadingDialog = false            
            this.successMessage = null
            this.errorMessages.push(errorMessage)
            this.$toast.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'Ups, ada error :(',
                life: 5000
            });

        },  
        toastMessage(type, title, message) {
            this.$toast.add({
                severity: type,
                summary: title,
                detail: message,
                life: 2000
            });
        },
        editValueSelected(variable) {
            
            this.selectedKeyForEdit = variable     
            let tempMetaVariable = this.dataAssessmentNonArray.find(meta => {
                return meta.variable == variable
            })                
            this.titleDialogEdit = tempMetaVariable == undefined ? '' : tempMetaVariable.title
            this.dialogTypeEdit = tempMetaVariable.type

            if (this.dialogTypeEdit == 'dropdown') {
                let refMaster = tempMetaVariable.refMaster,
                    param = null;

                if(tempMetaVariable.evfunc != null) {

                    if (refMaster == 'kabupaten-perusahaan') {
                        if (this.selectedDataNonArray['provinsi'] == null) {this.toastMessage('error', 'Error!', 'Ups, Isian provinsi harus terisi dahulu! :('); return;}                    
                        param = this.selectedDataNonArray['provinsi'];
                    } 
                    
                    if (refMaster == 'kecamatan-perusahaan') {
                        if (this.selectedDataNonArray['kabupaten_kota'] == null) {this.toastMessage('error', 'Error!', 'Ups, Isian kabupaten/kota harus terisi dahulu! :('); return;}
                        param = this.selectedDataNonArray['kabupaten_kota'];
                    }
                    
                    if(refMaster == 'desa-perusahaan') {
                        if (this.selectedDataNonArray['kecamatan'] == null) { this.toastMessage('error', 'Error!', 'Ups, Isian kecamatan harus terisi dahulu! :('); return; }                        
                        param = this.selectedDataNonArray['kecamatan'];
                    }

                    this.getMasterData(tempMetaVariable.evfunc, param).then(() => {
                        this.optionEditDialog = this.masterDropdown
                    })
                } else {
                    switch(refMaster) {
                        case 'skala-usaha':
                            this.optionEditDialog = this.masterSkalaUsaha;
                            break;
                        case 'unit-statistik':
                            this.optionEditDialog = this.masterUnitStatistik;
                            break;
                        case 'jk-pengusaha':
                            this.optionEditDialog = this.masterJkPengusaha;
                            break;
                        case 'multinational-status':
                            this.optionEditDialog = this.masterMultinationalStatus;
                            break;
                        case 'status-kepemilikan':
                            this.optionEditDialog = this.masterStatusKepemilikan;
                            break;
                        default:
                            break;                       
                    }                                            
                }                                               
                
            }
            
            this.editedValue = this.selectedDataNonArray[variable] == null ? '' : this.selectedDataNonArray[variable]
            this.displayFormEditTextAndDate = true            
        },                                                                      
    }
}
</script>
<style scoped>

:deep(.row-assessment) {
    background-color: rgba(0, 0, 0, .15) !important;
} /* ga ngefek */

.table-header-tmp {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
p-progressbar .p-progressbar-label {
    color: white;
    line-height: 1.5rem;
}

.p-progressbar-label {
    color: white !important;
}

.cardBg {
    background-color: #9155fd;
    color: white;
}

.p-breadcrumb {
    border: none;
    /* border-radius: 14px; */
    border-radius: 0.428rem;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}

nav {
    background-color: v-bind(headerBg) !important;
    color: v-bind(textColor) !important;
}

.p-menuitem-text {
    color: v-bind(textColor) !important;
}

.p-breadcrumb ul li .p-breadcrumb-chevron {
    color: v-bind(textColor) !important;
}

.p-breadcrumb ul li .p-menuitem-link .p-menuitem-icon {
    color: v-bind(textColor) !important;
}

.p-dropdown .p-dropdown-label .p-placeholder {
    color: v-bind(textColor) !important;
}

.p-input-text {
    color: v-bind(textColor) !important;
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
</style>