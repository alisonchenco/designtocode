function openLinkedGuide(hash = location.hash) {
  const guide = document.getElementById(hash.slice(1));
  if (guide instanceof HTMLDetailsElement) {
    guide.open = true;
  }
}

document.addEventListener('click', (event) => {
  if (event.target instanceof Element) {
    const link = event.target.closest('a[href^="#"]');
    if (link) openLinkedGuide(link.hash);
  }
});
window.addEventListener('hashchange', () => openLinkedGuide());
openLinkedGuide();

const handoffPosters = document.querySelectorAll('.handoff-poster');
const handoffMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const handoffHover = window.matchMedia('(hover: hover)');
const viewedHandoffPosters = new WeakSet();
let handoffObserver;

function observeHandoffPosters() {
  handoffObserver?.disconnect();
  handoffPosters.forEach(poster => poster.classList.remove('is-entering'));
  if (handoffMotion.matches || !('IntersectionObserver' in window)) return;

  handoffObserver = new IntersectionObserver(entries => {
    if (handoffMotion.matches) return;
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < .25) return;
      const poster = entry.target;
      viewedHandoffPosters.add(poster);
      handoffObserver.unobserve(poster);
      if (!poster.matches(':focus-visible') && !(handoffHover.matches && poster.matches(':hover'))) {
        poster.classList.add('is-entering');
      }
    });
  }, { threshold: .25 });
  handoffPosters.forEach(poster => {
    if (!viewedHandoffPosters.has(poster)) handoffObserver.observe(poster);
  });
}

handoffPosters.forEach(poster => {
  const finishEntry = () => poster.classList.remove('is-entering');
  poster.addEventListener('animationend', finishEntry);
  poster.addEventListener('animationcancel', finishEntry);
});
handoffMotion.addEventListener('change', observeHandoffPosters);
observeHandoffPosters();

const copyRulesButton = document.querySelector('#copy-ai-rules');
const copyRulesStatus = document.querySelector('#copy-ai-rules-status');

copyRulesButton.addEventListener('click', async () => {
  copyRulesButton.disabled = true;
  copyRulesStatus.dataset.state = 'pending';
  copyRulesStatus.textContent = 'Copying rules...';
  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error('Clipboard access is unavailable.');
    }
    await navigator.clipboard.writeText(document.querySelector('#ai-rules').textContent);
    copyRulesStatus.dataset.state = 'success';
    copyRulesStatus.textContent = 'Rules copied.';
  } catch {
    copyRulesStatus.dataset.state = 'error';
    copyRulesStatus.textContent = 'Could not copy the rules. Select the code and copy it manually.';
  } finally {
    copyRulesButton.disabled = false;
  }
});
