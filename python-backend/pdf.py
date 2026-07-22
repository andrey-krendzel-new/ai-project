import fitz

def read_pdf(path: str) -> str:
    doc = fitz.open(path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text