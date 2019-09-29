
import time
import sys
import serial

from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message

import RPi.GPIO as GPIO

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

root = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "app", "static", "dist")

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'tyagideepu133@gmail.com'
app.config['MAIL_PASSWORD'] = 'Tesla08@'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# GPIO SETUP
FIRE_CHANNEL = 12
CAR_CHANNEL = 19
GPIO.setmode(GPIO.BCM)

GPIO.setup(FIRE_CHANNEL, GPIO.IN)

GPIO.setup(CAR_CHANNEL, GPIO.OUT)
GPIO.output(CAR_CHANNEL, False)


# -------------------------------------------------------GPS Code

# Gps setup
gpgga_info = "$GPGGA,"
# ser = serial.Serial ("/dev/ttyAMA0")              #Open port with baud rate
GPGGA_buffer = 0
NMEA_buff = 0
lat_in_degrees = 28.346678
long_in_degrees = 77.534380


def GPS_Info(NMEA_buffer):
    global NMEA_buff
    global lat_in_degrees
    global long_in_degrees
    NMEA_buff = NMEA_buffer
    nmea_time = []
    nmea_latitude = []
    nmea_longitude = []
    nmea_time = NMEA_buff[0]  # extract time from GPGGA string
    nmea_latitude = NMEA_buff[1]  # extract latitude from GPGGA string
    nmea_longitude = NMEA_buff[3]  # extract longitude from GPGGA string

    print("NMEA Time: ", nmea_time, '\n')
    print("NMEA Latitude:", nmea_latitude,
          "NMEA Longitude:", nmea_longitude, '\n')

    lat = float(nmea_latitude)  # convert string into float for calculation
    longi = float(nmea_longitude)  # convertr string into float for calculation

    # get latitude in degree decimal format
    lat_in_degrees = convert_to_degrees(lat)
    # get longitude in degree decimal format
    long_in_degrees = convert_to_degrees(longi)

# convert raw NMEA string into degree decimal format


def convert_to_degrees(raw_value):
    decimal_value = raw_value/100.00
    degrees = int(decimal_value)
    mm_mmmm = (decimal_value - int(decimal_value))/0.6
    position = degrees + mm_mmmm
    position = "%.6f" % (position)
    return position


# ---------------------------------------------------------------GPS Code ends


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)


@app.route('/', methods=['GET'])
def redirect_to_index():
    return send_from_directory(root, 'index.html')


@app.route('/api/shutdown/', methods=['GET'])
def shutdown():
    os.system("sudo shutdown -h now")
    return "System Closed"


@app.route('/api/caron/', methods=['GET'])
def caron():
    GPIO.output(CAR_CHANNEL, True)
    return "Car turned on"


@app.route('/api/caroff/', methods=['GET'])
def caroff():
    GPIO.output(CAR_CHANNEL, False)
    return "Car turned off"


@app.route('/api/speed/', methods=['GET'])
def speed():
    data = {
        "speed": 0
    }
    return jsonify(data)


@app.route('/api/flame/', methods=['GET'])
def flame():
    flm_inp = GPIO.input(FIRE_CHANNEL)
    if(flm_inp == True):
        flm = False
    elif (flm_inp == False):
        flm = True
    else:
        flm = False
    data = {
        "status": flm
    }
    return jsonify(data)


@app.route('/api/gps/', methods=['GET'])
def gps_api():
    # received_data = (str)(ser.readline())
    # GPGGA_data_available = received_data.find(gpgga_info)
    # if (GPGGA_data_available>0):
        # GPGGA_buffer = received_data.split("$GPGGA,",1)[1]  #store data coming after "$GPGGA," string
        # NMEA_buffer = (GPGGA_buffer.split(','))               #store comma separated data in buffer
        # GPS_Info(NMEA_buffer)

    data = {
        "lat": lat_in_degrees,
        "lng": long_in_degrees
    }
    return jsonify(data)


@app.route("/api/mail/", methods=["POST"])
def mailer():
    sub = request.json['sub']
    body = request.json['body']
    email = request.json['email']

    msg = Message(sub, sender='tyagideepu133@gmail.com',
                  recipients=[email])
    msg.body = body
    mail.send(msg)
    return "Mail sent successfully"


if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)
