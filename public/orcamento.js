// Orçamento: monta a mensagem do WhatsApp com pedido, tamanhos, ocasião e modelo.
// Usado no site (index.html) e na página do Instagram (links.html). A origem vem de data-origem no form.
(function(){
  var f=document.getElementById('form-pedido');
  if(!f) return;
  var origem=f.getAttribute('data-origem')||'site';
  var sol=document.getElementById('campo-solitario'), previa=document.getElementById('previa'), env=document.getElementById('enviar'), aviso=document.getElementById('aviso'), btn=env.querySelector('a');
  function v(n){ var e=f.elements[n]; return e ? (e.value||'') : ''; }
  function aro(x){ return x==='nao-sei' ? 'não sei, preciso de ajuda para medir' : 'aro '+x; }
  function montar(){
    var tipo=v('tipo'), comSol=tipo==='par-solitario', t1=v('aro1'), t2=v('aro2'), t3=v('aro3'), oc=v('ocasiao'), mod=v('modelo'), quando=v('quando').trim();
    sol.hidden=!comSol;
    var pronto=!!(tipo && t1 && t2 && (!comSol || t3));
    var l=['Oi! Vim pelo '+origem+' e quero um orçamento.'];
    if(tipo) l.push('• Pedido: '+(comSol?'par de alianças + solitário':'par de alianças'));
    if(mod) l.push('• Modelo: '+mod);
    var o=[]; if(oc) o.push(oc); if(quando) o.push('para '+quando); if(o.length) l.push('• Ocasião: '+o.join(', '));
    var t=[]; if(t1) t.push('aliança 1: '+aro(t1)); if(t2) t.push('aliança 2: '+aro(t2)); if(comSol&&t3) t.push('solitário: '+aro(t3));
    if(t.length) l.push('• Tamanhos: '+t.join('; '));
    l.push('Pode me passar valores e prazo?');
    var msg=l.join('\n');
    previa.textContent=(tipo||t1||t2||oc||mod||quando) ? msg : 'Escolha as opções acima e a mensagem aparece aqui.';
    btn.href='https://wa.me/5514997393836?text='+encodeURIComponent(msg);
    env.hidden=!pronto; aviso.hidden=pronto;
  }
  f.addEventListener('change',montar); f.addEventListener('input',montar);
  f.addEventListener('submit',function(e){ e.preventDefault(); if(!env.hidden) btn.click(); });
  // botões dos modelos: levam ao orçamento com o modelo já escolhido
  [].forEach.call(document.querySelectorAll('[data-modelo]'),function(a){
    a.addEventListener('click',function(){
      var sel=f.elements['modelo']; sel.value=a.getAttribute('data-modelo'); montar();
      sel.classList.remove('marcado'); void sel.offsetWidth; sel.classList.add('marcado');
    });
  });
  montar();
})();
