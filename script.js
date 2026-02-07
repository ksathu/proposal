// Typed headline
document.addEventListener('DOMContentLoaded',()=>{
  const el = document.querySelector('[data-typed]');
  if(el){
    const text = el.dataset.text || el.textContent;
    el.textContent = '';
    let i=0;
    const t = setInterval(()=>{ el.textContent += text[i++]||''; if(i>text.length) clearInterval(t); },40);
  }

  // floating hearts
  const heartsWrap = document.createElement('div'); heartsWrap.className='hearts'; document.body.appendChild(heartsWrap);
  setInterval(()=>{ const h=document.createElement('div'); h.className='heart'; h.style.left=Math.random()*100+'%'; h.style.top= (Math.random()*60)+'%'; h.style.opacity=0.8; heartsWrap.appendChild(h); setTimeout(()=>h.remove(),7000); },900);

  // confetti on yes
  window.launchConfetti = function(){
    // simple confetti using small colored divs
    for(let i=0;i<60;i++){
      const c=document.createElement('div'); c.style.position='fixed'; c.style.width='8px'; c.style.height='12px';
      c.style.left=(50+ (Math.random()-0.5)*60)+'%'; c.style.top='40%';
      c.style.background=['#ff6b6b','#ffd166','#6bf0c3','#9ad0ff'][Math.floor(Math.random()*4)];
      c.style.transform='rotate('+Math.random()*360+'deg)'; c.style.opacity='0.95'; c.style.zIndex=9999;
      document.body.appendChild(c);
      const dx=(Math.random()-0.5)*120; const dy= - (200+Math.random()*300);
      c.animate([{transform:`translate(0,0) rotate(0deg)`, opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(360deg)`, opacity:0}],{duration:1400+Math.random()*800,easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>c.remove(),2200);
    }
  };

  // lightbox for gallery
  document.querySelectorAll('.grid img').forEach(img=>{
    img.addEventListener('click',()=>{ const modal=document.createElement('div'); modal.className='modal-back'; modal.innerHTML=`<div class="modal"><img src="${img.src}" style="width:100%;border-radius:8px"/><div style="margin-top:8px;text-align:right"><button id="closeLB" class="btn">Close</button></div></div>`; document.body.appendChild(modal); modal.querySelector('#closeLB').onclick=()=>modal.remove(); modal.onclick=(e)=>{ if(e.target===modal) modal.remove(); };
    });
  });

  // funny terms modal
  const termsBtn = document.getElementById('termsBtn');
  if(termsBtn){
    termsBtn.addEventListener('click',()=>{
      const m=document.createElement('div'); m.className='modal-back'; m.innerHTML=`<div class="modal fade-in"><h3>Terms of Eternal Love</h3><p class="small">By accepting you agree to: laugh at my jokes, share fries, and tolerate my singing in the shower.</p><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button id="decl" class="btn" style="background:#9aa4b2">Decline</button><button id="acc" class="btn">Accept</button></div></div>`; document.body.appendChild(m);
      m.querySelector('#decl').onclick=()=>{ m.querySelector('.modal').innerHTML=`<h3>Oh no</h3><p class="small">You declined. Please reconsider. This is a limited time offer.</p><div style="text-align:right;margin-top:12px"><button class="btn" onclick="location.href='index.html'">Back</button></div>`; };
      m.querySelector('#acc').onclick=()=>{ m.remove(); location.href='propose.html'; };
    });
  }

  // yes/no on propose page
  const yesBtn = document.getElementById('yesBtn');
  if(yesBtn) yesBtn.addEventListener('click',()=>{ launchConfetti(); yesBtn.textContent='💖 YES!'; setTimeout(()=>{ alert('She said YES! Celebrate!'); },900); });

  const noBtn = document.getElementById('noBtn');
  if(noBtn) noBtn.addEventListener('click',()=>{ noBtn.textContent='😅 Wait...'; setTimeout(()=>{ alert('Plot twist: it was a prank. Try again with flowers.'); },700); });
});