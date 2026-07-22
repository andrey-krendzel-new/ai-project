from fastapi import FastAPI
from pdf import read_pdf

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/test-pdf")
def test_pdf():
    text = read_pdf("sample.pdf")

    return {
        "text": text[:1000]
    }

