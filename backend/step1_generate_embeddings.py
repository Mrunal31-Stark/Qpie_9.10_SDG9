import pandas as pd
from sentence_transformers import SentenceTransformer
import os

INPUT = "data/Vector_dataset.csv"
OUTPUT = "data/vector_with_embeddings.csv"
SAMPLE_SIZE = 1000   # change 1000–3000
MODEL_NAME = "all-MiniLM-L6-v2"



def main():

    df = pd.read_csv(INPUT)

    # Sample
    df = df.sample(SAMPLE_SIZE, random_state=42)

    texts = df["abstract"].fillna("").tolist()

    model = SentenceTransformer(MODEL_NAME)

    embeddings = model.encode(
        texts,
        batch_size=64,
        show_progress_bar=True
    )

    df["embedding"] = embeddings.tolist()

    print(f"Current CWD: {os.getcwd()}")
    print(f"Saving to: {os.path.abspath(OUTPUT)}")
    df.to_csv(OUTPUT, index=False)

    print("✅ Fast embeddings done")


if __name__ == "__main__":
    main()