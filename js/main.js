document.documentElement.classList.add('js');

// Topo: borda ao rolar + botão flutuante do WhatsApp
const topo = document.querySelector('[data-topo]');
const zap = document.querySelector('.zap');
const hero = document.querySelector('.hero');

const aoRolar = () => {
  const y = window.scrollY;
  topo.classList.toggle('is-rolado', y > 8);
  if (zap && hero) zap.classList.toggle('is-visivel', y > hero.offsetHeight * 0.8);
};
aoRolar();
window.addEventListener('scroll', aoRolar, { passive: true });

// Menu mobile
const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.getElementById('menu');

const fecharMenu = () => {
  menu.classList.remove('is-aberto');
  menuBtn.setAttribute('aria-expanded', 'false');
};

menuBtn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('is-aberto');
  menuBtn.setAttribute('aria-expanded', String(aberto));
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

// Revelação suave ao rolar
const revelaveis = document.querySelectorAll('.revela');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add('is-visto');
        obs.unobserve(ent.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  revelaveis.forEach((el) => obs.observe(el));
} else {
  revelaveis.forEach((el) => el.classList.add('is-visto'));
}

// Mito ou verdade
document.querySelectorAll('[data-mito]').forEach((cartao) => {
  const certa = cartao.dataset.mito;
  const botoes = cartao.querySelectorAll('button[data-resp]');
  const resposta = cartao.querySelector('.mito__resposta');
  const veredito = cartao.querySelector('.mito__veredito');

  botoes.forEach((btn) => {
    btn.addEventListener('click', () => {
      const acertou = btn.dataset.resp === certa;
      botoes.forEach((b) => {
        b.disabled = true;
        b.classList.add(b === btn ? 'is-escolhido' : 'is-apagado');
      });
      veredito.textContent = acertou ? 'Você acertou.' : 'Quase.';
      resposta.hidden = false;
    });
  });
});

// Ano no rodapé
const ano = document.querySelector('[data-ano]');
if (ano) ano.textContent = new Date().getFullYear();
