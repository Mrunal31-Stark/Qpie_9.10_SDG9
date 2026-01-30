import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class SimilarityEngine:

    def __init__(self, embeddings):
        # embeddings: list of vectors
        self.embeddings = np.array(
            embeddings.tolist() if hasattr(embeddings, "tolist") else embeddings
        )

    def compute_similarity(self, query_vector, top_k=5):

        query_vector = np.array(query_vector).reshape(1, -1)

        sims = cosine_similarity(query_vector, self.embeddings)[0]

        top_idx = sims.argsort()[-top_k:][::-1]

        return top_idx, sims[top_idx]
