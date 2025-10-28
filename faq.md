
---
layout: default
title: FAQ
permalink: /faq/
---

{% for item in site.faq %}
### {{ item.pergunta }}
{{ item.resposta | markdownify }}
{% endfor %}
