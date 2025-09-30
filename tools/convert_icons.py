import os
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed


def convert(source_file_path, target_file_path):
    try:
        with Image.open(source_file_path) as img:
            img.save(
                target_file_path,
                format="WEBP",
            )
    except Exception as e:
        return f"Error converting {source_file_path}: {e}"


def adjust_icon_name(s: str):
    return s.lstrip("0") or "0"


def convert_to_webp(source_folder, target_folder):
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)

    image_files = []
    for root, _dirs, files in os.walk(source_folder):
        for file in files:
            if file.startswith("00000."):
                continue

            source_file_path = os.path.join(root, file)
            newName = adjust_icon_name(f"{os.path.splitext(file)[0]}.webp")
            target_file_path = os.path.join(target_folder, newName)

            image_files.append((source_file_path, target_file_path))

    with ThreadPoolExecutor() as executor:
        futures = {
            executor.submit(convert, source, target): (source, target)
            for source, target in image_files
        }

        for future in as_completed(futures):
            err = future.exception()
            if err:
                print(err)


source_directory = "./data/icons"
target_directory = "./static/icons"

convert_to_webp(
    source_directory,
    target_directory,
)
