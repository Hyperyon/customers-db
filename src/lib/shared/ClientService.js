async function save (expenses) {
	const res = await fetch('http://192.168.1.73:9997/lapost', {
		method: 'POST',
		body: JSON.stringify(expenses)
	})
}

async function read () {
	const res = await fetch('http://192.168.1.73:9997', {
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