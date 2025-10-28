
---
layout: default
title: Início
---

<section class="hero">
  <h1>Psicoterapia com acolhimento e evidências</h1>
  <p>Atendimento online e presencial. Sigilo, empatia e cuidado.</p>
  <p>
    <a class="btn btn--primary" href="https://wa.me/{{ site.whatsapp_number | replace: '+', '' }}?text={{ site.whatsapp_text | uri_escape }}" target="_blank">Agendar sessão</a>
    <a class="btn" href="{{ '/como-funciona/' | relative_url }}">Como funciona</a>
  </p>
</section>

<section class="section">
  <h2>Áreas de atuação</h2>
  <div class="grid grid--3">
    {% for s in site.servicos %}
    <article class="card">
      <h3><a href="{{ s.url | relative_url }}">{{ s.title }}</a></h3>
      <p>{{ s.resumo }}</p>
      <p><a class="btn" href="https://wa.me/{{ site.whatsapp_number | replace: '+', '' }}?text={{ site.whatsapp_text | uri_escape }}">Falar agora</a></p>
    </article>
    {% endfor %}
  </div>
</section>

<section class="section">
  <h2>Sinais de alerta</h2>
  <p>Reconhecer quando buscar ajuda é um passo de coragem. Confira sinais comuns.</p>
  <p><a class="btn" href="{{ '/sinais-de-alerta/' | relative_url }}">Ver sinais de alerta</a></p>
</section>

<section class="section">
  <h2>Depoimentos</h2>
  <blockquote>
    “Conteúdo de exemplo de depoimento (adicione os reais em /_depoimentos).”
  </blockquote>
  <p><a class="btn" href="{{ '/depoimentos/' | relative_url }}">Ler mais depoimentos</a></p>
</section>
