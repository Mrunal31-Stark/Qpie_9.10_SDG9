import pandas as pd


def analyze_trends(file="data/master_patents.csv"):

    df = pd.read_csv(file)

    trends = (
        df.groupby(["year", "domain"])
        .size()
        .reset_index(name="count")
        .sort_values(["year", "count"], ascending=False)
    )

    return trends


if __name__ == "__main__":

    trends = analyze_trends()

    print(trends.head(10))
