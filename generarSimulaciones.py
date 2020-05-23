import os

SIMULACIONES = 50
ARCHIVOA = 'observacionesA.py'
ARCHIVOB = 'observacionesB.py'
OUTPUTA = "observacionesA.csv"
OUTPUTB = "observacionesB.csv"
COMANDO = "python3 {} >> {}"
CMDA = COMANDO.format(ARCHIVOA, OUTPUTA)
CMDB = COMANDO.format(ARCHIVOB, OUTPUTB)
SALTO = 'echo "" >> {}'

# ENTRENAR MODELO
ENTRENARCMD = "python3 modelo.py > output.csv"
os.system(ENTRENARCMD)

# GENERAR OUTPUTS
for i in range(SIMULACIONES):
    os.system(CMDA)
    os.system(CMDB)
    if(i < SIMULACIONES-1):
        os.system(SALTO.format(OUTPUTA))
        os.system(SALTO.format(OUTPUTB))
