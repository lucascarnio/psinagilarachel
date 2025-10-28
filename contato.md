
---
layout: default
title: Contato
permalink: /contato/
---

**WhatsApp:** [{{ site.whatsapp_number }}](https://wa.me/{{ site.whatsapp_number | replace: '+', '' }}?text={{ site.whatsapp_text | uri_escape }})  
**E-mail:** [{{ site.email_contato }}](mailto:{{ site.email_contato }})  
**Endereço:** {{ site.consultorio_endereco }}

<iframe src="{{ site.maps_embed }}" width="100%" height="300" style="border:0;" loading="lazy"></iframe>

<!-- Exemplo de formulário (use um serviço como Formspree/Basin/Getform e troque o action) -->
<form method="POST" action="https://formspree.io/f/SEU_ENDPOINT" style="margin-top:16px">
  <label>Nome<br><input type="text" name="nome" required></label><br><br>
  <label>E-mail<br><input type="email" name="email" required></label><br><br>
  <label>Mensagem<br><textarea name="mensagem" rows="5" required></textarea></label><br><br>
  <button class="btn btn--primary" type="submit">Enviar</button>
</form>
