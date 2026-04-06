import os
import re

files_to_fix = ['blog.html', 'about.html', 'index.html', 'contact.html']

for f_path in files_to_fix:
    if not os.path.exists(f_path): continue
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If doesn't have frontmatter, add it so Liquid runs on it
    if not content.startswith('---'):
        content = "---\nlayout: null\n---\n" + content

    # Fix links
    content = re.sub(r'href="index\.html"', r'href="{{ \'/\' | relative_url }}"', content)
    content = re.sub(r'href="blog\.html"', r'href="{{ \'/blog.html\' | relative_url }}"', content)
    content = re.sub(r'href="about\.html"', r'href="{{ \'/about.html\' | relative_url }}"', content)
    content = re.sub(r'href="contact\.html"', r'href="{{ \'/contact.html\' | relative_url }}"', content)

    # In about.html, remove the JS `#resume` logic
    if 'about.html' in f_path:
        content = re.sub(
            r"<script>\s*// Prevent auto-scroll to resume section\s*window\.addEventListener\('load', function\(\) {.*?}\);\s*</script>",
            "",
            content,
            flags=re.DOTALL
        )

    # In blog.html, inject the Jekyll loop for posts
    if 'blog.html' in f_path:
        # We find <div id="posts-grid" class="..."> and the corresponding </div>
        # and replace everything inside it.
        grid_start_idx = content.find('<div id="posts-grid"')
        if grid_start_idx != -1:
            end_div_idx = content.find('<!-- Pagination -->')
            if end_div_idx != -1:
                # We want to replace between grid_start_idx and end_div_idx
                # Wait, the </div> before <!-- Pagination --> closes posts-grid.
                # So we replace from the start of <div id="posts-grid"...> up to the end of the </div> just before Pagination.
                
                # The replacement content:
                liquid_loop = """<div id="posts-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
  {% for post in site.posts %}
  <article class="liquid-glass rounded-xl overflow-hidden transition-all duration-500 hover:translate-y-[-4px] hover:shadow-2xl border border-white/40 group cursor-pointer post-item" onclick="window.location.href='{{ post.url | relative_url }}'" data-title="{{ post.title | escape | downcase }}" data-description="{{ post.description | escape | downcase }}" data-date="{{ post.date | date: '%m/%d/%y' }}" data-tags="{% for tag in post.tags %}{{ tag }}{% unless forloop.last %},{% endunless %}{% endfor %}" data-category="{{ post.category | default: 'AI/ML' | escape | downcase }}">
    <div class="h-[200px] w-full relative overflow-hidden">
      {% assign image_url = post.image | default: '/assets/blog-images/21.png' %}
      <img class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="{{ post.title | escape }}" src="{{ image_url | relative_url }}"/>
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 bg-black text-white text-[9px] font-bold tracking-[0.2em] uppercase">{{ post.category | default: 'Article' }}</span>
      </div>
    </div>
    <div class="p-8 bg-white">
      <div class="flex items-center gap-4 text-[9px] font-black text-secondary mb-4 uppercase tracking-[0.2em]">
        <span>{{ post.date | date: "%B %Y" }}</span>
        <span class="h-1 w-1 bg-outline-variant rounded-full"></span>
        <span>
          {% assign words = post.content | number_of_words %}
          {% assign readtime = words | divided_by: 200 | ceil %}
          {% if readtime == 0 %}{% assign readtime = 1 %}{% endif %}
          {{ readtime }} min read
        </span>
      </div>
      <h3 class="text-2xl font-headline font-extrabold mb-4 tracking-tight leading-[1.2] group-hover:text-secondary transition-colors">
        {{ post.title }}
      </h3>
      <p class="text-on-surface-variant leading-relaxed text-sm font-light mb-6 line-clamp-3">
        {{ post.description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        {% for tag in post.tags limit:3 %}
        <span class="px-2 py-1 bg-surface-container-low text-[8px] font-medium text-on-surface-variant rounded-md uppercase tracking-[0.1em]">{{ tag }}</span>
        {% endfor %}
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-on-surface/10">
        <span class="text-[9px] uppercase tracking-[0.2em] font-black text-outline">{{ post.category | default: 'AI/ML' }}</span>
        <div class="flex items-center gap-2">
          <span class="text-[8px] text-on-surface-variant">{{ post.author | default: 'William Golovlev' }}</span>
          <span class="material-symbols-outlined text-outline text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </div>
    </div>
  </article>
  {% endfor %}
</div>
"""
                prefix = content[:grid_start_idx]
                suffix = content[end_div_idx:]
                content = prefix + liquid_loop + suffix

    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done refactoring UI html files!")
