---
layout: post
title: "{{ include.title | escape }}"
date: "{{ include.date }} 12:00:00 -0000"
description: "{{ include.description | escape }}"
{% if include.image %}image: "{{ include.image }}"{% endif %}
{% if include.tags %}tags: [{% for tag in include.tags %}"{{ tag | escape }}"{% unless forloop.last %}, {% endunless %}{% endfor %}]{% endif %}
{% if include.category %}category: "{{ include.category | escape }}"{% endif %}
{% if include.author %}author: "{{ include.author | escape }}"{% endif %}
{% if include.published != false %}published: true{% endif %}
---

{{ include.content | strip }}

{% if include.youtube_id %}
<div style="text-align: center; margin: 2rem 0;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/{{ include.youtube_id }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
{% endif %}

{% if include.additional_content %}
{{ include.additional_content | strip }}
{% endif %}
