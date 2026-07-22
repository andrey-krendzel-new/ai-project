import chromadb

client = chromadb.Client()

collection = client.create_collection(
    "research"
)

collection.add(
    documents=chunks,
    embeddings=vectors.tolist(),
    ids=[str(i) for i in range(len(chunks))]
)