import fitz
import requests

from bs4 import BeautifulSoup

def read_pdf(path):

    doc = fitz.open(path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def read_url(url):

    html = requests.get(url).text

    soup = BeautifulSoup(
        html,
        "html.parser"
    )

    return soup.get_text()