import serial
import time
import argparse

arduino = serial.Serial(port='COM3', baudrate=9600, timeout=.1)

def write_read(x):
    arduino.write(bytes(x, 'utf-8'))
    time.sleep(0.05)
    data = arduino.readline()
    return data

parser = argparse.ArgumentParser()
parser.add_argument("-n")
args = parser.parse_args()





num = args.n # Taking input from user
print(num)
# num = input()
print('start')
time.sleep(2)
value = write_read(num)
print(value) # printing the value