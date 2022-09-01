<template>
  <div class="home">    
    <div class="p-grid p-p-0 p-p-sm-1 p-p-md-2 p-p-lg-3 ">      
      <div class="p-col-12 ">
         <CompareTable5></CompareTable5>
      </div>
    </div>
  </div>
</template>

<script>

  import CompareTable5 from '@/components/CompareTable5.vue'  
   
  export default {
    name: 'Assessment',
    components: {
      CompareTable5,              
    },
    data() {
      return {
        selectedSumber: null,
        mergedDataView: [],
        options: [
			{name: 'Sumber A', code: 'NY'},
			{name: 'Sumber B', code: 'RM'},],
        dataView: [],
        data1View: [],
        data2View: [],
        data3View: [],
        myShadow: '',
        active: 0,
        buttonCompareActive: 'buttonCompareActive',
        buttonDataSourceActive: '',
        tabMenuItems: [{
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            to: '',
          },
          {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            to: '',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            to: ''
          },
          {
            label: 'Documentation',
            icon: 'pi pi-fw pi-file',
            to: ''
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            to: ''
          }
        ]
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
      dropDownOptions(data, index){
        
        console.log('dropdown clicked')
        console.log(data['data'].var1)
        console.log(`index ${index}`)

        const a =  this.data1View.filter(x => x.var1 === data['data'].var1 )      
        console.log(`a ${Object.entries(a)}`)
      }
    }
  }
</script>

<style lang="css">
  .buttonCompareActive {
    background-color: #9155fd;
    color: white;
  }

  .buttonDataSourceActive {
    background-color: #9155fd;
    color: white;
  }

  

  .p-dropdown .p-dropdown-label.p-placeholder{
         color: v-bind(textColor) !important;
    }
</style>