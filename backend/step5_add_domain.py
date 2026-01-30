import pandas as pd

INPUT = "data/master_year.csv"
OUTPUT = "data/master_patents.csv"


def detect_domain(text):

    text = str(text).lower()

    if any(w in text for w in ["neural", "machine learning", "ai", "deep learning"]):
        return "AI / ML"

    if any(w in text for w in ["medical", "disease", "diagnosis", "surgery"]):
        return "Healthcare"

    if any(w in text for w in ["battery", "solar", "energy", "power"]):
        return "Energy"

    if any(w in text for w in ["vehicle", "engine", "automobile", "ev"]):
        return "Automotive"

    if any(w in text for w in ["network", "wireless", "communication", "5g"]):
        return "Telecom"

    if any(w in text for w in ["sensor", "iot", "embedded", "device"]):
        return "IoT"

    return "General Tech"


def main():

    df = pd.read_csv(INPUT)

    df["domain"] = df["abstract"].apply(detect_domain)

    df.to_csv(OUTPUT, index=False)

    print("✅ Domain inferred")


if __name__ == "__main__":
    main()
