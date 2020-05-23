import pandas as pd

df = pd.read_csv("output.csv", sep=" ")

for index, row in df.iterrows():
    SHA = float(row['SHA'])
    SHB = float(row['SHB'])
    XAB = int(row['XAB'])
    XBA = int(row['XBA'])
    if(XBA):
        print('3', end=" ")
    else:
        if(XAB):
            if(SHB <= 0.3):
                print('1', end=" ")
            else:
                print('2', end=" ")
        else:
            if(SHB <= 0.3):
                if(SHA <= 0.4):
                    print('0', end=" ")
                elif(SHA <= 0.7):
                    print('1', end=" ")
                else:
                    print('2', end=" ")
            elif(SHB <= 0.6):
                if(SHA <= 0.3):
                    print('0', end=" ")
                elif(SHA <= 0.6):
                    print('1', end=" ")
                else:
                    print('2', end=" ")
            else:
                if(SHA <= 0.45):
                    print('1', end=" ")
                else:
                    print('0', end=" ")
