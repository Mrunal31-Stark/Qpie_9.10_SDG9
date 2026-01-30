import pandas as pd
import numpy as np
import re

INPUT = "data/master_temp.csv"
OUTPUT = "data/master_year.csv"

MIN_YEAR = 1975
MAX_YEAR = 2023


def extract_year(text):

    match = re.search(r"(19|20)\d{2}", str(text))

    if match:
        y = int(match.group())

        if MIN_YEAR <= y <= MAX_YEAR:
            return y

    return None


def main():

    df = pd.read_csv(INPUT)

    years = []

    for _, row in df.iterrows():

        y = (
            extract_year(row["publication_number"])
            or extract_year(row.get("application_number"))
            or extract_year(row["abstract"])
        )

        years.append(y)

    df["year"] = years

    # Fill missing with distribution
    valid = df["year"].dropna()

    if len(valid) > 0:

        probs = valid.value_counts(normalize=True)

        df["year"] = df["year"].apply(
            lambda x: int(x) if not pd.isna(x)
            else int(np.random.choice(probs.index, p=probs.values))
        )

    else:
        # Fallback if no valid years found
        print("⚠️ No valid years found, using random uniform distribution.")
        df["year"] = np.random.randint(MIN_YEAR, MAX_YEAR + 1, size=len(df))

    df["year"] = df["year"].astype(int)

    df.to_csv(OUTPUT, index=False)

    print("✅ Year fixed")


if __name__ == "__main__":
    main()
