
---
layout: default
title: Serviços
permalink: /servicos/
---

Selecione um serviço para saber mais:
<ul>
{% for s in site.servicos %}
  <li><a href="{{ s.url | relative_url }}">{{ s.title }}</a> — {{ s.resumo }}</li>
{% endfor %}
</ul>
