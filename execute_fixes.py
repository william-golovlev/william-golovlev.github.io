import os
import re

cwd = r'c:\Users\willi\OneDrive\Desktop\Projects\personal site\william-golovlev.github.io'
os.chdir(cwd)

# 1. Delete index.md
if os.path.exists('index.md'):
    os.remove('index.md')

# 2. Update _config.yml
config_path = '_config.yml'
with open(config_path, 'r', encoding='utf-8') as f:
    config_content = f.read()

if 'jekyll-paginate' not in config_content:
    if 'plugins:' in config_content:
        config_content = config_content.replace('plugins:', 'plugins:\n  - jekyll-paginate')
    else:
        config_content += '\nplugins:\n  - jekyll-paginate\n'

if 'paginate:' not in config_content:
    config_content += '\npaginate: 6\n'
if 'paginate_path:' not in config_content:
    config_content += 'paginate_path: "/blog/page:num/"\n'

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(config_content)

# 3. Setup blog pagination and file restructuring
if not os.path.exists('blog'):
    os.makedirs('blog')

if os.path.exists('blog.html'):
    os.rename('blog.html', 'blog/index.html')

# 4. Standardize HTML files to use Jekyll layout and strip unneeded tags
files_to_update = ['blog/index.html', 'about.html', 'index.html', 'contact.html']

for f_path in files_to_update:
    if not os.path.exists(f_path):
        continue
        
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step A: Fix the broken backslash escaped links
    # Replaces "\'/page.html\'" with "'/page.html'"
    content = re.sub(r"\\'(/[^']*)\\'", r"'\1'", content)
    # Replaces \'/blog.html\' with \'/blog/\'
    content = content.replace("'/blog.html'", "'/blog/'")
    content = content.replace('href="blog.html"', 'href="{{ \'/blog/\' | relative_url }}"')

    # Step B: Strip the doctype, html, head, and extract body tag to set as body_class
    body_match = re.search(r'<body([^>]*)>', content)
    body_class = ""
    if body_match:
        # Extract class if exists
        class_match = re.search(r'class="([^"]*)"', body_match.group(1))
        if class_match:
            body_class = class_match.group(1)
        
        # Remove everything before the end of the body tag
        content = content[body_match.end():]
        
    # Remove closing body and html tags at the very bottom
    content = re.sub(r'</body>\s*</html>', '', content, flags=re.IGNORECASE)

    # Remove existing frontmatter
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # Step C: Prepend the new correct frontmatter
    title_match = "page"
    if "index" in f_path and "blog" not in f_path: title_match = "Home"
    elif "blog" in f_path: title_match = "Blog"
    elif "about" in f_path: title_match = "About"
    elif "contact" in f_path: title_match = "Contact"

    frontmatter = f"---\nlayout: default\ntitle: {title_match}\n"
    if body_class:
        # ensure body_class is escaped safely
        clean_body_class = body_class.replace('"', '\\"')
        frontmatter += f'body_class: "{clean_body_class}"\n'
    frontmatter += "---\n\n"
    
    content = frontmatter + content
    
    # Step D: Specifically in blog/index.html, manage pagination
    if 'blog/index.html' in f_path:
        # Replace site.posts with paginator.posts
        content = content.replace('site.posts', 'paginator.posts')
        
        # Add Pagination template logic where Next/Prev buttons are
        pager_html = """
<div class="flex justify-center items-center gap-8 mt-16">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}" class="flex items-center gap-3 hover:text-secondary transition-colors group">
      <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span class="text-[10px] font-black uppercase tracking-[0.3em]">Previous</span>
    </a>
  {% else %}
    <div class="flex items-center gap-3 opacity-30 cursor-not-allowed">
      <span class="material-symbols-outlined text-sm">arrow_back</span>
      <span class="text-[10px] font-black uppercase tracking-[0.3em]">Previous</span>
    </div>
  {% endif %}

  <div class="flex items-center gap-2">
    <span class="w-8 h-8 flex items-center justify-center rounded-sm bg-on-surface text-white font-black text-xs">{{ paginator.page }}</span>
    <span class="text-xs text-outline mx-2">of {{ paginator.total_pages }}</span>
  </div>

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}" class="flex items-center gap-3 hover:text-secondary transition-colors group">
      <span class="text-[10px] font-black uppercase tracking-[0.3em]">Next</span>
      <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </a>
  {% else %}
    <div class="flex items-center gap-3 opacity-30 cursor-not-allowed">
      <span class="text-[10px] font-black uppercase tracking-[0.3em]">Next</span>
      <span class="material-symbols-outlined text-sm">arrow_forward</span>
    </div>
  {% endif %}
</div>"""
        
        # We need to replace the old pagination element
        # Old pagination started at `<div class="flex justify-center items-center gap-8 mt-16">` and ended at `</div>` before `</div>\n</main>`
        # This regex replaces the old pagination block
        content = re.sub(
            r'<div class="flex justify-center items-center gap-8 mt-16">.*?</div>\n</div>\n</main>',
            pager_html + '\n</div>\n</main>',
            content,
            flags=re.DOTALL
        )

    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixes applied successfully!")
