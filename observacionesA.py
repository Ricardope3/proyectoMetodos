import pandas as pd

df = pd.read_csv ("output.csv",sep=" ")

for index, row in df.iterrows():
    SHA = float(row['SHA'])
    SHB = float(row['SHB'])
    XAB = int(row['XAB'])
    XBA = int(row['XBA'])
    if(XAB):
        print('engaged', end=" ")
    else:
        if(XBA):
            if(SHA <=0.3):
                print('neutral', end=" ")
            else:
                print('hostil', end=" ")
        else:
            if(SHA <=0.3):
                if(SHB<=0.4):
                    print('cooperativo', end=" ")
                elif(SHB<=0.7):
                    print('neutral', end=" ")
                else:
                    print('hostil', end=" ")
            elif(SHA<=0.6):
                if(SHB<=0.3):
                    print('cooperativo', end=" ")
                elif(SHB<=0.6):
                    print('neutral', end=" ")
                else:
                    print('hostil', end=" ")
            else:
                if(SHB<=0.45):
                    print('neutral', end=" ")
                else:
                    print('cooperativo', end=" ")

    