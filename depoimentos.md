
---
layout: default
title: Depoimentos
permalink: /depoimentos/
---

{% if site.depoimentos.size == 0 %}
*Sem depoimentos publicados ainda.*
{% else %}
<table>
  <thead><tr><th>Nome (iniciais)</th><th>Relato</th></tr></thead>
  <tbody>
  {% for d in site.depoimentos %}
    <tr><td>{{ d.nome }}</td><td>{{ d.content | markdownify }}</td></tr>
  {% endfor %}
  </tbody>
</table>
{% endif %}

> Para reputação, considere linkar avaliações no Google.
