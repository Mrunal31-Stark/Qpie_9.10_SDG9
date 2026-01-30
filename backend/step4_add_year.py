import pandas as pd
import re

INPUT = "data/master_temp.csv"
OUTPUT = "data/master_year.csv"


def extract_year(row):

    # Try publication number
    pub = str(row["publication_number"])

    match = re.search(r"(19|20)\d{2}", pub)
    if match:
        return match.group()

    # Try application number
    app = str(row.get("application_number", ""))

    match = re.search(r"(19|20)\d{2}", app)
    if match:
        return match.group()

    # Try abstract
    text = str(row["abstract"])

    match = re.search(r"(19|20)\d{2}", text)
    if match:
        return match.group()

    return "Unknown"


def main():

    df = pd.read_csv(INPUT)

    # Use apply on row (axis=1) to access multiple columns
    df["year"] = df.apply(extract_year, axis=1)

    df.to_csv(OUTPUT, index=False)

    print("✅ Improved year detection done")


if __name__ == "__main__":
    main()
