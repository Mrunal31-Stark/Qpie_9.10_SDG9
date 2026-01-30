import pandas as pd

df = pd.read_csv("data/master_patents.csv")

print("Rows:", len(df))
print("Columns:", list(df.columns))

print(df.head(3))
