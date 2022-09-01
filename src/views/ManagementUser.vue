<template>
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">
        <Toast />

        <div class="p-col-12 p-lg-12">

            <Toolbar class="p-mb-4 p-shadow-6">
                <template #end>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2"
                        @click="kegiatanDialog=true;this.resetmodelUser();this.dialogHeader='Tambah User';this.editField = false;" />
                </template>
            </Toolbar>
            <DataTable v-if="daftarUsers  !== null" :value="daftarUsers.data" v-model:filters="filters"
                filterDisplay="menu" :globalFilterFields="['name','username','email','nip','roles']" :paginator="true"
                responsiveLayout="scroll" :rows="10" dataKey="id" :rowHover="true"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10,25,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                :class="myCardBgColorData+' '+myTextColorData+' '+myShadow+' p-shadow-6 p-m-2 animate__animated animate__fadeIn '">

                <template #header>
                    <div :class="myCardBgColorData+' '+myTextColorData+' p-col-12 p-grid p-jc-between'">

                        <div :class="myCardBgColorData+' '+myTextColorData+ 'p-jc-start p-col-12 p-lg-3 p-mr-6'">
                            <h2 class="">Daftar User</h2>
                        </div>
                        <div class=" p-col-12 p-lg-3 p-md-6 p-mt-2 p-mr-4 "><span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span></div>
                    </div>
                </template>

                <Column field="name" header="Nama"></Column>
                <Column field="username" header="Username"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="nip" header="NIP"></Column>
                <Column field="roles" header="Role">
                    <template #body="col">
                        <div class="p-col p-jc-center" v-for="data in col.data.roles " v-bind:key="data">
                            <Button label="Admin" v-if="data.id == 1" icon="pi pi-user-plus"
                                class="p-button-sm p-button-rounded p-mr-2"
                                style="background-color: #C8E6C9; color: #256029;border-color: #256029; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                            <Button label="User" v-if="data.id == 2" icon="pi pi-user"
                                class="p-button-sm p-button-rounded"
                                style="background-color: #b3e5fc; color: #23547b;border-color: #23547b; font-weight: 700;font-size: 12px;letter-spacing: .3px;" />
                        </div>
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
                <label for="name">Nama</label>
                <InputText id="name" type="text" v-model="modelUser.name" />
            </div>
            <br>
            <div class="field">
                <label for="description">Username</label><br>
                <InputText id="username" type="text" v-model="modelUser.username" />
            </div>
            <br>
            <div class="field">
                <label for="description">Email</label><br>
                <InputText id="email" type="text" v-model="modelUser.email" />
            </div>
            <br>
            <div class="field">
                <label for="description">NIP</label><br>
                <InputText id="nip" type="text" v-model="modelUser.nip" />
            </div>
            <br>
            <div class="field ">
                <label for="description">Role</label><br>
                <div class="p-d-flex ">
                    <div class="field-checkbox">
                        <Checkbox id="user" name="user" value="USER" v-model="modelUser.role" />
                        <label for="user" class="p-ml-2">User</label>
                    </div>
                    <div class="field-checkbox p-ml-4">
                        <Checkbox id="admin" name="admin" value="ADMIN" v-model="modelUser.role" />
                        <label for="admin" class="p-ml-2">Admin</label>
                    </div>
                </div>
            </div>
            <br>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text"
                    @click="kegiatanDialog=false; this.resetmodelUser()" />
                <Button :loading="loadingButton" v-if="this.dialogHeader !== 'Edit User'" label="Save"
                    icon="pi pi-check" class="p-button-text" @click="submit();;" />
                <Button :loading="loadingButton" v-if="this.dialogHeader == 'Edit User'" label="Updae"
                    icon="pi pi-check" class="p-button-text" @click="update();;" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Hapus Data" class="p-fluid">
            <p>Apakah Anda yakin ingin menghapus user? Data user akan hilang selamanya.</p>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="deleteDialog=false" />
                <Button :loading="loadingButton" label="Yes" icon="pi pi-check" class="p-button-text"
                    @click="deleteFinal()" />
            </template>
        </Dialog>

    </div>
</template>

<script scoped>
    import DataService from '../services/DataService'
    import Toolbar from 'primevue/toolbar';
    import Dialog from 'primevue/dialog'
    import InputText from 'primevue/inputtext';
    import Toast from 'primevue/toast';
    import {
        FilterMatchMode,
        FilterOperator
    } from 'primevue/api';
    import Checkbox from 'primevue/checkbox';
    // import ProgressBar from 'primevue/progressbar'
    // import UserService from '../services/UserService'
    export default {
        components: {
            Toolbar,
            Dialog,
            InputText,
            Checkbox,
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
                    'username': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'email': {
                        value: null,
                        matchMode: FilterMatchMode.IN
                    },
                    'nip': {
                        operator: FilterOperator.AND,
                        constraints: [{
                            value: null,
                            matchMode: FilterMatchMode.STARTS_WITH
                        }]
                    },
                    'roles': {
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
                daftarUsers: null,
                kegiatanDialog: false,
                modelUser: {

                    name: null,
                    password: null,
                    username: null,
                    email: null,
                    nip: null,
                    role: null,
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
            await this.getAllUsers()
        },

        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },


        },
        methods: {
            async getAllUsers() {
                await DataService.getAllUsers()
                    .then(response => {
                        this.daftarUsers = response.data
                        console.log('daftarUsers', this.daftarUsers)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            editKeySelected(data) {
                console.log('data', data)
                this.editField = true
                this.dialogHeader = 'Edit User'
                this.selectedId = data.data.id_kegiatan
                this.selectedIndex = data.index

                this.modelUser.name = data.data.name
                this.modelUser.username = data.data.username
                this.modelUser.email = data.data.email
                this.modelUser.nip = data.data.nip
                this.modelUser.role = []
                data.data.roles.forEach(element => {
                    if (element.name == 'ROLE_USER') {
                        this.modelUser.role.push('USER')
                    } else {
                        this.modelUser.role.push('ADMIN')
                    }
                });
                // this.modelUser.role = data.data.roles

                this.kegiatanDialog = true
            },
            async update() {
                this.loadingButton = true
                console.log('selectedId', this.modelUser)
                await DataService.updateKegiatan(this.modelUser.id_kegiatan, this.modelUser).then(
                        response => {
                            console.log('Update Kegiatan Response', response)

                        })
                    .catch(error => {
                        console.log(error)
                    })
                await this.getAllUsers().then(response => {
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
            resetmodelUser() {

                this.modelUser = {
                    name: null,
                    username: null,
                    password: null,
                    email: null,
                    nip: null,
                    photo: null,
                    role: null,
                }
                this.selectedId = null
                this.selectedIndex = null
            },
            async submit() {
                this.editField = false
                this.loadingButton = true
                console.log('Submit User Baru', this.modelUser)
                await DataService.addNewUser(this.modelUser).then(response => {
                        console.log('Post Response', response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                await this.getAllUsers().then(response => {
                        console.log('All User Response', response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.kegiatanDialog = false
                this.loadingButton = false
                this.$toast.add({
                    severity: 'success',
                    summary: 'Berhasil !',
                    detail: 'Data user berhasil ditambahkan',
                    life: 3000
                });
            },
            async deleteSelectedKeyOption(data) {
                console.log('delete', data.data.id_kegiatan)
                this.selectedId = data.data.id_kegiatan
            },
            async deleteFinal() {
                const kegiatan = {
                    "kegiatan": this.selectedId
                }
                this.loadingButton = true;
                await DataService.deleteKegiatan(this.selectedId, kegiatan).then(response => {

                        console.log('Delete Response', response)

                    })
                    .catch(error => {
                        console.log(error)
                    })
                await this.getAllUsers().then(response => {

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

    /* .p-datatable-wrapper {
        border-radius: 18px;
    } */

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