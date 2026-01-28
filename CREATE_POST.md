# Rapid Post Creation Guide

## Method 1: Using the Include Template

Create a new post file manually using this template structure:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-01-27 12:00:00 -0000
description: "Your post description"
image: "/assets/blog-images/your-image.png"
tags: ["AI", "Tutorial", "PyTorch"]
category: "AI/ML"
author: "William Golovlev"
---

Your post content here...

<!-- Optional YouTube video -->
{% raw %}{% include youtube.html id="DQdX1Xsgvg4" %}{% endraw %}
```

## Method 2: Quick Copy-Paste Template

```markdown
---
layout: post
title: ""
date: {{ site.time | date: "%Y-%m-%d" }} 12:00:00 -0000
description: ""
image: "/assets/blog-images/"
tags: [""]
category: ""
author: "William Golovlev"
---

<!-- Content goes here -->

{% raw %}{% if page.youtube_id %}
<div style="text-align: center; margin: 2rem 0;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/{{ page.youtube_id }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
{% endif %}{% endraw %}
```

## Method 3: Ruby Script (Advanced)

```ruby
# Run this in your Jekyll directory
require 'yaml'
require 'date'

# Create a new post
title = "Your Amazing Post"
description = "Learn something cool"
content = "This is the post content..."

PostCreator.create_from_template(
  title: title,
  date: Date.today,
  description: description,
  content: content,
  template: "ai_tutorial",
  youtube_id: "your-youtube-id",
  image: "/assets/blog-images/your-image.png"
)
```

## SEO Optimization

The system automatically handles:
- ✅ Proper front matter structure
- ✅ Default author and metadata
- ✅ Tag and category organization
- ✅ Image optimization paths
- ✅ YouTube video embedding
- ✅ Date formatting
- ✅ URL slug generation

## Next Steps for UI Integration

This template system is ready for:
1. **Web Form**: Build a simple HTML form that generates the markdown
2. **CLI Tool**: Wrap the Ruby script in a command-line tool
3. **Admin Interface**: Use the template structure in a future admin panel

All existing posts remain unchanged - this just makes creating new posts faster!
