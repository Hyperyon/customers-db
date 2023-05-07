async function save (names) {
	const res = await fetch('http://192.168.1.4:9997/lapost', {
		method: 'POST',
		body: JSON.stringify(names)
	})
}

async function read () {
	const res = await fetch('http://192.168.1.4:9997', {
		method: 'GET',
	})
	let tab = []
let data = await res.json()

	return data
}

const clientService = {
	save,
	read
}

export default clientService
