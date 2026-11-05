// Site: troca de cor do fundo por seção, bolso do envelope, lacre no carrossel e mapa sob demanda.
(function(){
  var root=document.documentElement, papeis=[].slice.call(document.querySelectorAll('[data-papel]')), atual=null, pedido=false;
  function aplicar(){
    pedido=false;
    var linha=innerHeight*0.6, escolhido=papeis[0];
    for(var i=0;i<papeis.length;i++){ if(papeis[i].getBoundingClientRect().top<linha) escolhido=papeis[i]; }
    if(escolhido===atual) return;
    atual=escolhido;
    var c=escolhido.getAttribute('data-papel').split(' ');
    root.style.setProperty('--c1',c[0]); root.style.setProperty('--c2',c[1]||c[0]);
  }
  addEventListener('scroll',function(){ if(!pedido){ pedido=true; requestAnimationFrame(aplicar); } },{passive:true});
  addEventListener('resize',aplicar); aplicar();

  // bolso do envelope: fica sobre a borda de baixo do convite
  var conv=document.querySelector('.envelope .convite'), bolso=document.querySelector('.bolso');
  function posBolso(){ bolso.style.setProperty('--bolso-top',(conv.offsetTop+conv.offsetHeight-44)+'px'); }
  if(conv&&bolso){ posBolso(); if('ResizeObserver' in window) new ResizeObserver(posBolso).observe(conv); addEventListener('load',posBolso); }

  // no celular, o modelo em foco no carrossel ganha o lacre
  var grade=document.querySelector('.grid');
  if(grade&&'IntersectionObserver' in window&&matchMedia('(max-width:899px)').matches){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ e.target.classList.toggle('em-foco',e.intersectionRatio>0.7); }); },{root:grade,threshold:[0,0.7,1]});
    [].forEach.call(grade.querySelectorAll('.card'),function(c){ io.observe(c); });
  }

  // mapa do Google: só carrega quando a pessoa pede (LGPD: nada vai ao Google antes disso)
  var ver=document.getElementById('ver-mapa');
  if(ver){ ver.addEventListener('click',function(){
    var capa=document.getElementById('mapa'), f=document.createElement('iframe');
    f.title='Mapa da loja'; f.loading='lazy'; f.referrerPolicy='strict-origin-when-cross-origin';
    f.src='https://www.google.com/maps?q=Rua+Maria+Bigueti+Lim%C3%A3o,+2-168,+Nova+Bauru,+Bauru,+SP&output=embed';
    capa.replaceWith(f);
  }); }
})();
