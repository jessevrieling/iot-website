from flask import Flask, jsonify, render_template
import mysql.connector
import random

app = Flask(__name__)

@app.route("/measurements", methods=["GET"])
def measurements():
    limit = request.args.get("limit", default=20, type=int)

    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="iotdb"
    )

    dbcursor = db.cursor(dictionary=True);
    dbcursor.execute("SELECT * FROM `measurements` ORDER BY timestamp DESC LIMIT %s", (limit))
    records = dbcursor.fetchall()

    return jsonify(records)

@app.route('/', methods=["GET"])
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
