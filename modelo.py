import numpy as np
import math
import random
import matplotlib.pyplot as plt

GAMMA = 0.95
PERIODS = 1000
MEAN = 0.04
STDV = MEAN/2
CASE = 0
MEANA = 0.06
MEANB = 0.04


def GRX(mean):
    return np.random.normal(loc=mean, scale=mean/2)


def DIX(prevDIX, GRX):
    return (prevDIX * (1+GRX))


def DIXpercentage(DIX, DIY):
    return DIX / (DIX + DIY)


def GDX(DIXpercentage, DIYpercentage, case=1):
    if(case == 0):
        return max(0, (DIYpercentage-DIXpercentage))
    elif(case == 1):
        return abs(DIYpercentage-DIXpercentage)
    elif(case == 2):
        mean = DIXpercentage-DIYpercentage
        stdv = mean/2
        return np.random.normal(loc=mean, scale=abs(stdv))


def getWeigths():
    beta = random.random()
    alpha = random.random()
    delta = 1 - beta - alpha
    return [alpha, beta, delta]


def PHX(prevPHA, prevXBA, GDX):
    res = -1
    while(res < 0 or res > 1):
        weights = getWeigths()
        alpha = weights[0]
        beta = weights[1]
        delta = weights[2]
        res = alpha*prevPHA + beta*prevXBA + delta*GDX
    # res = 0.33*prevPHA + 0.33*prevXBA + 0.33*GDX
    return res


def XXY(PHX):
    r = random.random()
    if(r > PHX):
        return 1
    elif(r < PHX):
        return 0
    return 0


def SHX(prevSHX, PHX, gamma):
    return gamma*prevSHX + (1-gamma)*PHX


def getOutputs():
    # print("SHA SHB XAB XBA")
    prevDIA = 0.1
    prevDIB = 0.1
    prevPHA = 0.1
    prevPHB = 0.1
    prevXAB = 0
    prevXBA = 0
    prevSHA = 0.1
    prevSHB = 0.1

    avgSHA = 0
    avgSHB = 0
    avgXAB = 0
    avgXBA = 0

    # totalXAB = 0
    # totalXBA = 0
    for i in range(PERIODS):
        GRA = GRX(MEANA)
        GRB = GRX(MEANB)

        DIA = DIX(prevDIA, GRA)
        DIB = DIX(prevDIB, GRB)

        if(DIA > 10000000 and DIB > 10000000):
            DIA *= 0.001
            DIB *= 0.001

        DIApercent = DIXpercentage(DIA, DIB)
        DIBpercent = DIXpercentage(DIB, DIA)

        GDA = GDX(DIApercent, DIBpercent, CASE)
        GDB = GDX(DIBpercent, DIApercent, CASE)

        PHA = PHX(prevPHA, prevXBA, GDA)
        PHB = PHX(prevPHB, prevXAB, GDB)

        XAB = XXY(PHA)
        XBA = XXY(PHB)
        SHA = SHX(prevSHA, PHA, GAMMA)
        SHB = SHX(prevSHB, PHB, GAMMA)

        # print(SHA,SHB,XAB,XBA)


        avgSHA += SHA
        avgSHB += SHB
        avgXAB += XAB
        avgXBA += XBA

        if(DIApercent < 0.01):
            print(avgSHA/i, avgSHB/i, avgXAB/i, avgXBA/i)
            break
        if(DIBpercent < 0.01):
            print(avgSHA/i, avgSHB/i, avgXAB/i, avgXBA/i)
            break


        prevDIA = DIA
        prevDIB = DIB
        prevPHA = PHA
        prevPHB = PHB
        prevXAB = XAB
        prevXBA = XBA
        prevSHA = SHA
        prevSHB = SHB


getOutputs()
