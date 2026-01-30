import pandas as pd

PARQUET_FILE = "data/all_patents.parquet"
VECTOR_FILE = "data/vector_with_embeddings.csv"
OUTPUT = "data/uspto.csv"


def main():
    print("Loading vector IDs to ensure overlap...")
    try:
        vec_df = pd.read_csv(VECTOR_FILE)
        target_ids = set(vec_df["publication_number"].unique())
        print(f"Found {len(target_ids)} IDs in vector dataset.")
    except Exception as e:
        print(f"parning: Could not load vector file: {e}")
        target_ids = set()

    print("Reading Parquet file...")
    # Read full parquet to find matches (hackathon tradeoff: memory vs accuracy)
    # If too large, we might need iterative reading, but 3GB might fit or we use pyarrow to filter
    
    df = pd.read_parquet(PARQUET_FILE)
    
    # Filter for matches
    matches = df[df["publication_number"].isin(target_ids)]
    print(f"Found {len(matches)} matching rows in Parquet.")
    
    # If we have matches, use them. If not enough, add random samples.
    if len(matches) < 3000:
        remaining_needed = 3000 - len(matches)
        # Filter out already selected
        non_matches = df[~df["publication_number"].isin(target_ids)]
        if len(non_matches) > remaining_needed:
             random_sample = non_matches.sample(remaining_needed, random_state=42)
             final_df = pd.concat([matches, random_sample])
        else:
             final_df = pd.concat([matches, non_matches])
    else:
        final_df = matches.sample(3000, random_state=42) # Limit to 3000 if we have too many matches

    final_df.to_csv(OUTPUT, index=False)
    print(f"✅ Parquet converted with {len(final_df)} rows ({len(matches)} guaranteed matches)")


if __name__ == "__main__":
    main()
