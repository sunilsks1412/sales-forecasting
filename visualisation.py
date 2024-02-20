#%%
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def vis(df):
    df['date'] = pd.to_datetime(df['date'])
    plt.figure()
    plt.plot(df['date'], df['predicted'])
    plt.xlabel('Duration')
    plt.ylabel('Sales')
    plt.title('Sales over time')
    plt.savefig('./webapp/src/assets/result.jpg')