<template>
    <div class="about">
        <Toast />
        <br><br>
        <img src="../assets/bps.svg" class="hvr-bob mybob p-mt-1 " style="width: 100px" alt="" srcset="">
        <div class="p-col-12 p-lg-12 p-grid p-d-flex p-jc-center p-ai-center padded" style="margin-left: 0;">

            <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-col-8 p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <template #title>
                    Form Katalog Data SBR

                </template>
                <template #content>
                    <div class=" ">
                        <div class="p-fluid ">
                            <div class="p-field p-mb-4 ">
                                <span class="p-float-label ">
                                    <Dropdown v-model="formModel.subjectMatter" :options="direktoratOptions"
                                        optionLabel="name" optionValue="code" placeholder="Pilih Direktorat"
                                        :class="classFormModel.subjectMatter" />

                                </span>
                            </div>
                            <div class="p-field p-mb-4">

                                <span class="p-float-label">
                                    <InputText v-model="formModel.namaKegiatan" placeholder="Nama Kegiatan"
                                        id="nama_kegiatan" type="text" :class="classFormModel.namaKegiatan" />
                                    <label for="nama_kegiatan">Nama Kegiatan</label>
                                </span>
                            </div>
                            <div class="p-field p-mb-4">

                                <span class="p-float-label">
                                    <InputText v-model="formModel.contactPerson" placeholder="Contact Person"
                                        id="contact_person" type="text" :class="classFormModel.contactPerson" />
                                    <label for="contact_person">Contact Person</label>
                                </span>
                                <span style="float:left; color: grey; font-size: small; text-align: left">Contoh Isian: Nama - No HP ->
                                    Rudi - 0857111111111</span>
                            </div>
                            <div class="p-field p-mb-4" style="margin-top: 35px">

                                <span class="p-float-label">
                                    <MultiSelect v-model="selectedTahun" :options="tahunKegiatanOptions"
                                        optionLabel="name" placeholder="Tahun Kegiatan"
                                        :class="classFormModel.selectedTahun" />

                                </span>
                            </div>


                            <div class="p-grid" v-if="this.selectedTahun !== []">
                                <!-- 2020 -->
                                <!-- {{this.selectedTahun.filter(e => e.code === '2020')[0].code}} -->
                                <div class="p-col-12 p-lg-6" v-if="tahun2020Display">
                                    <h1>2020</h1>
                                    <div class="p-field p-mb-4">
                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkData2020" placeholder="Link Data 2020"
                                                id="linkdata2020" type="text" :class="classFormModel.linkData2020" />
                                            <label for="linkdata2020">Link Data 2020</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkMetadata2020"
                                                placeholder="Link Metadata 2020" id="nama_kegiatan" type="text"
                                                :class="classFormModel.linkMetadata2020" />
                                            <label for="linkmetadata2020">Link Metadata 2020</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkBukuPedoman2020"
                                                placeholder="Link Buku Pedoman 2020" id="linkBukuPedoman2020"
                                                type="text" :class="classFormModel.linkBukuPedoman2020" />
                                            <label for="linkBukuPedoman2020">Link Buku Pedoman 2020</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkKuesioner2020"
                                                placeholder="Link Kuisioner 2020" id="linkKuesioner2020" type="text"
                                                :class="classFormModel.linkKuesioner2020" />
                                            <label for="linkKuesioner2020">Link Kuisioner 2020</label>
                                        </span>
                                    </div>
                                </div>
                                <!-- 2021 -->
                                <div class="p-col-12 p-lg-6" v-if="tahun2021Display ">
                                    <h1>2021</h1>
                                    <div class="p-field p-mb-4">
                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkData2021" placeholder="Link Data 2021"
                                                id="linkdata2021" type="text" :class="classFormModel.linkData2021" />
                                            <label for="linkdata2021">Link Data 2021</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkMetadata2021"
                                                placeholder="Link Metadata 2021" id="nama_kegiatan" type="text"
                                                :class="classFormModel.linkMetadata2021" />
                                            <label for="linkmetadata2021">Link Metadata 2021</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkBukuPedoman2021"
                                                placeholder="Link Buku Pedoman 2021" id="linkBukuPedoman2021"
                                                type="text" :class="classFormModel.linkBukuPedoman2021" />
                                            <label for="linkBukuPedoman2021">Link Buku Pedoman 2021</label>
                                        </span>
                                    </div>
                                    <div class="p-field p-mb-4">

                                        <span class="p-float-label">
                                            <InputText v-model="formModel.linkKuesioner2021"
                                                placeholder="Link Kuisioner 2021" id="linkKuesioner2021" type="text"
                                                :class="classFormModel.linkKuesioner2021" />
                                            <label for="linkKuesioner2021">Link Kuisioner 2021</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- <Button label="Tambah Kegiatan" class="p-button-info " @click="submit()" icon="" />  -->
                            <Button label="Submit" class="p-button-success " @click="submit()" icon="" />

                        </div>
                        <hr class="dashed-2">
                        <div class=" " style="margin-top: 30px" >
                            <p class="">COPYRIGHT © 2022 <span
                                    style="color: #00aeef;font-weight: 700;">B</span><span
                                    style="color: #8cc63f;font-weight: 700;">P</span><span
                                    style="color: #f7941e;font-weight: 700;">S</span>, All rights Reserved 
                            <br/>Thank you
                                so <span style="color: #78b34d; font-weight: 700;">MatchA</span> for what you do</p>
                            <p class=""><span style="font-weight: 700;">&lt; /&gt; &nbsp;</span> dengan <i
                                    class="p-ml-2 pi pi-heart-fill animate__animated animate__flash animate__slow animate__infinite	infinite hvr-pulse-grow "
                                    style="color: #D32F2F"></i></p>
                        </div>

                    </div>
                </template>

            </Card>


        </div>


        <Loading v-model:active="loadingDialog" :is-full-page="true" :color="'#86d166'" :background-color="'black'"
            :opacity="0.7">
            <slot>

                <MyLoading></MyLoading>
            </slot>
        </Loading>

    </div>
</template>
<script>
    import InputText from 'primevue/inputtext';
    import Toast from 'primevue/toast';
    import MyLoading from '../components/MyLoading.vue'
    import MultiSelect from 'primevue/multiselect';


    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import axios from 'axios'
    // import Dropdown from 'primevue/dropdown';
    export default {
        components: {
            InputText,
            Toast,
            MultiSelect,
            MyLoading,
            Loading
            // Dropdown
        },
        data() {
            return {
                selectedTahun: [],
                direktoratOptions: [{
                        name: 'Pengembangan Metodologi Sensus dan Survei',
                        code: 'Pengembangan Metodologi Sensus dan Survei'
                    },
                    {
                        name: 'Diseminasi Statistik',
                        code: 'Diseminasi Statistik'
                    },
                    {
                        name: 'Sistem Informasi Statistik',
                        code: 'Sistem Informasi Statistik'
                    },
                    {
                        name: 'Statistik Kependudukan dan Ketenagakerjaan',
                        code: 'Statistik Kependudukan dan Ketenagakerjaan'
                    },
                    {
                        name: 'Statistik Kesejahteraan Rakyat',
                        code: 'Statistik Kesejahteraan Rakyat'
                    },
                    {
                        name: 'Statistik Ketahanan Sosial',
                        code: 'Statistik Ketahanan Sosial'
                    },
                    {
                        name: 'Statistik Tanaman Pangan, Hortikultura, dan Perkebunan',
                        code: 'Statistik Tanaman Pangan, Hortikultura, dan Perkebunan'
                    },
                    {
                        name: 'Statistik Peternakan, Perikanan, dan Kehutanan',
                        code: 'Statistik Peternakan, Perikanan, dan Kehutanan'
                    },
                    {
                        name: 'Statistik Industri',
                        code: 'Statistik Industri'
                    },
                    {
                        name: 'Statistik Distribusi',
                        code: 'Statistik Distribusi'
                    },
                    {
                        name: 'Statistik Harga',
                        code: 'Statistik Harga'
                    },
                    {
                        name: 'Statistik Keuangan, Teknologi Informasi, dan Pariwisata',
                        code: 'Statistik Keuangan, Teknologi Informasi, dan Pariwisata'
                    },
                    {
                        name: 'Neraca Produksi',
                        code: 'Neraca Produksi'
                    },
                    {
                        name: 'Neraca Pengeluaran',
                        code: 'Neraca Pengeluaran'
                    },
                    {
                        name: 'Analisis dan Pengembangan Statistik',
                        code: 'Analisis dan Pengembangan Statistik'
                    },


                ],
                tahunKegiatanOptions: [{
                        name: '2020',
                        code: '2020'
                    },
                    {
                        name: '2021',
                        code: '2021'
                    },
                ],
                tahun2020Display: false,
                tahun2021Display: false,
                formModel: {
                    subjectMatter: null,
                    namaKegiatan: null,
                    contactPerson: null,
                    linkData2020: null,
                    linkMetadata2020: null,
                    linkBukuPedoman2020: null,
                    linkKuesioner2020: null,
                    linkData2021: null,
                    linkMetadata2021: null,
                    linkBukuPedoman2021: null,
                    linkKuesioner2021: null
                },
                classFormModel: {
                    subjectMatter: null,
                    namaKegiatan: null,
                    contactPerson: null,
                    selectedTahun: null,
                    linkData2020: null,
                    linkMetadata2020: null,
                    linkBukuPedoman2020: null,
                    linkKuesioner2020: null,
                    linkData2021: null,
                    linkMetadata2021: null,
                    linkBukuPedoman2021: null,
                    linkKuesioner2021: null
                },
                loadingDialog: false,
                finalForm: null
            }
        },
        watch: {
            selectedTahun(newValue) {
                // console.log('new', newValue)
                // console.log('old', oldValue)
                this.tahun2020Display = false
                this.tahun2021Display = false
                if (newValue === []) {
                    this.tahun2020Display = false
                    this.tahun2021Display = false
                }

                newValue.forEach(element => {
                    if (element.code === '2020') this.tahun2020Display = true
                    if (element.code === '2021') this.tahun2021Display = true
                });
            }
        },
        methods: {
            async submit() {
                this.loadingDialog = true
                if (this.validate()) {
                    if (this.tahun2020Display && this.tahun2021Display) {
                         var allForm = [{
                            "tahun_kegiatan": 2020,
                            "subject_matter": this.formModel.subjectMatter,
                            "nama_kegiatan": this.formModel.namaKegiatan,
                            "contact_person": this.formModel.contactPerson,
                            "link_data": this.formModel.linkData2020,
                            "link_metadata": this.formModel.linkMetadata2020,
                            "link_bukped": this.formModel.linkBukuPedoman2020,
                            "link_kuesioner": this.formModel.linkKuesioner2020
                        },
                        {
                            "tahun_kegiatan": 2021,
                            "subject_matter": this.formModel.subjectMatter,
                            "nama_kegiatan": this.formModel.namaKegiatan,
                            "contact_person": this.formModel.contactPerson,
                            "link_data": this.formModel.linkData2021,
                            "link_metadata": this.formModel.linkMetadata2021,
                            "link_bukped": this.formModel.linkBukuPedoman2021,
                            "link_kuesioner": this.formModel.linkKuesioner2021
                        }
                    ]
                    this.finalForm = allForm

                    }

                    if (this.tahun2020Display && (this.tahun2021Display == false)) {
                        var form2020 = [{
                            "tahun_kegiatan": 2020,
                            "subject_matter": this.formModel.subjectMatter,
                            "nama_kegiatan": this.formModel.namaKegiatan,
                            "contact_person": this.formModel.contactPerson,
                            "link_data": this.formModel.linkData2020,
                            "link_metadata": this.formModel.linkMetadata2020,
                            "link_bukped": this.formModel.linkBukuPedoman2020,
                            "link_kuesioner": this.formModel.linkKuesioner2020
                        }]

                        this.finalForm = form2020
                    }

                    if (this.tahun2021Display && (this.tahun2020Display == false)) {
                        var form2021 = [ {
                            "tahun_kegiatan": 2021,
                            "subject_matter": this.formModel.subjectMatter,
                            "nama_kegiatan": this.formModel.namaKegiatan,
                            "contact_person": this.formModel.contactPerson,
                            "link_data": this.formModel.linkData2021,
                            "link_metadata": this.formModel.linkMetadata2021,
                            "link_bukped": this.formModel.linkBukuPedoman2021,
                            "link_kuesioner": this.formModel.linkKuesioner2021
                        }]

                        this.finalForm = form2021
                    }
                   
                    try {
                        await axios.post("https://matcha-dev.bps.go.id/matcha-backend/api/direktori-link-sm",
                                this.finalForm)
                            .then(response => {
                                console.log('response', response)
                                console.log('final Form', this.finalForm)
                                this.formModel = {
                                    subjectMatter: null,
                                    namaKegiatan: null,
                                    contactPerson: null,
                                    linkData2020: null,
                                    linkMetadata2020: null,
                                    linkBukuPedoman2020: null,
                                    linkKuesioner2020: null,
                                    linkData2021: null,
                                    linkMetadata2021: null,
                                    linkBukuPedoman2021: null,
                                    linkKuesioner2021: null
                                }

                                this.classFormModel = {
                                    subjectMatter: null,
                                    namaKegiatan: null,
                                    contactPerson: null,
                                    selectedTahun: null,
                                    linkData2020: null,
                                    linkMetadata2020: null,
                                    linkBukuPedoman2020: null,
                                    linkKuesioner2020: null,
                                    linkData2021: null,
                                    linkMetadata2021: null,
                                    linkBukuPedoman2021: null,
                                    linkKuesioner2021: null
                                }
                                this.loadingDialog = false
                                this.$toast.add({
                                    severity: 'success',
                                    summary: 'Berhasil !',
                                    detail: 'Data berhasil ditambahkan',
                                    life: 3000
                                });
                            }).catch(error => {
                                console.log(error)
                                this.loadingDialog = false
                                this.$toast.add({
                                    severity: 'error',
                                    summary: 'Gagal !',
                                    detail: 'Terdapat kesalahan pada jaringan anda',
                                    life: 3000
                                })
                            })
                    } catch (error) {
                        console.log('error service', error)
                        this.loadingDialog = false
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Gagal !',
                            detail: 'Ups ada error',
                            life: 3000
                        })
                    }
                } else {
                    this.loadingDialog = false
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Ups !',
                        detail: 'Ada field yang belum terisi',
                        life: 3000
                    });
                }
            },
            validate() {
                if (this.formModel.subjectMatter !== null &&
                    this.formModel.namaKegiatan !== null &&
                    this.formModel.contactPerson !== null &&
                    this.selectedTahun.length !== 0
                ) {
                    console.log('second if')
                    if (this.selectedTahun.length > 0) {
                        if (this.tahun2020Display && this.tahun2021Display) {
                            if (
                                this.formModel.linkMetadata2020 !== null &&
                                this.formModel.linkBukuPedoman2020 !== null &&
                                this.formModel.linkKuesioner2020 !== null &&
                                this.formModel.linkData2021 !== null &&
                                this.formModel.linkMetadata2021 !== null &&
                                this.formModel.linkBukuPedoman2021 !== null &&
                                this.formModel.linkKuesioner2021 !== null
                            ) {
                                // this.selectedTahun.filter(e => e.code === '2020')
                                return true
                            } else {
                                Object.keys(this.classFormModel).forEach(element => {
                                    this.formModel[element] == null || this.formModel[element].trim() == '' ? this.classFormModel[element] =
                                        'p-invalid' :
                                        this
                                        .classFormModel[element] = ''
                                });
                                return false
                            }
                        }

                        if (this.tahun2020Display && (this.tahun2021Display == false)) {
                            if (
                                this.formModel.linkData2020 !== null &&
                                this.formModel.linkMetadata2020 !== null &&
                                this.formModel.linkBukuPedoman2020 !== null &&
                                this.formModel.linkKuesioner2020 !== null
                            ) {
                                // this.selectedTahun.filter(e => e.code === '2020')
                                return true
                            } else {
                                Object.keys(this.classFormModel).forEach(element => {
                                    this.formModel[element] == null || this.formModel[element].trim() == '' ? this.classFormModel[element] =
                                        'p-invalid' :
                                        this
                                        .classFormModel[element] = ''
                                });
                                return false
                            }
                        }

                        if (this.tahun2021Display && (this.tahun2020Display == false)) {
                            if (
                                this.formModel.linkData2021 !== null &&
                                this.formModel.linkMetadata2021 !== null &&
                                this.formModel.linkBukuPedoman2021 !== null &&
                                this.formModel.linkKuesioner2021 !== null
                            ) {
                                // this.selectedTahun.filter(e => e.code === '2020')
                                return true
                            } else {
                                Object.keys(this.classFormModel).forEach(element => {
                                    this.formModel[element] == null || this.formModel[element].trim() == '' ? this.classFormModel[element] =
                                        'p-invalid' :
                                        this
                                        .classFormModel[element] = ''
                                });
                                return false
                            }
                        }

                    } else {
                        Object.keys(this.classFormModel).forEach(element => {
                            this.formModel[element] == null || this.formModel[element].trim() == '' ? this.classFormModel[element] = 'p-invalid' : this
                                .classFormModel[element] = ''
                        });
                        return false
                    }

                } else {

                    Object.keys(this.classFormModel).forEach(element => {
                        // console.log(typeof element, element)
                        if (element != 'selectedTahun') {
                            // console.log('before', element, this.classFormModel[element], this.formModel[element])
                            this.formModel[element] == null || this.formModel[element].trim() == '' ? this.classFormModel[element] = 'p-invalid' : this
                                .classFormModel[element] = ''
                            console.log('after', element, this.classFormModel[element], this.formModel[element])
                        }
                        this.selectedTahun.length == 0 ? this.classFormModel['selectedTahun'] = 'p-invalid' : this
                            .classFormModel['selectedTahun'] = ''


                    });
                    return false
                }







            }
        }
    }
</script>

<style>
        
    body {
        /* background-color: #f5f5f5 !important; */
        background-color: #f5f4f9 !important;
    }
</style>

<style scoped>

    @media only screen and (max-width: 700px) {
        .padded .p-card {
            flex: 100%;
        }
    }
    .dashed-2 {
        margin-top: 35px;
        border: none;
        height: 0.7px;
        background: grey;
        background: repeating-linear-gradient(90deg, grey, grey 6px, transparent 6px, transparent 12px);
    }
    .p-card {
        border-radius: 0.375rem !important;
        max-width: 800px !important;
        box-shadow: 0.5rem 0.5rem 2rem 0 rgb(8 15 41 / 8%),
            0 0 1px 0 rgb(8 15 41 / 8%);
    }
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
</style>