import time
import hashlib
import json
import os
from urllib.error import HTTPError
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup


def save_local_file(file_path, content):
    with open(file_path, "w") as file:
        file.write(content.decode("utf-8"))


def fetch_url(url, headers={"User-Agent": "Mozilla/5.0"}):
    request = Request(url=url, headers=headers)
    try:
        return urlopen(request).read()
    except HTTPError as e:
        if e.code == 301:
            new_url = e.headers["Location"]
            new_request = Request(url=new_url, headers=headers)
            return urlopen(new_request).read()
        else:
            raise


def extract_html_content(response):
    soup = BeautifulSoup(response, "lxml")

    main_content = soup.find("main")
    if main_content:
        return str(main_content)
    else:
        return ""


def get_content(url):
    response = fetch_url(url)
    return extract_html_content(response).encode("utf-8")


def main():
    news_publisher_urls = json.loads(os.getenv("NEWS_PUBLISHER_HPS"))

    contents = {
        publisher: get_content(url) for publisher, url in news_publisher_urls.items()
    }

    base_dir = "output"

    # DEBUG
    # for p, content in contents.items():
    #     save_local_file(f"./{base_dir}/{p}/{int(time.time())}.html", content)

    currentHashes = {
        publisher: hashlib.sha256(content).hexdigest()
        for publisher, content in contents.items()
    }

    print("running")
    time.sleep(5)

    while True:
        try:
            for publisher, url in news_publisher_urls.items():
                content = get_content(url)
                newHash = hashlib.sha256(content).hexdigest()
                if newHash != currentHashes[publisher]:
                    print(f"Change detected in {publisher}")
                    print(f"Current hash: {currentHashes[publisher]}")
                    print(f"New hash: {newHash}")

                    currentHashes[publisher] = newHash
                    # DEBUG
                    # save_local_file(
                    #     f"./{base_dir}/{publisher}/{int(time.time())}.html", content
                    # )
                    time.sleep(5)
                    continue
                else:
                    continue
        except Exception as e:
            print(f"error: {e}")


if __name__ == "__main__":
    main()
