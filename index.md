---
layout: default
title: My Personal Blog
---

# Welcome to my blog!

Hello there, I'm William. I'm a passionate junior developer exploring new technologies and building cool projects. This is my personal space to share what I'm learning and working on.

## Latest Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}