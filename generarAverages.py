import pandas as pd
import os

SIMULACIONES = 70
OUTPUT = "averages.csv"
SALTO = 'echo "" >> {}'

# ENTRENAR MODELO
os.system("echo SHA SHB XAB XBA PERIODS > {}".format(OUTPUT))
for i in range(SIMULACIONES):
    ENTRENARCMD = "python3 modelo.py >> {}".format(OUTPUT)
    os.system(ENTRENARCMD)


df = pd.read_csv(OUTPUT, sep=" ")

avgSHA = 0
avgSHB = 0
avgXAB = 0
avgXBA = 0
# totalPeriods = 0

for index, row in df.iterrows():
    SHA = float(row['SHA'])
    SHB = float(row['SHB'])
    XAB = float(row['XAB'])
    XBA = float(row['XBA'])
    # periods = int(row['PERIODS'])
    avgSHA += SHA
    avgSHB += SHB
    avgXAB += XAB
    avgXBA += XBA
    # totalPeriods += periods


# print("Average SHA: ", avgSHA/SIMULACIONES)
# print("Average SHB: ", avgSHB/SIMULACIONES)
# print("Average XAB: ", avgXAB/SIMULACIONES)
# print("Average XBA: ", avgXBA/SIMULACIONES)
# print("Total periods: ", totalPeriods)

print( avgSHA/SIMULACIONES, avgSHB/SIMULACIONES,avgXAB/SIMULACIONES,avgXBA/SIMULACIONES)