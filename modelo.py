import numpy as np
import math
import random

GAMMA = 0.90
SAMPLE_SIZE = 2500000
SAMPLE = lista = np.random.random_sample(SAMPLE_SIZE)
PERIODS = 100000

def normalize(lista):
    for i in range(0, len(lista)-1, 2):
        r1 = lista[i]
        r2 = lista[i+1]
        x1 = math.sqrt(math.log(r1, math.e)*-1)*math.cos(100*math.pi*r2)+4
        x2 = math.sqrt(math.log(r1, math.e)*-100)*math.sin(1.12*math.pi*r2)+4
        lista[i] = x1
        lista[i+1] = x2
    minimo = min(lista)
    normalizada = (lista-minimo)/(max(lista)-minimo)
    return normalizada

def GRX(sample):
    index = random.randint(0, len(sample)-1)
    return sample[index]

def DIX(prevDIX, GRX):
    return (prevDIX * (1+GRX))

def DIXpercentage(DIX, DIY):
    return DIX / (DIX + DIY)

def GDX(DIXpercentage, DIYpercentage, case=1):
    if(case == 0):
        return max(0, (DIYpercentage-DIXpercentage))
    elif(case == 1):
        return abs(DIYpercentage-DIXpercentage)

def getWeigths():
    beta = random.random()
    delta = random.random()
    alpha = 1 - beta - delta
    return [alpha, beta, delta]


def PHX(prevPHA, prevXBA, GDX):
    res = -1
    while(res < 0 or res > 1):
        weights = getWeigths()
        alpha = weights[0]
        beta = weights[1]
        delta = weights[2]
        res = alpha*prevPHA + beta*prevXBA + delta*GDX
    return res

def XXY(PHX):
    if(random.random() < PHX):
        return 0
    else:
        return 1

def SHX(prevSHX, PHX, gamma):
    return gamma*prevSHX + (1-gamma)*PHX

def getOutputs():
    print("SHA","SHB","XAB","XBA")
    normalized = normalize(SAMPLE)
    case = 1
    prevDIA = 0.5
    prevDIB = 0.5
    prevPHA = 0.2
    prevPHB = 0.2
    prevXAB = 0
    prevXBA = 0
    prevSHA = 0.1
    prevSHB = 0.1
    for i in range(PERIODS):
        GRA = GRX(normalized)
        GRB = GRX(normalized)

        DIA = DIX(prevDIA, GRA)
        DIB = DIX(prevDIB, GRB)

        if(DIA > 10000000 and DIB > 10000000):
            DIA *= 0.001
            DIB *= 0.001

        DIApercent = DIXpercentage(DIA, DIB)
        DIBpercent = DIXpercentage(DIB, DIA)

        if(DIApercent < 0.0001):
            return
        if(DIBpercent < 0.0001):
            return

        GDA = GDX(DIApercent, DIBpercent, case)
        GDB = GDX(DIBpercent, DIApercent, case)

        PHA = PHX(prevPHA, prevXBA, GDA)
        PHB = PHX(prevPHB, prevXAB, GDB)

        XAB = XXY(PHA)
        XBA = XXY(PHB)

        SHA = SHX(prevSHA, PHA, GAMMA)
        SHB = SHX(prevSHB, PHB, GAMMA)

        prevDIA = DIA
        prevDIB = DIB
        prevPHA = PHA
        prevPHB = PHB
        prevXAB = XAB
        prevXBA = XBA
        prevSHA = SHA
        prevSHB = SHB
        
        print(SHA, SHB, XAB, XBA)


getOutputs()
