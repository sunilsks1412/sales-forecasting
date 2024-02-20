import datetime
import pandas as pd
class Preparation:
    
    def __init__(self, num, period, lastDate):
        
        self.num = num
        self.period = period
        self.lastDate = lastDate
        self.FEATURES = ['dayofyear', 'hour', 'dayofweek', 'quarter', 'month', 'year']
        self.pdf = None
        
    def prepare(self):
        
        self.pdf["date"] = pd.to_datetime(self.pdf['date']) #, format="%d%m%Y")
        self.pdf = self.pdf.set_index(self.pdf["date"])
        self.pdf = self.create_features(self.pdf)
        self.pdf = self.pdf.drop(["date"], axis='columns')
        self.pdf = self.pdf[self.FEATURES]
        
            
    def create_features(self, df):

        df = df.copy()
        df['hour'] = df.index.hour
        df['dayofweek'] = df.index.dayofweek
        df['quarter'] = df.index.quarter
        df['month'] = df.index.month
        df['year'] = df.index.year
        df['dayofyear'] = df.index.dayofyear
        df['dayofmonth'] = df.index.day
        df['weekofyear'] = df.index.isocalendar().week
        
        return df  
    
    def getDaysPeriod(self):
        
        if(self.period=='Monthly'):
            periodChar='M'
            num=int(self.num)*30
        if(self.period=='Daily'):
            periodChar='D'
            num=int(self.num)
        if(self.period=='Weekly'):
            periodChar='W'
            num=int(self.num)*7
        if(self.period=='Yearly'):
            periodChar='Y'
            num=int(self.num)*365
            
        return num, periodChar
    
    
    def create_Data(self):
        
        print("Creating Prediction Data")
        
        lastDate = datetime.date(int(self.lastDate.year), int(self.lastDate.month), int(self.lastDate.day))
        
        days, period = self.getDaysPeriod()
        print(days, type(period), self.lastDate )
        
        
        dates = []

        for i in range(1, int(days)+1):
            nextDate = lastDate + datetime.timedelta(days=i)
            dates.append(nextDate)
            
        self.pdf = pd.DataFrame(dates, columns=['date'])
        self.prepare()
        
        return self.pdf, period
        