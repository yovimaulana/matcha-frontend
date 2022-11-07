import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'

import {
  setHeaderToken
} from './utils/auth'
import 'animate.css';
import './assets/mytheme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

import "@lottiefiles/lottie-player";

import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import TabMenu from 'primevue/tabmenu';
import Divider from 'primevue/divider';

import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dropdown from 'primevue/dropdown';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';


const token = localStorage.getItem('token');
if (token) {
  setHeaderToken(token)
}

store.dispatch('get_user', token)
  .then(() => {
    const app = createApp(App).use(router).use(PrimeVue, {ripple: true}).use(store).use(ToastService).use(ConfirmationService)

      .component('Button', Button)
      .component('Sidebar', Sidebar)
      .component('TabMenu', TabMenu)
      .component('Divider', Divider)
      .component('DataTable', DataTable)
      .component('Column', Column)
      .component('ColumnGroup', ColumnGroup)
      .component('Dropdown', Dropdown)
      .component('Card', Card)

    if (process.env.NODE_ENV === 'development') {
      app.config.performance = true;
    }

    app.directive('tooltip', Tooltip);
    app.directive('badge', BadgeDirective);


    app.mount('#app')

  }).catch((error) => {
    console.error(error);
  })