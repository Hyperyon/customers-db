<script type="text/javascript">
	import Client from '../lib/components/Client.svelte'
	import clientService from '../lib/shared/ClientService'

	let customers = []

	clientService.read().then(arr=>arr.forEach(element=>{
		customers.push(element)
	}))
	
	function addCustomer(e) {
		let input = e.detail
		if(input.length >= 1){
			customers = new Set([...input, ...customers])
			customers = [...customers]
			.map(toto=>toto.toUpperCase()
			.replace(/\d/g, '')
			.trim().replace(/^\s*[\r\n]/gm, ""))

			customers = new Set([ ...customers])
			customers = [...customers]
			console.log(clientService.save(customers))
		}
	}

</script>

<style type="text/css">
</style>

<Client on:adding={addCustomer} customerList={customers}/>


