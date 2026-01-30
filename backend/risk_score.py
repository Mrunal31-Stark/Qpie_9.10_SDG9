import numpy as np


def calculate_risk(similarities):

    avg_sim = np.mean(similarities)

    if avg_sim > 0.8:
        return "High", avg_sim

    if avg_sim > 0.6:
        return "Medium", avg_sim

    return "Low", avg_sim
