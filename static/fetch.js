var limit = document.getElementById("fetch-limit").value;

document.getElementById("apply-button").addEventListener("click", function() {
  limit = document.getElementById("fetch-limit").value;
}); 

const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Temperature (°C)', data: [], borderWidth: 2 }]
    },
    options: {
    	animation: false,
    	 	elements: {
                    point:{
                        radius: 0
                    }
                }
		}
});

const humChart = new Chart(document.getElementById('humChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Humidity (%)', data: [], borderWidth: 2 }]
    },
		options: {
    	animation: false,
    	 	elements: {
                    point:{
                        radius: 0
                    }
                }
		}
});

const presChart = new Chart(document.getElementById('pressChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{ label: 'Pressure (hPa)', data: [], borderWidth: 2 }]
    },
    options: {
    	animation: false,
    	elements: {
                    point:{
                        radius: 0
                    }
                }
		}
});

const gaugeOptions = {
    angle: 0,
    lineWidth: 0.25,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 4,
    },
    limitMax: false,
    limitMin: false,
    colorStart: '#6FADCF',
    colorStop: '#8FC0DA',
    strokeColor: '#E0E0E0',
};

// Temperature (-20 to 60 °C)
const tempGauge = new Gauge(document.getElementById('tempGauge')).setOptions(gaugeOptions);
tempGauge.maxValue = 60;
tempGauge.setMinValue(-20);
tempGauge.set(0);

// Humidity (0–100 %)
const humGauge = new Gauge(document.getElementById('humGauge')).setOptions(gaugeOptions);
humGauge.maxValue = 100;
humGauge.setMinValue(0);
humGauge.set(0);

// Pressure (900–1100 hPa)
const presGauge = new Gauge(document.getElementById('presGauge')).setOptions(gaugeOptions);
presGauge.maxValue = 1100;
presGauge.setMinValue(900);
presGauge.set(0);

async function fetchMeasurements() {
    const fetchInterval = 1000;
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

        if (json.length > 0) {
    const latest = json[json.length - 1];

    tempGauge.set(latest.temp);
    humGauge.set(latest.hum);
    presGauge.set(latest.pres);
}

    } catch (err) {
        console.error("Failed to fetch measurements:", err);
    }

    setTimeout(fetchMeasurements, fetchInterval);
}

window.addEventListener('load', () => {
    fetchMeasurements();
});
