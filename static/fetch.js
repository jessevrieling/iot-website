async function fetchMeasurements() {
	const url = window.location.origin.concat("/measurements")
	const response = await fetch(url)
	console.log(await response.json())

	const labels = [...Array(10).keys()].map(i => `T${i}`);

	const tempData = {
	    labels: labels,
	    datasets: [{ label: 'Temperature (°C)', data: [1,2,3,4,5,6,7,8,9], borderWidth: 2 }]
	}

	const humData = {
	    labels: labels,
	    datasets: [{ label: 'Humidity (%)', data: [10,11,12,13,14,15,16,17,18,19], borderWidth: 2 }]
	}

	const pressData = {
	    labels: labels,
	    datasets: [{ label: 'Pressure (hPa)', data: [20,21,22,23,24,25,26,27,28,29], borderWidth: 2 }]
	}

	new Chart(document.getElementById('tempChart'), { type: 'line', data: tempData })
	new Chart(document.getElementById('humChart'), { type: 'line', data: humData })
	new Chart(document.getElementById('pressChart'), { type: 'line', data: pressData })
}

window.addEventListener('load', function () {
  const fetchInterval = 5000

  setInterval(fetchMeasurements, fetchInterval)
})
