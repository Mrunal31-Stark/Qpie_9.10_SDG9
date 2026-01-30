import pandas as pd
import ast
import numpy as np

from similarity_engine import SimilarityEngine
from query_embedder import QueryEmbedder
from risk_score import calculate_risk


# Load data and parse embeddings correctly
print("Loading master patents...")
df = pd.read_csv("data/master_patents.csv")
df["embedding"] = df["embedding"].apply(ast.literal_eval)

engine = SimilarityEngine(df["embedding"].tolist())
embedder = QueryEmbedder()


print("\n--- Patent Similarity Check ---")
idea = input("Enter your idea: ")

print("Embedding idea...")
query_vec = embedder.embed(idea)

idx, sims = engine.compute_similarity(query_vec)

risk, score = calculate_risk(sims)

print("\nDuplicate Risk:", risk)
print("Avg Similarity:", round(score, 3))

print("\nTop Matches:\n")

for i in idx:
    print(f"- [{round(sims[np.where(idx == i)[0][0]] * 100, 1)}%] {df.iloc[i]['title']}")
