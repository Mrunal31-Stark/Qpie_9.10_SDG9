import pandas as pd

VEC = "data/vector_with_embeddings.csv"
USP = "data/uspto.csv"
OUT = "data/master_temp.csv"


def main():

    vec = pd.read_csv(VEC)
    usp = pd.read_csv(USP)

    # Remove duplicates
    vec = vec.drop_duplicates("publication_number")
    usp = usp.drop_duplicates("publication_number")

    print("Merging...")

    merged = pd.merge(
        usp,
        vec,
        on="publication_number",
        how="inner",
        suffixes=("_uspto", "_vec")
    )

    # Keep best abstract
    merged["abstract_final"] = merged["abstract_uspto"].fillna(
        merged["abstract_vec"]
    )

    merged.drop(
        columns=["abstract_uspto", "abstract_vec"],
        inplace=True,
        errors="ignore"
    )

    merged.rename(columns={
        "abstract_final": "abstract"
    }, inplace=True)

    merged.to_csv(OUT, index=False)

    print("✅ Merge complete")


if __name__ == "__main__":
    main()
