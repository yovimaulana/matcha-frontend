<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <Toast />
        <!-- {{usersKegiatan}} halo -->
        <Loading v-model:active="loadingDialog" :is-full-page="true" :color="'#86d166'" :background-color="'black'"
            :opacity="0.7">
            <slot>

                <MyLoading></MyLoading>
            </slot>
        </Loading>
        <div class="p-col-12 p-lg-12">
            <div>


            </div>


            <!-- <Card @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 18px;">
                <template #title>

                </template>
                <template #content>
                    <div class="p-col-12">

                        <div>

                            <Dropdown v-if="kegiatanOptions !== null"
                                :class="'p-col-12 p-lg-12 '+myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                                v-model="selectedKegiatan" :options="kegiatanOptions.data"
                                @change="getUsersKegiatan(selectedKegiatan)" optionLabel="name" :filter="true"
                                placeholder="Pilih Kegiatan" :showClear="true">
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">

                                        <div>{{slotProps.value.name}}</div>
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="country-item">

                                        <div>{{slotProps.option.name}}</div>
                                    </div>
                                </template>
                            </Dropdown>
                            <br><br>

                            <Card v-if="usersKegiatan !== null" @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                                style="border-radius: 18px;">
                                <template #title>
                                    Progress
                                </template>
                                <template #content>
                                    <div class="p-grid p-jc-center " style=" border-left-color: red; ">
                                        <div class="p-col-3 p-lg-3 p-md-12 p-sm-12">
                                            <div>
                                                <span style="font-size: 40px;">
                                                    {{this.usersKegiatan.data.summary.belum_teralokasi}} </span>
                                                <br>
                                                Belum Teralokasi
                                            </div>
                                        </div>
                                        <div class="p-col-1">
                                            <Divider layout="vertical" />
                                        </div>
                                        <div class="p-col-3 p-lg-3 p-md-12 p-sm-12">
                                            <div>
                                                <span style="font-size: 40px;">
                                                    {{this.usersKegiatan.data.summary.teralokasi}} </span>
                                                <br>
                                                Sudah Teralokasi
                                            </div>
                                        </div>
                                        <div class="p-col-1">
                                            <Divider layout="vertical" />
                                        </div>
                                        <div class="p-col-3 p-lg-3 p-md-12 p-sm-12">
                                            <div>
                                                <span style="font-size: 40px;">
                                                    {{this.usersKegiatan.data.summary.total_data_matching}}
                                                </span>
                                                <br>
                                                Total
                                            </div>
                                        </div>
                                        <div class="p-col-12 p-mt-4">
                                            <ProgressBar style="color:white;"
                                                :value="((this.usersKegiatan.data.summary.teralokasi/this.usersKegiatan.data.summary.total_data_matching)*100).toFixed(2)" />

                                        </div>
                                    </div>
                                </template>
                            </Card>
                            <br><br>
                            <div class="p-grid">
                                <div class="p-col-6 p-lg-6">
                                    <DataTable v-if="users !== null" :rowHover="true" :value="users.data"
                                        responsiveLayout="scroll"
                                        :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn p-col-12'"
                                        style="">
                                        <template #header>
                                            <div style="text-align: left">
                                                Daftar User
                                            </div>


                                        </template>
                                        <Column field="name" header="Nama "></Column>
                                        <Column header="Aksi">
                                            <template #body="col">

                                                <Button label="Alokasi" @click="alocateSelectedUser(col)"
                                                    icon="pi pi-arrow-right" />
                                            </template>
                                        </Column>


                                    </DataTable>
                                </div>

                                <div class="p-col-6 p-lg-6">
                                    <DataTable v-if="usersKegiatan !== null" :value="usersKegiatan.data.alokasi"
                                        responsiveLayout="scroll" :rowHover="true"
                                        :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn p-col-12'"
                                        >
                                        <template #header>
                                            <div style="text-align: left">
                                                Daftar User Teralokasi
                                            </div>
                                            <div style="text-align: right">
                                                <Button label="Save" @click="alocateSelectedUser(col)"
                                                    icon="pi pi-save" />
                                            </div>

                                        </template>
                                        <Column field="name" header="Nama"></Column>
                                        <Column field="jumlah_alokasi" header="Jumlah Alokasi"></Column>
                                        <Column header="Aksi">
                                            <template #body="col">

                                                <Button icon="pi pi-pencil" @click="editKeySelected(col)"
                                                    class="p-button-raised p-mr-2" />
                                                <Button icon="pi pi-trash" @click="deleteSelectedKeyOption(col)"
                                                    class="p-button-raised p-button-danger" />
                                            </template>
                                        </Column>

                                    </DataTable>
                                </div>
                            </div>

                        </div>


                    </div>



                </template>

            </Card> -->
            <div :class="'p-col-12 p-lg-12 p-ml-2 p-mr-2 ' ">
                <Breadcrumb :home="home" :model="items" />
            </div>
            <Dropdown v-if="kegiatanOptions !== null"
                :class="'p-col-12 p-lg-12 '+myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                v-model="selectedKegiatan" :options="kegiatanOptions.data" @change="getUsersKegiatan(selectedKegiatan)"
                optionLabel="name" :filter="true" placeholder="Pilih Kegiatan" :showClear="true">
                <template #value="slotProps">
                    <div class="country-item country-item-value" v-if="slotProps.value">

                        <div>{{slotProps.value.name}}</div>
                    </div>
                    <span v-else>
                        {{slotProps.placeholder}}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="country-item">

                        <div>{{slotProps.option.name}}</div>
                    </div>
                </template>
            </Dropdown>
            <br><br>

            <div v-if="this.errorMessages.length !== 0">
                <br><br>
                <img src="../assets/matcha404.png" class="hvr-bob mybob p-mt-1 " style="width: 30%; height: 18%;" alt=""
                    srcset="">
                <br><br>
                <h1>Aww...Jangan Nangis.</h1>
                <h3> Ini cuma error kecil! Ayo kerja lagi</h3>
                <p style="font-style: italic; ">
                    <span>So little time, so <span style="font-weight: 900;color:#78b34d"> MatchA </span> to do</span>
                </p>
                <Message v-for="(error) in this.errorMessages" v-bind:key="error" severity="error">{{error}}</Message>
            </div>

            <Card v-if="usersKegiatan !== null" @mouseover="myShadow = ''" @mouseleave="myShadow = ''"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                style="border-radius: 14px;">
                <template #title>
                    Progress
                </template>
                <template #content>
                    <div class="p-grid p-jc-center ">
                        <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                            <div>
                                <span style="font-size: 40px;" v-if="this.usersKegiatan.data.summary !== null">
                                    {{this.usersKegiatan.data.summary.belum_teralokasi}} </span>
                                <br>
                                Belum Teralokasi
                            </div>
                        </div>
                        <div class="p-col-1">
                            <Divider layout="vertical" />
                        </div>
                        <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                            <div>
                                <span style="font-size: 40px;" v-if="this.usersKegiatan.data.summary !== null">
                                    {{this.usersKegiatan.data.summary.teralokasi}} </span>
                                <br>
                                Sudah Teralokasi
                            </div>
                        </div>
                        <div class="p-col-1">
                            <Divider layout="vertical" />
                        </div>
                        <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                            <div>
                                <span style="font-size: 40px;" v-if="this.usersKegiatan.data.summary !== null">
                                    {{this.tipeAlokasi == 'matching' ? this.usersKegiatan.data.summary.total_data_matching : this.usersKegiatan.data.summary.total_data_matching }}
                                </span>
                                <br>
                                Total
                            </div>
                        </div>
                        <div class="p-col-12 p-mt-4" v-if="this.usersKegiatan.data.summary !== null">
                            <ProgressBar style="color:white;" v-if="tipeAlokasi == 'matching'"
                                :value="((this.usersKegiatan.data.summary.teralokasi/this.usersKegiatan.data.summary.total_data_matching)*100).toFixed(2)" />
                            <ProgressBar style="color:white;" v-if="tipeAlokasi == 'assessment'"
                                :value="((this.usersKegiatan.data.summary.teralokasi/this.usersKegiatan.data.summary.total_data_assessment)*100).toFixed(2)" />

                        </div>
                    </div>
                </template>
            </Card>
            <br>
            <div class="p-grid  ">
                <div class="p-col-12 p-lg-6">
                    <DataTable v-if="users !== null && usersKegiatan !== null" :rowHover="true" :value="users.data"
                        responsiveLayout="scroll" :paginator="true" :rows="10"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[10,25,50]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn '"
                        style="border-radius: 0px 0px 18px 18px;">
                        <template #header>
                            <div :class="myCardBgColorData+' '+myTextColorData+' p-col-12 p-grid p-jc-between'"
                                style="text-align: left">
                                Daftar User
                            </div>


                        </template>
                        <Column field="name" header="Nama "></Column>
                        <Column header="Aksi">
                            <template #body="col">

                                <Button label="Alokasi" @click="alocateSelectedUser(col)" icon="pi pi-arrow-right" />
                            </template>
                        </Column>


                    </DataTable>
                </div>

                <div class="p-col-12 p-lg-6">
                    <DataTable v-if="usersKegiatan !== null" :value="usersKegiatan.data.alokasi"
                        responsiveLayout="scroll" :rowHover="true" :paginator="true" :rows="10"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[10,25,50]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-m-2 animate__animated animate__fadeIn'"
                        style="border-radius:0px 0px 18px 18px;">
                        <template #header>
                            <div :class="myCardBgColorData+' '+myTextColorData+' p-col-12 p-grid p-jc-between'"
                                style="text-align: left">
                                Daftar User Teralokasi
                                <div style="text-align: right">
                                    <Button :loading="loadingButton" label="Save" @click="submitAlokasiFinal()"
                                        icon="pi pi-save" />
                                </div>
                            </div>


                        </template>
                        <Column field="name" header="Nama"></Column>
                        <Column field="jumlah_alokasi" header="Jumlah Alokasi"></Column>
                        <Column header="Aksi">
                            <template #body="col">

                                <Button icon="pi pi-pencil" @click="editSelectedRow(col)"
                                    class="p-button-raised p-mr-2" />
                                <Button icon="pi pi-trash" @click="deleteSelectedRowOption(col)"
                                    class="p-button-raised p-button-danger" />
                            </template>
                        </Column>

                    </DataTable>
                </div>
            </div>

        </div>

        <Dialog :header="'Alokasi '+ this.tipeAlokasi.charAt(0).toUpperCase() + this.tipeAlokasi.slice(1)"
            v-model:visible="displayAlokasiDialog">
            <div class="field col-12 md:col-3">
                <label for="withoutgrouping">Alokasi
                    {{this.tipeAlokasi.charAt(0).toUpperCase() + this.tipeAlokasi.slice(1)}}</label> <br>
                <InputNumber :min="1" :max="parseInt(this.usersKegiatan.data.summary.belum_teralokasi)"
                    id="withoutgrouping" v-model="jumlahAlokasi" mode="decimal" :useGrouping="false" />
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="this.displayAlokasiDialog=false"
                    class="p-button-text" />
                <Button label="Submit" icon="pi pi-check" @click="submitAlokasi" autofocus />
            </template>
        </Dialog>

        <Dialog header="Edit Alokasi " v-model:visible="displayEditAlokasiDialog">
            <template #header>
                Edit Alokasi {{selectedUser.data.name}}

            </template>
            <div class="field col-12 md:col-3">
                <label for="withoutgrouping">Edit Alokasi
                    {{this.tipeAlokasi.charAt(0).toUpperCase() + this.tipeAlokasi.slice(1)}}</label> <br>
                <InputNumber id="withoutgrouping" :min="1"
                    :max="parseInt(this.usersKegiatan.data.summary.belum_teralokasi)+selectedUser.data.jumlah_alokasi"
                    v-model="editedAlokasi" mode="decimal" :useGrouping="false" />
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="this.displayEditAlokasiDialog=false"
                    class="p-button-text" />
                <Button label="Update" icon="pi pi-check" @click="updateAlokasi" autofocus />
            </template>
        </Dialog>

        <Dialog v-model:visible="displayDeleteAlokasiDialog" :style="{width: '450px'}" header="Hapus Data"
            class="p-fluid">

            <p>Apakah Anda yakin ingin menghapus alokasi untuk {{ selectedUser.data.name}} ? Alokasi data akan hilang
                selamanya.</p>




            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text"
                    @click="displayDeleteAlokasiDialog=false" />
                <Button :loading="loadingButton" label="Yes" icon="pi pi-check" class="p-button-text"
                    @click="deleteFinal()" />
            </template>
        </Dialog>

        <!-- Assessment User -->
    </div>
</template>

<script scoped>
    import DataService from '../services/DataService'
    import ProgressBar from 'primevue/progressbar';
    import Dialog from 'primevue/dialog'

    import InputNumber from 'primevue/inputnumber';
    import Breadcrumb from 'primevue/breadcrumb';
    import Toast from 'primevue/toast';
    // import Steps from 'primevue/steps';

    // import ProgressBar from 'primevue/progressbar'
    // import UserService from '../services/UserService'

    import MyLoading from '../components/MyLoading.vue'
    import Message from 'primevue/message'


    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        props: {
            tipeAlokasi: String,
        },
        components: {
            // Steps
            ProgressBar,
            Dialog,
            InputNumber,
            Breadcrumb,
            Toast,
            MyLoading,
            Loading,
            Message
        },
        data() {
            return {
                home: {
                    icon: 'pi pi-home',
                    // to: '/'
                },
                items: [{
                        label: 'Alokasi'
                    },
                    {
                        label: this.tipeAlokasi.charAt(0).toUpperCase() + this.tipeAlokasi.slice(1)
                    },

                ],
                myShadow: '',



                selectedKegiatan: null,

                productService: null,
                users: null,
                alocatedUsers: null,
                kegiatanOptions: null,
                usersKegiatan: null,
                deletedUsers: [],
                deletedFirstAlokasiUsers: [],
                displayAlokasiDialog: false,
                displayEditAlokasiDialog: false,
                displayDeleteAlokasiDialog: false,
                jumlahAlokasi: null,
                selectedUser: null,
                editedAlokasi: null,

                //table style
                headerBg: '#ffffff',
                textColor: '#726b7c',
                loadingButton: false,
                loadingDialog: false,
                errorMessages: []
            }
        },
        async created() {
            this.getAllUser()

            await DataService.getKegiatanActiveMatchingAssessment(this.tipeAlokasi)
                .then(response => {
                    this.kegiatanOptions = response.data
                    console.log('Daftar Kegiatan', this.kegiatanOptions)
                })
                .catch(error => {
                    console.log(error)
                })
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

        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            }
        },
        methods: {
            async getAllUser() {
                await DataService.getUsers()
                    .then(response => {
                        this.users = response.data
                        console.log('Daftar User', this.users)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            async getUsersKegiatan(data) {
                this.loadingDialog = true
                await DataService.getUsersKegiatan(data.id_kegiatan, this.tipeAlokasi)
                    .then(response => {
                        this.errorMessages = []
                        this.usersKegiatan = response.data
                        console.log('Selected Kegiatan Users', this.usersKegiatan)
                        if (this.usersKegiatan.data.alokasi !== null) this.checkAvailableUser()


                        this.loadingDialog = false
                    })
                    .catch(error => {
                        console.log(error)
                        console.log('halo ini error')
                        this.usersKegiatan = null
                        this.loadingDialog = false
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error !',
                            detail: 'Ups ada error ...',
                            life: 3000
                        })
                        // console.log(`error $error`)
                        this.errorMessages.push(error.response.data.meta.message)
                    })
            },
            checkAvailableUser() {
                console.log('Cek Selected Kegiatan Users', this.usersKegiatan)
                this.usersKegiatan.data.alokasi.forEach(element => {
                    console.log('element', element)
                    console.log('users', this.users.data)
                    var findData = this.users.data.find(user => user.id === element.id_user)
                    console.log('find', findData)
                    if (findData) {
                        console.log('true')
                        console.log('findIndex', this.users.data.findIndex(x => x === findData))
                        var selectedIndex = this.users.data.findIndex(x => x === findData)
                        this.deletedUsers.push(this.users.data[selectedIndex])
                        this.users.data.splice(selectedIndex, 1)
                        console.log('deletedUsers', this.deletedUsers)

                    } else {
                        console.log('false')
                    }
                });
            },
            alocateSelectedUser(data) {
                console.log(data)
                this.selectedUser = data
                // console.log('length usersKegiatan', this.usersKegiatan.data.alokasi.length)
                // var usersKegiatanLength = 0
                // this.usersKegiatan.length == undefined ? usersKegiatanLength = 0 :  usersKegiatanLength = this.usersKegiatan.length

                if (this.usersKegiatan.data.alokasi !== null) {
                    if (this.tipeAlokasi == 'matching') {
                        this.jumlahAlokasi = Math.floor(this.usersKegiatan.data.summary.total_data_matching / (this
                            .users.data
                            .length + this.usersKegiatan.data.alokasi.length))
                    } else {
                        this.jumlahAlokasi = Math.floor(this.usersKegiatan.data.summary.total_data_assessment / (this
                            .users.data
                            .length + this.usersKegiatan.data.alokasi.length))
                    }
                } else {

                    if (this.tipeAlokasi == 'matching') {
                        this.jumlahAlokasi = Math.floor(this.usersKegiatan.data.summary.total_data_matching / this.users
                            .data
                            .length)
                    } else {
                        this.jumlahAlokasi = Math.floor(this.usersKegiatan.data.summary.total_data_assessment / this
                            .users
                            .data
                            .length)
                    }
                }


                this.displayAlokasiDialog = true
            },
            submitAlokasi() {
                console.log('selectedUser', this.selectedUser)
                console.log('jumlahAlokasi', this.jumlahAlokasi)
                var newUserObject = {
                    id_user: null,
                    jumlah_alokasi: null,
                    name: null
                }
                newUserObject.id_user = this.selectedUser.data.id
                newUserObject.jumlah_alokasi = this.jumlahAlokasi
                newUserObject.name = this.selectedUser.data.name

                console.log('newUserObject', newUserObject)
                if (this.usersKegiatan.data.alokasi == null) {
                    this.usersKegiatan.data.alokasi = []
                }
                this.usersKegiatan.data.alokasi.push(newUserObject)


                this.deletedFirstAlokasiUsers.push(this.users.data[this.selectedUser.index])
                this.users.data.splice(this.selectedUser.index, 1)
                this.usersKegiatan.data.summary.belum_teralokasi = this.usersKegiatan.data.summary.belum_teralokasi -
                    this.jumlahAlokasi
                this.usersKegiatan.data.summary.teralokasi = parseInt(this.usersKegiatan.data.summary.teralokasi) + this
                    .jumlahAlokasi



                this.displayAlokasiDialog = false
            },
            async submitAlokasiFinal() {
                this.loadingButton = true
                console.log('idKegiatan', this.selectedKegiatan.id_kegiatan)
                const data = {
                    "id_kegiatan": this.selectedKegiatan.id_kegiatan,
                    "alokasi": this.usersKegiatan.data.alokasi
                }

                console.log('finalData', data)
                await DataService.submitAlokasi(this.selectedKegiatan.id_kegiatan, this.tipeAlokasi, data).then(
                        response => {
                            console.log('submitAlokasiMatching Response', response)
                        })
                    .catch(error => {
                        console.log(error)
                    })

                this.getUsersKegiatan(this.selectedKegiatan)
                this.$toast.add({
                    severity: 'success',
                    summary: 'Berhasil !',
                    detail: 'Alokasi berhasil ditambahkan',
                    life: 5000
                })
                this.loadingButton = false
            },
            editSelectedRow(data) {
                console.log('editSelectedRow Data', data)
                this.selectedUser = data
                this.editedAlokasi = data.data.jumlah_alokasi
                this.displayEditAlokasiDialog = true
            },
            updateAlokasi() {
                console.log('update Alokasi', this.selectedUser.data)
                const foundIndex = this.usersKegiatan.data.alokasi.findIndex(element => element.id_user == this
                    .selectedUser.data.id_user);
                console.log('found', foundIndex)
                console.log('user di Tabel', this.usersKegiatan.data.alokasi[foundIndex])


                this.usersKegiatan.data.summary.belum_teralokasi = parseInt(this.usersKegiatan.data.summary
                        .belum_teralokasi) + parseInt(this.usersKegiatan.data.alokasi[foundIndex].jumlah_alokasi) -
                    parseInt(this.editedAlokasi)

                this.usersKegiatan.data.summary.teralokasi = parseInt(this.usersKegiatan.data.summary
                    .teralokasi) - parseInt(this.usersKegiatan.data.alokasi[foundIndex].jumlah_alokasi) + parseInt(
                    this.editedAlokasi)

                this.usersKegiatan.data.alokasi[foundIndex].jumlah_alokasi = this.editedAlokasi


                this.displayEditAlokasiDialog = false
            },
            deleteSelectedRowOption(data) {
                console.log('editSelectedRow Data', data)
                this.selectedUser = data

                this.displayDeleteAlokasiDialog = true
            },
            async deleteFinal() {
                this.loadingButton = true
                const userIndex = this.deletedFirstAlokasiUsers.findIndex(element => element.id == this
                    .selectedUser.data.id_user);
                console.log('found', userIndex)
                console.log('id Kegiatan', this.selectedKegiatan.id_kegiatan)

                if (userIndex !== -1) {
                    this.users.data.push(this.deletedFirstAlokasiUsers[userIndex])
                    this.deletedFirstAlokasiUsers.splice(userIndex, 1)

                    const userKegiatanIndex = this.usersKegiatan.data.alokasi.findIndex(element => element
                        .id_user == this.selectedUser.data.id_user)


                    //update summary
                    this.usersKegiatan.data.summary.belum_teralokasi = parseInt(this.usersKegiatan.data.summary
                            .belum_teralokasi) +
                        parseInt(this.usersKegiatan.data.alokasi[userKegiatanIndex].jumlah_alokasi)
                    this.usersKegiatan.data.summary.teralokasi = parseInt(this.usersKegiatan.data.summary
                        .teralokasi) - parseInt(this.usersKegiatan.data.alokasi[userKegiatanIndex]
                        .jumlah_alokasi)

                    //delete di usersKegiatan
                    this.usersKegiatan.data.alokasi.splice(userKegiatanIndex, 1)

                    //tutup loading dan dialog
                    this.loadingButton = false
                    this.displayDeleteAlokasiDialog = false
                } else {
                    await DataService.deleteAlokasi(this.selectedKegiatan.id_kegiatan, this.tipeAlokasi, this
                        .selectedUser.data.id_user).then(response => {
                        console.log('response delete', response.data.meta.message)

                        // var newUserObject = {
                        //     id: null,

                        //     name: null
                        // }
                        // newUserObject.id = this.selectedUser.data.id_user
                        // newUserObject.name = this.selectedUser.data.name
                        // console.log('users', this.users)
                        // this.users.data.push(newUserObject)

                        this.$toast.add({
                            severity: 'success',
                            summary: 'Berhasil !',
                            detail: response.data.meta.message,
                            life: 5000
                        })
                    })
                    await this.getAllUser()
                    await this.getUsersKegiatan(this.selectedKegiatan)
                    this.displayDeleteAlokasiDialog = false
                    this.loadingButton = false
                }



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
        /* border-radius: 0px 0px 18px 18px; */
    }

    /* .p-datatable-header {
        border-radius: 18px 18px 0px 0px;
    } */

    .p-progressbar .p-progressbar-label {
        color: white;
        line-height: 1.5rem;
    }

    nav {
        background-color: v-bind(headerBg) !important;
        color: v-bind(textColor) !important;
    }

    .p-menuitem-text {
        color: v-bind(textColor) !important;
    }

    .p-breadcrumb ul li.p-breadcrumb-chevron {
        color: v-bind(textColor) !important;
    }

    .p-breadcrumb ul li .p-menuitem-link .p-menuitem-icon {
        color: v-bind(textColor) !important;
    }

    .p-dropdown .p-dropdown-label .p-placeholder {
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