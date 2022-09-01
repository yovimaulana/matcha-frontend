<template>
    <div>
        <div class="p-col-12 p-lg-12" style="padding-left:0; padding-right: 0">
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
        </div>

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
        <div class="p-grid p-jc-center">
            <iframe v-if="this.transposedData == null && this.errorMessages.length == 0 && this.successMessage == null"
                src="https://embed.lottiefiles.com/animation/107059" style="max-height:100%; overflow: auto;"
                class="p-mt-4" width="500" height="500" frameBorder="0"></iframe>
        </div>

        <div v-if="this.transposedData !== null">
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
                                    <span style="font-size: 40px;"> {{userSummary['belum_assessment']}} </span> <br>
                                    Belum Assessment
                                </div>
                            </div>
                            <div class="p-col-1">
                                <Divider layout="vertical" />
                            </div>
                            <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                                <div>
                                    <span style="font-size: 40px;"> {{userSummary['sudah_assessment']}} </span> <br>
                                    Sudah Assessment
                                </div>
                            </div>
                            <div class="p-col-1">
                                <Divider layout="vertical" />
                            </div>
                            <div class="p-col-12 p-lg-3 p-md-12 p-sm-12">
                                <div>
                                    <span style="font-size: 40px;"> {{userSummary['total_data_assessment']}} </span>
                                    <br>
                                    Total
                                </div>
                            </div>
                            <div class="p-col-12 p-mt-4">
                                <ProgressBar style="color:white;"
                                    :value="((userSummary['sudah_assessment']/userSummary['total_data_assessment'])*100).toFixed(2)" />
                                <!-- <ProgressBar style="color:white;" :value="(2/3*100).toFixed(2)" /> -->
                            </div>
                        </div>
                    </template>
                </Card>


            </div>
        </div>


        <br>

        <DataTable style="box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%); margin-left: 8px; margin-right: 8px"
            v-if="datas2nd !== null" :value="transposedData" :class="myCardBgColorData+' '+myTextColorData"
            responsiveLayout="scroll" stripedRows>
            <Column field="variabel" :class="myCardBgColorData+' '+myTextColorData" header="Variabel"
                headerStyle="width:3em;">
                <template #body="slotProps">
                    {{slotProps.data.variabel}}
                </template>
            </Column>

            <Column field="value" :class="myCardBgColorData+' '+myTextColorData" header="Sumber SBR"
                headerStyle="width:3em;">
                <template #body="slotProps">

                    <div v-if="slotProps.data.variabel == 'produk_perusahaan' ||
                    slotProps.data.variabel == 'aktivitas_perusahaan' ||
                    slotProps.data.variabel == 'pemegang_saham' ||
                    slotProps.data.variabel == 'alamat_email_perusahaan' || 
                    slotProps.data.variabel == 'alamat_fax_perusahaan' ||
                    slotProps.data.variabel == 'alamat_telepon_perusahaan' ||
                    slotProps.data.variabel == 'alamat_web_perusahaan' ||
                    slotProps.data.variabel == 'kontak_perusahaan'">
                        <div>
                            <Button label="View" icon="" @click="openDialogObject(slotProps)" class="p-mb-2 p-ripple" />
                        </div>
                    </div>

                    <div v-else>
                        <RadioButton :id="slotProps.variabel" name="item2" :value="slotProps.data.value"
                            v-model="selectedData[Object.keys(this.data2View[0])[slotProps.index]]" />
                        <label v-if="typeof slotProps.data.value !== 'object'"
                            @click="selectedData[Object.keys(this.data2View[0])[slotProps.index]] = slotProps.data.value"
                            class="p-ml-2">
                            {{slotProps.data.value}}
                        </label>
                        <label
                            @click="selectedData[Object.keys(this.data2View[0])[slotProps.index]] = slotProps.data.value"
                            for="" v-if="typeof slotProps.data.value == 'object' && slotProps.data.value !== null">
                            <div v-for="(item2, index2) in slotProps.data.value" :key="item2">
                                <div v-if="index2.substring(index2.length - 3) !== '_id'">
                                    {{index2.substring(index2.length - 4)}} : {{item2}} <br>
                                </div>
                            </div>

                        </label>
                    </div>


                </template>
            </Column>

            <template v-for="index2 in this.datas2nd.length" :key="index2">
                <Column :field="'sumber'+(index2)" :class="myCardBgColorData+' '+myTextColorData"
                    :header="'Sumber '+(index2) " headerStyle="width:3em;">
                    <template #body="slotProps">
                        <div v-if="slotProps.data.variabel == 'produk_perusahaan' ||
                    slotProps.data.variabel == 'aktivitas_perusahaan' ||
                    slotProps.data.variabel == 'pemegang_saham' ||
                    slotProps.data.variabel == 'alamat_email_perusahaan' || 
                    slotProps.data.variabel == 'alamat_fax_perusahaan' ||
                    slotProps.data.variabel == 'alamat_telepon_perusahaan' ||
                    slotProps.data.variabel == 'alamat_web_perusahaan' ||
                    slotProps.data.variabel == 'kontak_perusahaan'">
                        </div>

                        <div v-else>
                            <RadioButton :id="slotProps.index" name="item2" :value="slotProps.data['sumber'+index2]"
                                v-model="selectedData[Object.keys(this.data2View[0])[slotProps.index]]" />
                            <label v-if="typeof slotProps.data.value !== 'object'"
                                @click="selectedData[Object.keys(this.data2View[0])[slotProps.index]] = slotProps.data['sumber'+index2] "
                                for="slotProps.index" class="p-ml-2">{{slotProps.data['sumber'+index2]}}
                            </label>
                            <label
                                @click="selectedData[Object.keys(this.data2View[0])[slotProps.index]] = slotProps.data['sumber'+index2] "
                                for="" v-if="typeof slotProps.data.value == 'object' && slotProps.data.value !== null">
                                <div v-for="(item2, index2) in slotProps.data['sumber'+index2]" :key="item2">
                                    <div v-if="index2.substring(index2.length - 3) !== '_id'">
                                        {{index2.substring(index2.length - 4)}} : {{item2}} <br>
                                    </div>
                                </div>

                            </label>
                        </div>
                    </template>
                </Column>
            </template>

            <Column :class="myCardBgColorData+' '+myTextColorData" header="Selected Value" headerStyle="width:3em;">
                <template #body="slotProps">

                    <div @dblclick="editValueSelected(selectedData[Object.keys(this.data2View[0])[slotProps.index]], slotProps)"
                        v-if="slotProps.data.variabel == 'produk_perusahaan' ||
                    slotProps.data.variabel == 'aktivitas_perusahaan' ||
                    slotProps.data.variabel == 'pemegang_saham' ||
                    slotProps.data.variabel == 'alamat_email_perusahaan' || 
                    slotProps.data.variabel == 'alamat_fax_perusahaan' ||
                    slotProps.data.variabel == 'alamat_telepon_perusahaan' ||
                    slotProps.data.variabel == 'alamat_web_perusahaan' ||
                    slotProps.data.variabel == 'kontak_perusahaan'">
                        <div v-if="selectedData[Object.keys(this.data2View[0])[slotProps.index]]  !== null">
                            <div v-if="selectedData[Object.keys(this.data2View[0])[slotProps.index]].length > 1">
                                <div v-for="(item,index) in selectedData[Object.keys(this.data2View[0])[slotProps.index]]"
                                    :key="item">
                                    <!-- {{index}} : {{item}} <br> -->
                                    <div v-for="(item2, index2) in selectedData[Object.keys(this.data2View[0])[slotProps.index]][index]"
                                        :key="item2">
                                        {{index2}} : {{item2}} <br>
                                    </div>
                                    <br>

                                </div>
                            </div>
                            <div v-else>
                                <div v-for="(item,index) in selectedData[Object.keys(this.data2View[0])[slotProps.index]][0]"
                                    :key="item">
                                    {{index}} : {{item}} <br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else
                        @dblclick="editValueSelected(selectedData[Object.keys(this.data2View[0])[slotProps.index]], slotProps)">
                        <div
                            v-if="typeof selectedData[Object.keys(this.data2View[0])[slotProps.index]] == 'object' && selectedData[Object.keys(this.data2View[0])[slotProps.index]] !== null">
                            <div v-for="(item2, index2) in selectedData[Object.keys(this.data2View[0])[slotProps.index]]"
                                :key="item2">
                                <div v-if="index2.substring(index2.length - 3) !== '_id'">
                                    {{index2.substring(index2.length - 4)}} : {{item2}} <br>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            {{selectedData[Object.keys(this.data2View[0])[slotProps.index]]}}
                        </div>

                        <div @dblclick="editValueSelected(selectedData[Object.keys(this.data2View[0])[slotProps.index]], slotProps)"
                            v-if="selectedData[Object.keys(this.data2View[0])[slotProps.index]] == null">
                            &nbsp;
                        </div>
                    </div>
                </template>
            </Column>

        </DataTable>

        <Dialog header="Select Data" v-model:visible="displayDialogObject" :style="{width: '50vw'}" :maximizable="true"
            :modal="true">
            <p class="m-0">
                <DataTable :value="display2ndVariabel" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content-center align-items-center">
                            <h3 class="m-0">Data Assessment</h3>
                        </div>
                    </template>
                    <!-- <Column style="width:25%" header="Sumber">
                        <template #body="slotProps">
                            Sumber {{slotProps.index+1}}
                        </template>
                    </Column> -->
                    <template v-if="this.display2ndVariabel.length !== 0">
                        <template v-for="mykey in Object.keys(display2ndVariabel[0])" :key="mykey">
                            <Column v-if="!['id', 'perusahaan_id', 'kbji_id'].includes(mykey)" style="width:25%"
                                :field="mykey" :header="mykey == 'namaSumber' ? 'Sumber' : mykey">
                            </Column>
                        </template>
                    </template>
                    <Column style="width:25%" header="Action">
                        <template #body="slotProps">
                            <Button icon="pi pi-arrow-down" @click="pushData(slotProps)" class="p-button-raised" />
                        </template>
                    </Column>
                </DataTable>
                <br><br>
                <DataTable :value="displayVariabel" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content-center align-items-center">
                            <h3 class="m-0">Data SBR</h3> <br>
                            <Toolbar class="mb-4">
                                <template #end>
                                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2"
                                        @click="openNewKeyDialog()" />
                                </template>
                            </Toolbar>
                        </div>
                    </template>
                    <Column style="width:5%" header="#">
                        <template #body>
                            #
                        </template>
                    </Column>
                    <template v-if="this.displayVariabel.length !== 0">
                        <template v-for="mykey in Object.keys(displayVariabel[0])" :key="mykey">
                            <Column v-if="!['id', 'perusahaan_id', 'kbji_id'].includes(mykey)" style="width:25%"
                                :field="mykey" :header="mykey == 'namaSumber' ? 'Sumber' : mykey"></Column>
                        </template>
                    </template>
                    <Column style="width:25%" header="Action">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" @click="editKeySelected(slotProps)"
                                class="p-button-raised p-mr-2" />
                            <Button icon="pi pi-trash" @click="deleteSelectedKeyOption(slotProps)"
                                class="p-button-raised p-button-danger" />
                        </template>
                    </Column>
                </DataTable>
            </p>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="displayDialogObject = false" class="p-button-text" />
                <Button label="Add Data" icon="pi pi-plus"
                    @click="displayDialogObject = false; this.selectedData[this.displayKey] = this.displayVariabel"
                    autofocus />
            </template>
        </Dialog>

        <Dialog header="Edit Key" v-model:visible="displayBasic3" :style="{width: '50vw'}">
            <div v-if="(typeof editedValue == 'object')">
                <div v-if="editedValue.length == null">
                    <div v-for="mykey in Object.keys(editedValue)" :key="mykey">
                        {{mykey}} :
                        <InputText style="width:100%;" v-model="editedValue[mykey]" />
                    </div>
                </div>
                <div v-else>
                    <div v-for="(mykey, index) in editedValue" :key="mykey">
                        <div v-for="(mykey2) in Object.keys(mykey)" :key="mykey2">
                            {{mykey2}}
                            <InputText style="width:100%;" v-model="editedValue[index][mykey2]" />
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <div v-else>
                <InputText style="width:100%;" v-model="editedValue" />
            </div>



            <template #footer>
                <Button label="No" icon="pi pi-times" @click="displayBasic3=false" class="p-button-text" />
                <Button label="Save" icon="pi pi-check" @click="
                                displayBasic3=false;
                                
                                this.displayVariabel.data = editedValue
                                " autofocus />
            </template>
        </Dialog>

        <Dialog header="Edit Value" v-model:visible="displayBasic2" :style="{width: '50vw'}">
            <div v-if="(typeof editedValue == 'object')">
                <div v-if="editedValue.length == null">
                    <div v-for="mykey in Object.keys(editedValue)" :key="mykey">
                        <div v-if="mykey.substring(mykey.length - 3) !== '_id' && mykey !== 'id'">
                            {{mykey}} :
                            <InputText style="width:100%;" v-model="editedValue[mykey]" />
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-for="(mykey, index) in editedValue" :key="mykey">
                        <div v-for="(mykey2) in Object.keys(mykey)" :key="mykey2">
                            <div v-if="mykey2.substring(mykey2.length - 3) !== '_id' && mykey2 !== 'id'">
                                {{mykey2}}
                                <InputText style="width:100%;" v-model="editedValue[index][mykey2]" />
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <div v-else>
                <InputText style="width:100%;" v-model="editedValue" />
            </div>



            <template #footer>
                <Button label="No" icon="pi pi-times" @click="displayBasic2=false" class="p-button-text" />
                <Button label="Save" icon="pi pi-check" @click="
                                displayBasic2=false;
                                
                                this.selectedData[this.selectedKey] = editedValue
                                " autofocus />
            </template>
        </Dialog>

        <Dialog header="Edit Key" v-model:visible="openNew" :style="{width: '50vw'}">


            <div v-for="mykey in Object.keys(displayVariabel[0])" :key="mykey">
                {{mykey}} :
                <InputText style="width:100%;" v-model="editedValue[mykey]" />
            </div>

            <template #footer>
                <Button label="No" icon="pi pi-times" @click="this.openNew=false" class="p-button-text" />
                <Button label="Save" icon="pi pi-check" @click="
                                this.openNew=false;                                
                                this.displayVariabel.push(editedValue)
                                " autofocus />
            </template>
        </Dialog>

        <div v-if="this.errorMessages.length !== 0">
            <br><br>
            <Message v-for="(error) in this.errorMessages" v-bind:key="error" severity="error">{{error}}</Message>
        </div>

        <br>

        <Button label="Submit" style="font-weight: 900;border-radius: 0.357rem;margin-left: 8px; margin-right: 8px"
            v-if="transposedData !== null" icon=""
            class="p-col-12 p-mb-2 p-ripple p-button-lg p-button-rounded p-button-raised" @click="submit()" /> <br>
        <Toast />

        <Loading v-model:active="loadingDialog" :is-full-page="true" :color="'#86d166'" :background-color="'black'"
            :opacity="0.7">
            <slot>
                <MyLoading></MyLoading>
            </slot>
        </Loading>

    </div>
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
            Loading
        },
        data() {
            return {
                home: {
                    icon: 'pi pi-home',                    
                },
                items: [{
                        label: 'Assessment',
                        to: '/assessment'
                    },
                ],
                idAlokasi: null,
                idPerusahaan: null,
                selectedKegiatan: null,
                kegiatanOptions: null,
                loadingDialog: false,
                currentId: null,
                openNew: false,

                displayKey: null,
                display2ndVariabel: null,
                displayVariabel: [],
                displayDialogObject: false,
                userSummary: null,
                selectedPetugas: null,
                petugasOptions: null,
                selectedKey: null,
                selectedIndex: null,
                editedValue: null,
                displayBasic3: false,
                displayBasic2: false,
                data2View: [],
                data3View: null,
                selectedData: null,
                input: null,
                datas2nd: null,
                input2: null,
                transposedData: null,
                // tablestyle
                headerBg: '#ffffff',
                textColor: '#726b7c',
                //error
                errorMessages: [],
                successMessage: null

            }
        },
        async created() {
        
            await DataService.getKegiatanActiveAssessment()
                .then(response => {
                    this.kegiatanOptions = response.data
                    // console.log('kegiatanOptions', this.kegiatanOptions)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        watch: {
            myCardBgColorData(newX) {
                console.log(`new ${newX}`)
                if (newX == 'mydarkcardcolor') {
                    this.headerBg = '#312d4b'
                    this.textColor = '#cfcbe4'

                } else {
                    this.headerBg = '#ffffff'
                    this.textColor = '#726b7c'

                }
                // console.log(`old ${oldX}`)
            },


        },
        computed: {
            myCardBgColorData() {
                return this.$store.state.mainstyle.myCardBgColorData
            },
            myTextColorData() {
                return this.$store.state.mainstyle.myTextColorData
            },
            mySelectedData() {
                return this.$store.state.compareTable.mySelectedData
            },
            currentUser() {
                return this.$store.state.auth.user
            }
        },
        methods: {
            openNewKeyDialog() {
                this.openNew = true
                this.editedValue = {}
                Object.keys(this.displayVariabel[0]).forEach(element => {
                    this.editedValue[element] = null
                });
            },
            deleteSelectedKeyOption(data) {
                // console.log('data', data)
                // console.log('index', data.index)
                // console.log('variabel', this.displayKey)
                // console.log('selectedData', this.selectedData)
                // console.log('displayVariabel', this.displayVariabel)
                this.displayVariabel.splice(data.index, 1)
            },
            pushData(data) {
                // console.log('assessmentData', data)                
                this.displayVariabel.push(data.data)
                
                var myIndex = this.display2ndVariabel.indexOf(data.data);

                if (myIndex !== -1) {
                    this.display2ndVariabel.splice(myIndex, 1);                    
                }


            },
            openDialogObject(data) {
                // console.log(data)
                // console.log(this.datas2nd)

                this.displayVariabel = data.data.value
                for(let i=0; i<this.displayVariabel; i++)
                {
                    this.displayVariabel[i] = { ...{ 'namaSumber': 'SBR' }, ...this.displayVariabel[i] }
                }

                this.displayKey = data.data.variabel                
                
                // if (this.displayVariabel.length >= 0) {
                //     // console.log('length', this.displayVariabel.length)
                // } else {
                //     this.displayVariabel = [this.displayVariabel]
                // }
                
                this.display2ndVariabel = []
                for (let index = 0; index < this.datas2nd.length; index++) {
                    let isDataEmpty = Object.values(this.datas2nd[index][data.data.variabel]).every(value => {
                        if(value === null) return true;
                        return false;
                    });
                    if(!isDataEmpty)
                    {
                        let dtTemp = { ...{ 'namaSumber': `Sumber ${index + 1}` }, ...this.datas2nd[index][data.data.variabel] };
                        this.display2ndVariabel.push(dtTemp);
                    }                    
                }

                this.displayDialogObject = true                
            },
            async getDataSBR() {
                this.loadingDialog = true
                await DataService.getDataAssessment(this.selectedKegiatan.id_kegiatan, this.currentId)
                    .then(response => {
                        console.log('response Data Assessment', response)
                        var data = response.data                        
                        if (response.data.meta.status == 'success') {
                            
                            // sudah selesai assessment
                            if (response.data.data.summary.sudah_assessment == response.data.data.summary
                                .total_data_assessment) {
                                this.errorMessages = []
                                this.successMessage = "Selamat. Kamu sudah selesai Assessment"
                                this.transposedData = null
                                this.datas2nd = null
                                this.loadingDialog = false
                                return;
                            } 

                            // kalo belum selesai assessment
                            
                            this.data2View[0] = data.data.data_sbr
                            this.userSummary = data.data.summary

                            //Fungsi EditKey
                            this.editKey(data)

                            var thekeys = Object.keys(this.data2View[0])
                            var myObj = {}
                            thekeys.forEach(element => {
                                myObj[element] = null
                            });

                            this.selectedData = myObj
                            // console.log('created selectedData', this.selectedData)
                            this.transpose(this.data2View[0])
                            this.setDefaultCon()
                        } else {                            
                            this.errorHandler(response.data.meta.message)
                        }


                    })
                    .catch(error => {                                            
                        this.errorHandler(error.response.data.meta.message)
                    })
            },
            async getUserData($id) {
                // console.log('userid', $id)
                this.currentId = $id
                this.getDataSBR()                
            },
            setDefaultCon() {
                this.errorMessages = []
                this.successMessage = null
                this.loadingDialog = false
            },
            errorHandler(errorMessage) {

                this.loadingDialog = false
                this.transposedData = null
                this.datas2nd = null
                this.successMessage = null
                this.errorMessages.push(errorMessage)
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: 'Ups, ada error :(',
                    life: 5000
                });
                
            },  
            editKey(data) {                

                this.datas2nd = data.data.data_assessment
                // console.log('jumlah jenis data', this.datas2nd.length)

                //idAlokasi
                this.idAlokasi = data.data.id_alokasi
                //idPerusahaan
                this.idPerusahaan = data.data.data_sbr.id_perusahaan
                delete this.data2View[0].id_perusahaan                

                //negara
                this.data2View[0]['negara'] = {
                    "negara_id": this.data2View[0]['negara_id'],
                    "negara_kode": this.data2View[0]['negara_kode'],
                    "negara_nama": this.data2View[0]['negara_nama'],
                }
                delete this.data2View[0]['negara_id']
                delete this.data2View[0]['negara_kode']
                delete this.data2View[0]['negara_nama']

                //provinsi
                this.data2View[0]['provinsi'] = {
                    "provinsi_id": this.data2View[0]['provinsi_id'],
                    "provinsi_kode": this.data2View[0]['provinsi_kode'],
                    "provinsi_nama": this.data2View[0]['provinsi_nama'],
                }
                delete this.data2View[0]['provinsi_id']
                delete this.data2View[0]['provinsi_kode']
                delete this.data2View[0]['provinsi_nama']

                //kabupaten_kota
                this.data2View[0]['kabupaten_kota'] = {
                    "kabupaten_kota_id": this.data2View[0]['kabupaten_kota_id'],
                    "kabupaten_kota_kode": this.data2View[0]['kabupaten_kota_kode'],
                    "kabupaten_kota_nama": this.data2View[0]['kabupaten_kota_nama'],
                }
                delete this.data2View[0]['kabupaten_kota_id']
                delete this.data2View[0]['kabupaten_kota_kode']
                delete this.data2View[0]['kabupaten_kota_nama']

                //kecamtan
                this.data2View[0]['kecamatan'] = {
                    "kecamatan_id": this.data2View[0]['kecamatan_id'],
                    "kecamatan_kode": this.data2View[0]['kecamatan_kode'],
                    "kecamatan_nama": this.data2View[0]['kecamatan_nama'],
                }
                delete this.data2View[0]['kecamatan_id']
                delete this.data2View[0]['kecamatan_kode']
                delete this.data2View[0]['kecamatan_nama']

                //kelurahan
                this.data2View[0]['kelurahan_desa'] = {
                    "kelurahan_desa_id": this.data2View[0]['kelurahan_desa_id'],
                    "kelurahan_desa_kode": this.data2View[0]['kelurahan_desa_kode'],
                    "kelurahan_desa_nama": this.data2View[0]['kelurahan_desa_nama'],
                }
                delete this.data2View[0]['kelurahan_desa_id']
                delete this.data2View[0]['kelurahan_desa_kode']
                delete this.data2View[0]['kelurahan_desa_nama']

                //jaringan_usaha
                this.data2View[0]['jaringan_usaha'] = {
                    "jaringan_usaha_id": this.data2View[0]['jaringan_usaha_id'],
                    "jaringan_usaha_kode": this.data2View[0]['jaringan_usaha_kode'],
                    "jaringan_usaha_nama": this.data2View[0]['jaringan_usaha_nama'],
                }
                delete this.data2View[0]['jaringan_usaha_id']
                delete this.data2View[0]['jaringan_usaha_kode']
                delete this.data2View[0]['jaringan_usaha_nama']

                //jenis_badan_hukum_badan_usaha
                this.data2View[0]['jenis_badan_hukum_badan_usaha'] = {
                    "jenis_badan_hukum_badan_usaha_id": this.data2View[0]['jenis_badan_hukum_badan_usaha_id'],
                    "jenis_badan_hukum_badan_usaha_kode": this.data2View[0]['jenis_badan_hukum_badan_usaha_kode'],
                    "jenis_badan_hukum_badan_usaha_nama": this.data2View[0]['jenis_badan_hukum_badan_usaha_nama'],
                }
                delete this.data2View[0]['jenis_badan_hukum_badan_usaha_id']
                delete this.data2View[0]['jenis_badan_hukum_badan_usaha_kode']
                delete this.data2View[0]['jenis_badan_hukum_badan_usaha_nama']

                //kbji_pengusaha
                this.data2View[0]['kbji_pengusaha'] = {
                    "kbji_pengusaha_id": this.data2View[0]['kbji_pengusaha_id'],
                    "kbji_pengusaha_kode": this.data2View[0]['kbji_pengusaha_kode'],
                    "kbji_pengusaha_nama": this.data2View[0]['kbji_pengusaha_nama'],
                }
                delete this.data2View[0]['kbji_pengusaha_id']
                delete this.data2View[0]['kbji_pengusaha_kode']
                delete this.data2View[0]['kbji_pengusaha_nama']

                //kewarganegaraan_pengusaha
                this.data2View[0]['kewarganegaraan_pengusaha'] = {
                    "kewarganegaraan_pengusaha_id": this.data2View[0]['kewarganegaraan_pengusaha_id'],
                    "kewarganegaraan_pengusaha_kode": this.data2View[0]['kewarganegaraan_pengusaha_kode'],
                    "kewarganegaraan_pengusaha_nama": this.data2View[0]['kewarganegaraan_pengusaha_nama'],
                }
                delete this.data2View[0]['kewarganegaraan_pengusaha_id']
                delete this.data2View[0]['kewarganegaraan_pengusaha_kode']
                delete this.data2View[0]['kewarganegaraan_pengusaha_nama']

                //pajak_jeniswp
                this.data2View[0]['pajak_jeniswp'] = {
                    "pajak_jeniswp_id": this.data2View[0]['pajak_jeniswp_id'],
                    "pajak_jeniswp_kode": this.data2View[0]['pajak_jeniswp_kode'],
                    "pajak_jeniswp_nama": this.data2View[0]['pajak_jeniswp_nama'],
                }
                delete this.data2View[0]['pajak_jeniswp_id']
                delete this.data2View[0]['pajak_jeniswp_kode']
                delete this.data2View[0]['pajak_jeniswp_nama']

                //pajak_skala_usaha
                this.data2View[0]['pajak_skala_usaha'] = {
                    "pajak_skala_usaha_id": this.data2View[0]['pajak_skala_usaha_id'],
                    "pajak_skala_usaha_kode": this.data2View[0]['pajak_skala_usaha_kode'],
                    "pajak_skala_usaha_nama": this.data2View[0]['pajak_skala_usaha_nama'],
                }
                delete this.data2View[0]['pajak_skala_usaha_id']
                delete this.data2View[0]['pajak_skala_usaha_kode']
                delete this.data2View[0]['pajak_skala_usaha_nama']

                //pajak_statuswp
                this.data2View[0]['pajak_statuswp'] = {
                    "pajak_statuswp_id": this.data2View[0]['pajak_statuswp_id'],
                    "pajak_statuswp_kode": this.data2View[0]['pajak_statuswp_kode'],
                    "pajak_statuswp_nama": this.data2View[0]['pajak_statuswp_nama'],
                }
                delete this.data2View[0]['pajak_statuswp_id']
                delete this.data2View[0]['pajak_statuswp_kode']
                delete this.data2View[0]['pajak_statuswp_nama']

                //sektor_institusi
                this.data2View[0]['sektor_institusi'] = {
                    "sektor_institusi_id": this.data2View[0]['sektor_institusi_id'],
                    "sektor_institusi_kode": this.data2View[0]['sektor_institusi_kode'],
                    "sektor_institusi_nama": this.data2View[0]['sektor_institusi_nama'],
                }
                delete this.data2View[0]['sektor_institusi_id']
                delete this.data2View[0]['sektor_institusi_kode']
                delete this.data2View[0]['sektor_institusi_nama']

                //status_perusahaan
                this.data2View[0]['status_perusahaan'] = {
                    "status_perusahaan_id": this.data2View[0]['status_perusahaan_id'],
                    "status_perusahaan_kode": this.data2View[0]['status_perusahaan_kode'],
                    "status_perusahaan_nama": this.data2View[0]['status_perusahaan_nama'],
                }
                delete this.data2View[0]['status_perusahaan_id']
                delete this.data2View[0]['status_perusahaan_kode']
                delete this.data2View[0]['status_perusahaan_nama']

                for (let index = 0; index < this.datas2nd.length; index++) {
        
                    //negara
                    this.datas2nd[index]['negara'] = {
                        "negara_id": this.datas2nd[index]['negara_id'],
                        "negara_kode": this.datas2nd[index]['negara_kode'],
                        "negara_nama": this.datas2nd[index]['negara_nama'],
                    }
                    delete this.datas2nd[index]['negara_id']
                    delete this.datas2nd[index]['negara_kode']
                    delete this.datas2nd[index]['negara_nama']

                    //provinsi
                    this.datas2nd[index]['provinsi'] = {
                        "provinsi_id": this.datas2nd[index]['provinsi_id'],
                        "provinsi_kode": this.datas2nd[index]['provinsi_kode'],
                        "provinsi_nama": this.datas2nd[index]['provinsi_nama'],
                    }
                    delete this.datas2nd[index]['provinsi_id']
                    delete this.datas2nd[index]['provinsi_kode']
                    delete this.datas2nd[index]['provinsi_nama']

                    //kabupaten_kota
                    this.datas2nd[index]['kabupaten_kota'] = {
                        "kabupaten_kota_id": this.datas2nd[index]['kabupaten_kota_id'],
                        "kabupaten_kota_kode": this.datas2nd[index]['kabupaten_kota_kode'],
                        "kabupaten_kota_nama": this.datas2nd[index]['kabupaten_kota_nama'],
                    }
                    delete this.datas2nd[index]['kabupaten_kota_id']
                    delete this.datas2nd[index]['kabupaten_kota_kode']
                    delete this.datas2nd[index]['kabupaten_kota_nama']

                    //kecamtan
                    this.datas2nd[index]['kecamatan'] = {
                        "kecamatan_id": this.datas2nd[index]['kecamatan_id'],
                        "kecamatan_kode": this.datas2nd[index]['kecamatan_kode'],
                        "kecamatan_nama": this.datas2nd[index]['kecamatan_nama'],
                    }
                    delete this.datas2nd[index]['kecamatan_id']
                    delete this.datas2nd[index]['kecamatan_kode']
                    delete this.datas2nd[index]['kecamatan_nama']

                    //kelurahan
                    this.datas2nd[index]['kelurahan_desa'] = {
                        "kelurahan_desa_id": this.datas2nd[index]['kelurahan_desa_id'],
                        "kelurahan_desa_kode": this.datas2nd[index]['kelurahan_desa_kode'],
                        "kelurahan_desa_nama": this.datas2nd[index]['kelurahan_desa_nama'],
                    }
                    delete this.datas2nd[index]['kelurahan_desa_id']
                    delete this.datas2nd[index]['kelurahan_desa_kode']
                    delete this.datas2nd[index]['kelurahan_desa_nama']

                    //jaringan_usaha
                    this.datas2nd[index]['jaringan_usaha'] = {
                        "jaringan_usaha_id": this.datas2nd[index]['jaringan_usaha_id'],
                        "jaringan_usaha_kode": this.datas2nd[index]['jaringan_usaha_kode'],
                        "jaringan_usaha_nama": this.datas2nd[index]['jaringan_usaha_nama'],
                    }
                    delete this.datas2nd[index]['jaringan_usaha_id']
                    delete this.datas2nd[index]['jaringan_usaha_kode']
                    delete this.datas2nd[index]['jaringan_usaha_nama']

                    //jenis_badan_hukum_badan_usaha
                    this.datas2nd[index]['jenis_badan_hukum_badan_usaha'] = {
                        "jenis_badan_hukum_badan_usaha_id": this.datas2nd[index][
                            'jenis_badan_hukum_badan_usaha_id'
                        ],
                        "jenis_badan_hukum_badan_usaha_kode": this.datas2nd[index][
                            'jenis_badan_hukum_badan_usaha_kode'
                        ],
                        "jenis_badan_hukum_badan_usaha_nama": this.datas2nd[index][
                            'jenis_badan_hukum_badan_usaha_nama'
                        ],
                    }
                    delete this.datas2nd[index]['jenis_badan_hukum_badan_usaha_id']
                    delete this.datas2nd[index]['jenis_badan_hukum_badan_usaha_kode']
                    delete this.datas2nd[index]['jenis_badan_hukum_badan_usaha_nama']

                    //kbji_pengusaha
                    this.datas2nd[index]['kbji_pengusaha'] = {
                        "kbji_pengusaha_id": this.datas2nd[index]['kbji_pengusaha_id'],
                        "kbji_pengusaha_kode": this.datas2nd[index]['kbji_pengusaha_kode'],
                        "kbji_pengusaha_nama": this.datas2nd[index]['kbji_pengusaha_nama'],
                    }
                    delete this.datas2nd[index]['kbji_pengusaha_id']
                    delete this.datas2nd[index]['kbji_pengusaha_kode']
                    delete this.datas2nd[index]['kbji_pengusaha_nama']

                    //kewarganegaraan_pengusaha
                    this.datas2nd[index]['kewarganegaraan_pengusaha'] = {
                        "kewarganegaraan_pengusaha_id": this.datas2nd[index]['kewarganegaraan_pengusaha_id'],
                        "kewarganegaraan_pengusaha_kode": this.datas2nd[index]['kewarganegaraan_pengusaha_kode'],
                        "kewarganegaraan_pengusaha_nama": this.datas2nd[index]['kewarganegaraan_pengusaha_nama'],
                    }
                    delete this.datas2nd[index]['kewarganegaraan_pengusaha_id']
                    delete this.datas2nd[index]['kewarganegaraan_pengusaha_kode']
                    delete this.datas2nd[index]['kewarganegaraan_pengusaha_nama']

                    //pajak_jeniswp
                    this.datas2nd[index]['pajak_jeniswp'] = {
                        "pajak_jeniswp_id": this.datas2nd[index]['pajak_jeniswp_id'],
                        "pajak_jeniswp_kode": this.datas2nd[index]['pajak_jeniswp_kode'],
                        "pajak_jeniswp_nama": this.datas2nd[index]['pajak_jeniswp_nama'],
                    }
                    delete this.datas2nd[index]['pajak_jeniswp_id']
                    delete this.datas2nd[index]['pajak_jeniswp_kode']
                    delete this.datas2nd[index]['pajak_jeniswp_nama']

                    //pajak_skala_usaha
                    this.datas2nd[index]['pajak_skala_usaha'] = {
                        "pajak_skala_usaha_id": this.datas2nd[index]['pajak_skala_usaha_id'],
                        "pajak_skala_usaha_kode": this.datas2nd[index]['pajak_skala_usaha_kode'],
                        "pajak_skala_usaha_nama": this.datas2nd[index]['pajak_skala_usaha_nama'],
                    }
                    delete this.datas2nd[index]['pajak_skala_usaha_id']
                    delete this.datas2nd[index]['pajak_skala_usaha_kode']
                    delete this.datas2nd[index]['pajak_skala_usaha_nama']

                    //pajak_statuswp
                    this.datas2nd[index]['pajak_statuswp'] = {
                        "pajak_statuswp_id": this.datas2nd[index]['pajak_statuswp_id'],
                        "pajak_statuswp_kode": this.datas2nd[index]['pajak_statuswp_kode'],
                        "pajak_statuswp_nama": this.datas2nd[index]['pajak_statuswp_nama'],
                    }
                    delete this.datas2nd[index]['pajak_statuswp_id']
                    delete this.datas2nd[index]['pajak_statuswp_kode']
                    delete this.datas2nd[index]['pajak_statuswp_nama']

                    //sektor_institusi
                    this.datas2nd[index]['sektor_institusi'] = {
                        "sektor_institusi_id": this.datas2nd[index]['sektor_institusi_id'],
                        "sektor_institusi_kode": this.datas2nd[index]['sektor_institusi_kode'],
                        "sektor_institusi_nama": this.datas2nd[index]['sektor_institusi_nama'],
                    }
                    delete this.datas2nd[index]['sektor_institusi_id']
                    delete this.datas2nd[index]['sektor_institusi_kode']
                    delete this.datas2nd[index]['sektor_institusi_nama']

                    //status_perusahaan
                    this.datas2nd[index]['status_perusahaan'] = {
                        "status_perusahaan_id": this.datas2nd[index]['status_perusahaan_id'],
                        "status_perusahaan_kode": this.datas2nd[index]['status_perusahaan_kode'],
                        "status_perusahaan_nama": this.datas2nd[index]['status_perusahaan_nama'],
                    }
                    delete this.datas2nd[index]['status_perusahaan_id']
                    delete this.datas2nd[index]['status_perusahaan_kode']
                    delete this.datas2nd[index]['status_perusahaan_nama']

                    //produk perusahaan
                    this.datas2nd[index]['produk_perusahaan'] = {
                        "id": null,
                        "kbki": this.datas2nd[index]['kbki_produk_perusahaan'],
                        "produk": this.datas2nd[index]['produk_perusahaan'],
                        "perusahaan_id": null,
                    }
                    delete this.datas2nd[index]['kbki_produk_perusahaan']
                    // delete this.datas2nd[index]['produk_perusahaan']

                    //aktivitas perusahaan
                    this.datas2nd[index]['aktivitas_perusahaan'] = {
                        "id": null,
                        "aktivitas": this.datas2nd[index]['aktivitas_perusahaan'],
                        "jenis": null,
                        "kategori": this.datas2nd[index]['kategori_aktivitas_perusahaan'],
                        "kbli": this.datas2nd[index]['kbli_aktivitas_perusahaan'],
                        "perusahaan_id": null
                    }
                    delete this.datas2nd[index]['kategori_aktivitas_perusahaan']
                    delete this.datas2nd[index]['kbli_aktivitas_perusahaan']

                    //pemegang saham
                    this.datas2nd[index]['pemegang_saham'] = {
                        "id": null,
                        "pemegang_saham": this.datas2nd[index]['pemegang_saham'],
                        "persentase_saham": this.datas2nd[index]['persentase_saham'],
                        "pemegang_saham_perusahaan_id": null,
                        "perusahaan_id": null
                    }
                    delete this.datas2nd[index]['persentase_saham']

                    //alamat_perusahaan
                    this.datas2nd[index]['alamat_email_perusahaan'] = {
                        "id": null,
                        "email": this.datas2nd[index]['alamat_email_perusahaan'],
                        "perusahaan_id": null
                    }
                    // delete this.datas2nd[index]['alamat_email_perusahaan']

                    //alamat_fax_perusahaan
                    this.datas2nd[index]['alamat_fax_perusahaan'] = {
                        "id": null,
                        "nomor_faksimili": this.datas2nd[index]['alamat_fax_perusahaan'],
                        "perusahaan_id": null
                    }
                    // delete this.datas2nd[index]['alamat_fax_perusahaan']

                    //alamat_telepon_perusahaan
                    this.datas2nd[index]['alamat_telepon_perusahaan'] = {
                        "id": null,
                        "nomor_ekstensi": null,
                        "nomor_telepon": this.datas2nd[index]['alamat_telepon_perusahaan'],
                        "perusahaan_id": null
                    }
                    // delete this.datas2nd[index]['alamat_telepon_perusahaan']

                    //alamat_web_perusahaan
                    this.datas2nd[index]['alamat_web_perusahaan'] = {
                        "id": null,
                        "website": this.datas2nd[index]['alamat_web_perusahaan'],
                        "perusahaan_id": null
                    }
                    // delete this.datas2nd[index]['alamat_web_perusahaan']

                    //kontak_perusahaan
                    this.datas2nd[index]['kontak_perusahaan'] = {
                        "id": null,
                        "email": this.datas2nd[index]['kontak_perusahaan_email'],
                        "nama": this.datas2nd[index]['kontak_perusahaan_nama'],
                        "nomor_telepon": this.datas2nd[index]['kontak_perusahaan_nomor_telepon'],
                        "kbji_id": null,
                        "perusahaan_id": null

                    }
                    delete this.datas2nd[index]['kontak_perusahaan_email']
                    delete this.datas2nd[index]['kontak_perusahaan_nama']
                    delete this.datas2nd[index]['kontak_perusahaan_nomor_telepon']

                    this.datas2nd[index]['tes'] = 'tes'

                }                

            },
            editKeySelected(data) {

                this.selectedKey = this.displayKey

                this.editedValue = data.data

                this.displayBasic3 = true
            },
            editValueSelected(data1, data2) {
                // console.log('data1', data1, 'data2', data2)
                // console.log('selectedValue', this.selectedData[data2.data.variabel])
                this.selectedKey = data2.data.variabel

                if (data1 == null) {
                    this.editedValue = ''
                } else {
                    this.editedValue = data1
                }


                this.displayBasic2 = true
            },
            editValue2(data1, data2, key) {
                // console.log(data1, data2.data[key])
                if (data1 === data2.data[key]) {
                    // console.log('value', data2.data[key])
                    // console.log('data tr', this.transposedData[data2.index][key])
                    this.selectedKey = key
                    this.selectedIndex = data2.index
                    this.editedValue = data2.data[key]
                    this.displayBasic2 = true
                }
            },
            editValue(data1, data2, key) {
                // console.log(data1, data2.data.value)
                if (data1 === data2.data.value) {
                    // console.log('value', data2.data.value)
                    // console.log('data tr', this.transposedData[data2.index][key])
                    this.selectedKey = key
                    this.selectedIndex = data2.index
                    this.editedValue = data2.data.value
                    this.displayBasic2 = true
                }
            },
            transpose(data) {
                console.log('data yg mau di transpose', data)
                this.transposedData = Object.entries(data).map(([variabel, value]) => ({
                    variabel,
                    value
                }))                                

                for (let index = 0; index < this.datas2nd.length; index++) {
                    let newSumber = "sumber" + (index + 1)
                    // let namaNewSumber = `Sumber ${index + 1}`
                    this.transposedData.forEach((element, indexTD) => {
                        // console.log(newSumber, 'element :', element, 'indexTD', indexTD)
                        this.transposedData[indexTD][newSumber] = this.datas2nd[index][element.variabel]
                        // this.transposedData[indexTD]['namaNewSumber'] = namaNewSumber
                    });

                }

                console.table('transposedData Table', this.transposedData)
                

            },
            validasi() {
                var myKeys = Object.keys(this.selectedData)
                myKeys.forEach(element => {
                    // console.log(element, 'element')
                    if (element !== 'telepon' &&
                        element !== 'fax' &&
                        element !== 'email' &&
                        element !== 'website' &&
                        element !== 'petugas_assessment'
                    ) {
                        if (this.selectedData[element] == null) {
                            var errorMsg = element + ' harus terisi'
                            this.errorMessages.push(errorMsg)
                        }

                    }
                });

                if (Array.isArray(this.selectedData['telepon'])) {
                    // console.log('true telepon')
                    if (this.selectedData['telepon'].length !== 3) {
                        var message = "Jumlah ekstensi dan no telepon harus 3 pasang"
                        this.errorMessages.push(message)
                    }
                } else {
                    // console.log('false telepon')
                    message = "Jumlah ekstensi dan no telepon harus 3 pasang"
                    this.errorMessages.push(message)
                }

                if (Array.isArray(this.selectedData['fax'])) {
                    // console.log('true telepon')
                    if (this.selectedData['fax'].length !== 2) {                        
                        var messageFax = "Jumlah fax harus 2"
                        this.errorMessages.push(messageFax)
                    }
                } else {
                    // console.log('false fax')
                    messageFax = "Jumlah fax harus 2"
                    this.errorMessages.push(messageFax)
                }

                if (Array.isArray(this.selectedData['email'])) {
                    // console.log('true telepon')
                    if (this.selectedData['email'].length !== 2) {
                        var messageEmail = "Jumlah email harus 2"
                        this.errorMessages.push(messageEmail)
                    }
                } else {
                    // console.log('false email')
                    messageEmail = "Jumlah email harus 2"
                    this.errorMessages.push(messageEmail)
                }

                if (Array.isArray(this.selectedData['website'])) {
                    // console.log('true telepon')
                    if (this.selectedData['website'].length !== 2) {
                        var messageWeb = "Jumlah Website harus 2"
                        this.errorMessages.push(messageWeb)
                    }
                } else {
                    // console.log('false web')
                    messageWeb = "Jumlah Website harus 2"
                    this.errorMessages.push(messageWeb)
                }
            },
            async submit() {
                this.errorMessages = []
                // this.loadingDialog = true                

                //id Alokasi
                this.selectedData['id_alokasi'] = this.idAlokasi

                //Select Petugas Id
                this.selectedData['petugas_assessment'] = this.currentId

                //Id Perusahaan
                this.selectedData['id_perusahaan'] = this.idPerusahaan
                this.reformatKey()
                
                console.log('finalSelectedData', this.selectedData)
                // if (this.errorMessages.length == 0) {
                //     await DataService.postDataAssessment(this.selectedData, this.selectedKegiatan.id_kegiatan,
                //             this.currentId).then(response => {
                //             console.log(response);

                //             this.getDataSBR().then(response => {
                //                 console.log(response)
                //                 this.$toast.add({
                //                     severity: 'success',
                //                     summary: 'Yeay!',
                //                     detail: 'Data berhasil disubmit :)',
                //                     life: 3000
                //                 });
                //             })
                //             this.loadingDialog = false                           
                //         })
                //         .catch(function (error) {
                //             console.log('myerror', error);
                //             this.loadingDialog = false
                //             this.$toast.add({
                //                 severity: 'error',
                //                 summary: 'Error!',
                //                 detail: 'Ups, ada error :(',
                //                 life: 5000
                //             });
                //         });

                // } else {
                //     this.loadingDialog = false
                //     this.$toast.add({
                //         severity: 'error',
                //         summary: 'Error!',
                //         detail: 'Ups, ada error :(',
                //         life: 5000
                //     });
                // }
            },
            reformatKey() {
                // console.log('reformatKey', this.selectedData)                

                this.selectedData['negara_id'] = this.selectedData.negara !== null ? this.selectedData.negara
                    .negara_id : null
                this.selectedData['negara_kode'] = this.selectedData.negara !== null ? this.selectedData.negara
                    .negara_kode : null
                this.selectedData['negara_nama'] = this.selectedData.negara !== null ? this.selectedData.negara
                    .negara_nama : null             

                this.selectedData['provinsi_id'] = this.selectedData.provinsi !== null ? this.selectedData.provinsi
                    .provinsi_id : null
                this.selectedData['provinsi_kode'] = this.selectedData.provinsi !== null ? this.selectedData.provinsi
                    .provinsi_kode : null
                this.selectedData['provinsi_nama'] = this.selectedData.provinsi !== null ? this.selectedData.provinsi
                    .provinsi_nama : null                

                this.selectedData['kabupaten_kota_id'] = this.selectedData.kabupaten_kota !== null ? this.selectedData
                    .kabupaten_kota.kabupaten_kota_id : null
                this.selectedData['kabupaten_kota_kode'] = this.selectedData.kabupaten_kota !== null ? this.selectedData
                    .kabupaten_kota.kabupaten_kota_kode : null
                this.selectedData['kabupaten_kota_nama'] = this.selectedData.kabupaten_kota !== null ? this.selectedData
                    .kabupaten_kota.kabupaten_kota_nama : null         

                this.selectedData['kecamatan_id'] = this.selectedData.kecamatan !== null ? this.selectedData.kecamatan
                    .kecamatan_id : null
                this.selectedData['kecamatan_kode'] = this.selectedData.kecamatan !== null ? this.selectedData.kecamatan
                    .kecamatan_kode : null
                this.selectedData['kecamatan_nama'] = this.selectedData.kecamatan !== null ? this.selectedData.kecamatan
                    .kecamatan_nama : null                

                this.selectedData['kelurahan_desa_id'] = this.selectedData.kelurahan_desa !== null ? this.selectedData
                    .kelurahan_desa.kelurahan_desa_id : null
                this.selectedData['kelurahan_desa_kode'] = this.selectedData.kelurahan_desa !== null ? this.selectedData
                    .kelurahan_desa.kelurahan_desa_kode : null
                this.selectedData['kelurahan_desa_nama'] = this.selectedData.kelurahan_desa !== null ? this.selectedData
                    .kelurahan_desa.kelurahan_desa_nama : null                

                this.selectedData['jaringan_usaha_id'] = this.selectedData.jaringan_usaha !== null ? this.selectedData
                    .jaringan_usaha.jaringan_usaha_id : null
                this.selectedData['jaringan_usaha_kode'] = this.selectedData.jaringan_usaha !== null ? this.selectedData
                    .jaringan_usaha.jaringan_usaha_kode : null
                this.selectedData['jaringan_usaha_nama'] = this.selectedData.jaringan_usaha !== null ? this.selectedData
                    .jaringan_usaha.jaringan_usaha_nama : null                

                this.selectedData['jenis_badan_hukum_badan_usaha_id'] = this.selectedData
                    .jenis_badan_hukum_badan_usaha !== null ? this.selectedData.jenis_badan_hukum_badan_usaha
                    .jenis_badan_hukum_badan_usaha_id : null
                this.selectedData['jenis_badan_hukum_badan_usaha_kode'] = this.selectedData
                    .jenis_badan_hukum_badan_usaha !== null ? this.selectedData.jenis_badan_hukum_badan_usaha
                    .jenis_badan_hukum_badan_usaha_kode : null
                this.selectedData['jenis_badan_hukum_badan_usaha_nama'] = this.selectedData
                    .jenis_badan_hukum_badan_usaha !== null ? this.selectedData.jenis_badan_hukum_badan_usaha
                    .jenis_badan_hukum_badan_usaha_nama : null                

                this.selectedData['kbji_pengusaha_id'] = this.selectedData.kbji_pengusaha !== null ? this.selectedData
                    .kbji_pengusaha.kbji_pengusaha_id : null
                this.selectedData['kbji_pengusaha_kode'] = this.selectedData.kbji_pengusaha !== null ? this.selectedData
                    .kbji_pengusaha.kbji_pengusaha_kode : null
                this.selectedData['kbji_pengusaha_nama'] = this.selectedData.kbji_pengusaha !== null ? this.selectedData
                    .kbji_pengusaha.kbji_pengusaha_nama : null


                this.selectedData['kewarganegaraan_pengusaha_id'] = this.selectedData.kewarganegaraan_pengusaha !==
                    null ? this.selectedData.kewarganegaraan_pengusaha.kewarganegaraan_pengusaha_id : null
                this.selectedData['kewarganegaraan_pengusaha_kode'] = this.selectedData.kewarganegaraan_pengusaha !==
                    null ? this.selectedData.kewarganegaraan_pengusaha.kewarganegaraan_pengusaha_kode : null
                this.selectedData['kewarganegaraan_pengusaha_nama'] = this.selectedData.kewarganegaraan_pengusaha !==
                    null ? this.selectedData.kewarganegaraan_pengusaha.kewarganegaraan_pengusaha_nama : null

                this.selectedData['pajak_jeniswp_id'] = this.selectedData.pajak_jeniswp !== null ? this.selectedData
                    .pajak_jeniswp.pajak_jeniswp_id : null
                this.selectedData['pajak_jeniswp_kode'] = this.selectedData.pajak_jeniswp !== null ? this.selectedData
                    .pajak_jeniswp.pajak_jeniswp_kode : null
                this.selectedData['pajak_jeniswp_nama'] = this.selectedData.pajak_jeniswp !== null ? this.selectedData
                    .pajak_jeniswp.pajak_jeniswp_nama : null

                this.selectedData['pajak_skala_usaha_id'] = this.selectedData.pajak_skala_usaha !== null ? this
                    .selectedData.pajak_skala_usaha.pajak_skala_usaha_id : null
                this.selectedData['pajak_skala_usaha_kode'] = this.selectedData.pajak_skala_usaha !== null ? this
                    .selectedData.pajak_skala_usaha.pajak_skala_usaha_kode : null
                this.selectedData['pajak_skala_usaha_nama'] = this.selectedData.pajak_skala_usaha !== null ? this
                    .selectedData.pajak_skala_usaha.pajak_skala_usaha_nama : null

                this.selectedData['pajak_statuswp_id'] = this.selectedData.pajak_statuswp !== null ? this.selectedData
                    .pajak_statuswp.pajak_statuswp_id : null
                this.selectedData['pajak_statuswp_kode'] = this.selectedData.pajak_statuswp !== null ? this.selectedData
                    .pajak_statuswp.pajak_statuswp_kode : null
                this.selectedData['pajak_statuswp_nama'] = this.selectedData.pajak_statuswp !== null ? this.selectedData
                    .pajak_statuswp.pajak_statuswp_nama : null

                this.selectedData['sektor_institusi_id'] = this.selectedData.sektor_institusi !== null ? this
                    .selectedData.sektor_institusi.sektor_institusi_id : null
                this.selectedData['sektor_institusi_kode'] = this.selectedData.sektor_institusi !== null ? this
                    .selectedData.sektor_institusi.sektor_institusi_kode : null
                this.selectedData['sektor_institusi_nama'] = this.selectedData.sektor_institusi !== null ? this
                    .selectedData.sektor_institusi.sektor_institusi_nama : null

                this.selectedData['status_perusahaan_id'] = this.selectedData.status_perusahaan !== null ? this
                    .selectedData.status_perusahaan.status_perusahaan_id : null
                this.selectedData['status_perusahaan_kode'] = this.selectedData.status_perusahaan !== null ? this
                    .selectedData.status_perusahaan.status_perusahaan_kode : null
                this.selectedData['status_perusahaan_nama'] = this.selectedData.status_perusahaan !== null ? this
                    .selectedData.status_perusahaan.status_perusahaan_nama : null

                this.selectedData['produk_perusahaan'] = this.selectedData['produk_perusahaan'] == null ? [] : this
                    .selectedData['produk_perusahaan']
                this.selectedData['aktivitas_perusahaan'] = this.selectedData['aktivitas_perusahaan'] == null ? [] :
                    this.selectedData['aktivitas_perusahaan']
                this.selectedData['pemegang_saham'] = this.selectedData['pemegang_saham'] == null ? [] : this
                    .selectedData['pemegang_saham']
                this.selectedData['alamat_email_perusahaan'] = this.selectedData['alamat_email_perusahaan'] == null ?
                [] : this.selectedData['alamat_email_perusahaan']
                this.selectedData['alamat_fax_perusahaan'] = this.selectedData['alamat_fax_perusahaan'] == null ? [] :
                    this.selectedData['alamat_fax_perusahaan']
                this.selectedData['alamat_telepon_perusahaan'] = this.selectedData['alamat_telepon_perusahaan'] ==
                    null ? [] : this.selectedData['alamat_telepon_perusahaan']
                this.selectedData['alamat_web_perusahaan'] = this.selectedData['alamat_web_perusahaan'] == null ? [] :
                    this.selectedData['alamat_web_perusahaan']
                this.selectedData['kontak_perusahaan'] = this.selectedData['kontak_perusahaan'] == null ? [] : this
                    .selectedData['kontak_perusahaan']

            },
            selectAll(data) {


                Object.entries(data).forEach(element => {
                    this.selectedData[element[0]] = element[1]
                    // console.log(element)
                });

            },

            selectValue(item, index, indexN) {

                console.log(`item ${item}`)
                console.log(`index ${index}`)
                console.log(`indexN ${indexN}`)

            }
        }
    }
</script>

<style scoped>
    .p-progressbar .p-progressbar-label {
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

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
    }

    td,
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        /* background-color: #dddddd; */
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