// Typed headline
document.addEventListener('DOMContentLoaded',()=>{
  // Create audio context for sound effects first
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  function playSound(freq, duration, type = 'sine') {
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + duration);
    } catch(e) {}
  }

  const el = document.querySelector('[data-typed]');
  if(el){
    const text = el.dataset.text || el.textContent;
    el.textContent = '';
    let i=0;
    const t = setInterval(()=>{ el.textContent += text[i++]||''; if(i>text.length) clearInterval(t); },40);
  }

  // Handle Start the surprise button
  const startBtn = document.getElementById('startBtn');
  if(startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playSound(600, 0.1);
      const startSection = document.getElementById('start');
      if(startSection) {
        startSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        startSection.style.animation = 'none';
        setTimeout(() => {
          startSection.style.animation = 'slideInUp 0.6s ease';
        }, 10);
      }
    });
  }

  // floating hearts
  const heartsWrap = document.createElement('div'); heartsWrap.className='hearts'; document.body.appendChild(heartsWrap);
  setInterval(()=>{ const h=document.createElement('div'); h.className='heart'; h.style.left=Math.random()*100+'%'; h.style.top= (Math.random()*60)+'%'; h.style.opacity=0.8; heartsWrap.appendChild(h); setTimeout(()=>h.remove(),7000); },900);

  // Enhanced confetti on yes
  window.launchConfetti = function(){
    playSound(800, 0.1);
    playSound(1200, 0.2);
    // colorful confetti
    for(let i=0;i<80;i++){
      const c=document.createElement('div'); c.style.position='fixed'; c.style.width='8px'; c.style.height='12px';
      c.style.left=(50+ (Math.random()-0.5)*60)+'%'; c.style.top='40%';
      c.style.background=['#ff6b6b','#ffd166','#6bf0c3','#9ad0ff','#ff69b4','#ffb347'][Math.floor(Math.random()*6)];
      c.style.transform='rotate('+Math.random()*360+'deg)'; c.style.opacity='0.95'; c.style.zIndex=9999;
      document.body.appendChild(c);
      const dx=(Math.random()-0.5)*200; const dy= - (300+Math.random()*400);
      c.animate([{transform:`translate(0,0) rotate(0deg)`, opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(360deg)`, opacity:0}],{duration:1400+Math.random()*800,easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>c.remove(),2200);
    }
    // add extra hearts
    for(let i=0;i<20;i++){
      const h=document.createElement('span'); h.style.position='fixed'; h.style.fontSize='40px'; h.style.zIndex=9998;
      h.textContent='💖'; h.style.left=Math.random()*100+'%'; h.style.top=Math.random()*100+'%';
      document.body.appendChild(h);
      h.animate([{opacity:1, transform:'scale(1) rotateY(0deg)'},{opacity:0, transform:'scale(0.5) rotateY(360deg)'}],{duration:2000});
      setTimeout(()=>h.remove(),2000);
    }
  };

  // lightbox for gallery
  document.querySelectorAll('.grid img').forEach(img=>{
    img.addEventListener('click',()=>{ 
      playSound(600, 0.05);
      const modal=document.createElement('div'); modal.className='modal-back'; modal.innerHTML=`<div class="modal zoom-in"><img src="${img.src}" style="width:100%;border-radius:8px"/><div style="margin-top:8px;text-align:right"><button id="closeLB" class="btn">Close</button></div></div>`; document.body.appendChild(modal); modal.querySelector('#closeLB').onclick=()=>{ playSound(400, 0.05); modal.remove(); }; modal.onclick=(e)=>{ if(e.target===modal) { playSound(400, 0.05); modal.remove(); } };
    });
  });

  // funny terms modal
  const termsBtn = document.getElementById('termsBtn');
  if(termsBtn){
    termsBtn.addEventListener('click',()=>{
      playSound(520, 0.1);
      const m=document.createElement('div'); m.className='modal-back'; m.innerHTML=`<div class="modal fade-in"><h3>Terms of Eternal Love</h3><p class="small">By accepting you agree to: laugh at my jokes, share fries, and tolerate my singing in the shower.</p><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button id="decl" class="btn" style="background:#9aa4b2">Decline</button><button id="acc" class="btn">Accept</button></div></div>`; document.body.appendChild(m);
      m.querySelector('#decl').onclick=()=>{ playSound(300, 0.15); m.querySelector('.modal').innerHTML=`<h3>Oh no</h3><p class="small">You declined. Please reconsider. This is a limited time offer.</p><div style="text-align:right;margin-top:12px"><button class="btn" onclick="location.href='index.html'">Back</button></div>`; };
      m.querySelector('#acc').onclick=()=>{ playSound(800, 0.3); m.remove(); location.href='propose.html'; };
    });
  }

  // yes/no on propose page
  const yesBtn = document.getElementById('yesBtn');
  if(yesBtn) yesBtn.addEventListener('click',()=>{ launchConfetti(); yesBtn.textContent='💖 YES!'; setTimeout(()=>{ alert('She said YES! 🎉 You are the luckiest man alive!'); },900); });

  const noBtn = document.getElementById('noBtn');
  if(noBtn) {
    let noClickCount = 0;
    const noMessages = [
      '😅 Wait...',
      '🥺 Are you sure?',
      '❤️ Please reconsider...',
      '😭 I\'m begging you...',
      '💔 You\'re breaking my heart',
      '😢 Just say YES!'
    ];
    
    noBtn.addEventListener('click',()=>{ 
      noClickCount++;
      playSound(200 + noClickCount * 100, 0.1);
      if(noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
      } else {
        playSound(800, 0.3);
        noBtn.textContent = '💖 YES!';
        noBtn.style.background = 'linear-gradient(135deg, #6bf0c3, #1dd1a1)';
        launchConfetti();
        setTimeout(()=>{ alert('She said YES! Celebrate!'); },900);
      }
    });
    
    // Make the button run away on hover if they keep clicking No
    noBtn.addEventListener('mouseover',()=>{
      if(noClickCount > 1) {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 100;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        noBtn.style.transition = 'transform 0.2s ease';
      }
    });
  }

  // Easter eggs - konami code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if(e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if(konamiIndex === konamiCode.length) {
        playSound(800, 0.2); playSound(1200, 0.2); playSound(1600, 0.2);
        launchConfetti();
        alert('🎉 Secret unlocked! You found the Konami Code! \n\nBut the real Easter egg is the journey you\'re on! 💕');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Easter egg - click hearts for bonus effect
  let heartClicks = 0;
  document.addEventListener('click', (e) => {
    if(e.target.classList && e.target.classList.contains('heart')) {
      heartClicks++;
      playSound(700 + heartClicks * 50, 0.1);
      e.target.style.animation = 'none';
      setTimeout(() => {
        e.target.style.animation = 'floatHeart 7s ease-in-out forwards';
      }, 10);
      
      if(heartClicks === 10) {
        alert('💖 You love hearts as much as I love you!');
        heartClicks = 0;
      }
    }
  });

  // Easter egg - double-click page title
  let titleClicks = 0;
  document.querySelectorAll('.title').forEach(title => {
    title.addEventListener('dblclick', ()=> {
      titleClicks++;
      playSound(523, 0.1);
      title.style.transform = 'rotate(5deg) scale(1.1)';
      setTimeout(() => {
        title.style.transform = 'rotate(0deg) scale(1)';
      }, 200);
      
      if(titleClicks === 3) {
        alert('😄 You\'re having fun! That\'s the spirit!');
        titleClicks = 0;
      }
    });
  });

  // Add music toggle button to propose page
  const proposeContainer = document.querySelector('.container.card.center');
  if(proposeContainer) {
    const musicBtn = document.createElement('button');
    musicBtn.className = 'music-toggle';
    musicBtn.textContent = '🎵';
    musicBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg, #ff69b4, #ff1493);color:white;border:none;cursor:pointer;font-size:24px;z-index:1000;box-shadow:0 4px 12px rgba(255,105,180,0.4);transition:all 0.3s ease;';
    musicBtn.onmouseover = () => musicBtn.style.transform = 'scale(1.1)';
    musicBtn.onmouseout = () => musicBtn.style.transform = 'scale(1)';
    musicBtn.onclick = () => {
      // Play a simple musical sequence
      let notes = [261.63, 293.66, 329.63, 349.23, 391.99];
      notes.forEach((note, i) => {
        setTimeout(() => {
          playSound(note, 0.3);
        }, i * 150);
      });
      musicBtn.textContent = '🎶';
      setTimeout(() => { musicBtn.textContent = '🎵'; }, 1000);
    };
    document.body.appendChild(musicBtn);
  }
});