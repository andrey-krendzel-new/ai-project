from embeddings import model

from chroma import collection

def chunk_text(
    text,
    size=500
):

    words = text.split()

    return [

        " ".join(
            words[i:i+size]
        )

        for i in range(
            0,
            len(words),
            size
        )

    ]

def index_document(
    text,
    source
):

    chunks = chunk_text(text)

    vectors = model.encode(chunks)

    collection.add(

        ids=[
            f"{source}_{i}"
            for i in range(len(chunks))
        ],

        documents=chunks,

        embeddings=vectors.tolist(),

        metadatas=[

            {

                "source": source,

                "chunk": i

            }

            for i in range(len(chunks))

        ]

    )

def retrieve(
    question,
    n=5
):

    query = model.encode(
        [question]
    )

    results = collection.query(

        query_embeddings=query.tolist(),

        n_results=n

    )

    return results

