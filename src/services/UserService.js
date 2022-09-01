export default class UserService {

    getProductsSmall() {
		return fetch('https://www.primefaces.org/primevue/demo/data/products-small.json', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			  },
		}).then(res => res.json()).then(d => d.data);
	}

	
}