import os

# === Config ===
base_path = os.path.join(os.getcwd(), "src", "app")
pages = [
    {"folder": "about", "title": "About Us", "description": "Learn more about us."},
    {"folder": "contact", "title": "Contact", "description": "Get in touch with us."},
]

# === TSX Template Generator ===
def generate_tsx(title: str, description: str) -> str:
    return f"""\
export const metadata = {{
  title: "{title}",
  description: "{description}",
}}

export default function Page() {{
  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{description}</p>
    </>
  );
}}
"""

# === Generate Files ===
for page in pages:
    folder_path = os.path.join(base_path, page["folder"])
    file_path = os.path.join(folder_path, "page.tsx")

    try:
        os.makedirs(folder_path, exist_ok=True)
        with open(file_path, "w") as f:
            f.write(generate_tsx(page["title"], page["description"]))
        print(f"✅ Created {file_path}")
    except Exception as e:
        print(f"❌ Error creating {file_path}: {e}")
