import pandas as pd
import pyarrow.parquet as pq

VECTOR_FILE = "data/vector_with_embeddings.csv"
PARQUET_FILE = "data/all_patents.parquet"
OUTPUT = "data/uspto.csv" # Overwrite the previous step2 output for compatibility

MAX_ROWS = 10000   # you can increase


def main():

    print("Loading vector IDs...")

    vec = pd.read_csv(VECTOR_FILE)

    ids = set(vec["publication_number"].astype(str))

    print("Vector IDs:", len(ids))

    parquet = pq.ParquetFile(PARQUET_FILE)

    matched = []
    total = 0

    print("Scanning parquet...")

    for batch in parquet.iter_batches(batch_size=10000):

        df = batch.to_pandas()

        df["publication_number"] = df["publication_number"].astype(str)

        hit = df[df["publication_number"].isin(ids)]

        if not hit.empty:
            matched.append(hit)
            total += len(hit)

        if total >= MAX_ROWS:
            break

    if matched:
        final = pd.concat(matched).head(MAX_ROWS)
        final.to_csv(OUTPUT, index=False)
        print("✅ Saved:", len(final), "matched rows")
    else:
        print("❌ No matches found in scanned batches.")


if __name__ == "__main__":
    main()
