from flask import Flask, render_template
import random

app = Flask(__name__)

@app.route("/measurements", methods=["GET"])

@app.route('/', methods=["GET"])
def dashboard():
    # Generate dummy sensor data
    temp = [random.randint(15, 30) for _ in range(10)]
    hum = [random.randint(20, 90) for _ in range(10)]
    press = [random.randint(950, 1050) for _ in range(10)]

    return render_template('dashboard.html', temp=temp, hum=hum, press=press)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=80)
