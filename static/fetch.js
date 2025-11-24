const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Temperature (°C)', data: [], borderWidth: 2 }]
    }
    options: {
    	animation: false
		}
});

const humChart = new Chart(document.getElementById('humChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Humidity (%)', data: [], borderWidth: 2 }]
    }
		options: {
    	animation: false
		}
});

const presChart = new Chart(document.getElementById('pressChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Pressure (hPa)', data: [], borderWidth: 2 }]
    }
    options: {
    	animation: false
		}
});

async function fetchMeasurements() {
		const limit = document.getElementById("fetch-limit").value;
    const fetchInterval = 5000;
    const url = window.location.origin.concat("/measurements?limit=").concat(limit);

    try {
        const response = await fetch(url);
        const json = await response.json(); // <-- [{temp, hum, pres}, ...]

        // create labels T0, T1, ...
        const labels = json.map((_, i) => `T${i}`);

        // extract values
        const temps = json.map(m => m.temp);
        const hums = json.map(m => m.hum);
        const press = json.map(m => m.pres);

        // update temp chart
        tempChart.data.labels = labels;
        tempChart.data.datasets[0].data = temps;
        tempChart.update();

        // update humidity chart
        humChart.data.labels = labels;
        humChart.data.datasets[0].data = hums;
        humChart.update();

        // update pressure chart
        presChart.data.labels = labels;
        presChart.data.datasets[0].data = press;
        presChart.update();

    } catch (err) {
        console.error("Failed to fetch measurements:", err);
    }

    setTimeout(fetchMeasurements, fetchInterval);
}

window.addEventListener('load', () => {
    fetchMeasurements();
});
