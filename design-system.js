const defaults = Object.freeze({
  brand: '#446dcc', text: '#2d302f', background: '#f5f6f4', surface: '#ffffff',
  fontFamily: 'sans', fontSize: 16, spacing: 16, radius: 8,
});
const fonts = {
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Courier New", Courier, monospace',
};
const bounds = { fontSize: [12, 24], spacing: [4, 32], radius: [0, 24] };
const colors = ['brand', 'text', 'background', 'surface'];
const storageKey = 'design-to-code.tokens.v1';
const form = document.querySelector('#token-form');
const preview = document.querySelector('#component-preview');
const storageNotice = document.querySelector('#storage-notice');
const editStatus = document.querySelector('#edit-status');
const contrastNotice = document.querySelector('#contrast-notice');
let tokens = { ...defaults };
let storageAvailable = true;

function validValue(key, value) {
  if (colors.includes(key)) return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
  if (key === 'fontFamily') return Object.hasOwn(fonts, value);
  if (Object.hasOwn(bounds, key)) {
    return Number.isInteger(value) && value >= bounds[key][0] && value <= bounds[key][1];
  }
  return false;
}

function storageError(message) {
  storageAvailable = false;
  storageNotice.textContent = message;
  storageNotice.classList.add('storage-error');
}

try {
  const saved = localStorage.getItem(storageKey);
  if (saved !== null) {
    let parsed;
    try {
      parsed = JSON.parse(saved);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      storageError('Saved tokens could not be read. Defaults are shown; reset to replace the saved data.');
    }
    if (parsed !== undefined) {
      if (parsed && typeof parsed === 'object' && Object.keys(defaults).every(key => validValue(key, parsed[key]))) {
        tokens = Object.fromEntries(Object.keys(defaults).map(key => [key, parsed[key]]));
        storageNotice.textContent = 'Your saved tokens have been restored from this browser.';
      } else {
        storageError('Saved tokens were invalid. Defaults are shown; reset to replace the saved data.');
      }
    }
  }
} catch (error) {
  if (!(error instanceof DOMException)) throw error;
  storageError('Browser storage is unavailable. Edits work in this session but cannot be saved; export your tokens to keep them.');
}

function luminance(hex) {
  const rgb = hex.match(/[a-f0-9]{2}/gi).map(channel => parseInt(channel, 16) / 255);
  const linear = rgb.map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}

function render() {
  colors.forEach(key => {
    preview.style.setProperty(`--ds-${key}`, tokens[key]);
    document.querySelector(`[data-swatch="${key}"]`).style.background = tokens[key];
  });
  preview.style.setProperty('--ds-font', fonts[tokens.fontFamily]);
  preview.style.setProperty('--ds-size', `${tokens.fontSize}px`);
  preview.style.setProperty('--ds-space', `${tokens.spacing}px`);
  preview.style.setProperty('--ds-radius', `${tokens.radius}px`);
  preview.style.setProperty('--ds-brand-text', contrast(tokens.brand, '#ffffff') >= contrast(tokens.brand, '#000000') ? '#ffffff' : '#000000');
  const ratios = { background: contrast(tokens.text, tokens.background), surface: contrast(tokens.text, tokens.surface) };
  const failing = Object.entries(ratios).filter(([, ratio]) => ratio < 4.5).map(([key]) => key);
  contrastNotice.classList.toggle('contrast-warning', failing.length > 0);
  contrastNotice.textContent = failing.length
    ? `Contrast warning: text on ${failing.join(' and ')} is below WCAG AA's 4.5:1 ratio for normal text. Adjust your colors before handoff.`
    : `Text contrast passes WCAG AA for normal text: ${ratios.background.toFixed(1)}:1 on background, ${ratios.surface.toFixed(1)}:1 on surface.`;
}

function syncControls() {
  form.querySelectorAll('[data-token]').forEach(control => {
    control.value = tokens[control.dataset.token];
    control.removeAttribute('aria-invalid');
  });
  form.querySelectorAll('.field-error').forEach(error => { error.textContent = ''; });
}

function persist() {
  if (!storageAvailable) {
    editStatus.textContent = 'Preview updated. Edits are not saved; export your tokens or reset to retry browser storage.';
    return;
  }
  try {
    localStorage.setItem(storageKey, JSON.stringify(tokens));
    editStatus.textContent = 'Preview updated. Tokens saved in this browser.';
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
    storageError('Tokens could not be saved in browser storage. Export them to keep your edits.');
    editStatus.textContent = 'Preview updated, but edits were not saved.';
  }
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', event => {
  const control = event.target;
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement) || !control.dataset.token) return;
  const key = control.dataset.token;
  const value = Object.hasOwn(bounds, key) ? (control.value.trim() === '' ? NaN : Number(control.value)) : control.value.trim().toLowerCase();
  const error = document.getElementById(`${key}-error`);
  if (!validValue(key, value)) {
    control.setAttribute('aria-invalid', 'true');
    const message = colors.includes(key) ? 'Use a six-digit hex color, e.g. #446dcc.' : `Use a whole number from ${bounds[key][0]} to ${bounds[key][1]}.`;
    if (error) error.textContent = message;
    editStatus.textContent = `${message} The last valid value is still used in the preview.`;
    return;
  }
  control.removeAttribute('aria-invalid');
  if (error) error.textContent = '';
  tokens[key] = value;
  form.querySelectorAll('[data-token]').forEach(other => {
    if (other !== control && other.dataset.token === key) {
      other.value = value;
      other.removeAttribute('aria-invalid');
    }
  });
  render();
  persist();
});

document.querySelector('#reset-tokens').addEventListener('click', () => {
  tokens = { ...defaults };
  storageAvailable = true;
  storageNotice.classList.remove('storage-error');
  storageNotice.textContent = 'Default tokens restored. Your edits stay on this device.';
  syncControls();
  render();
  persist();
});

document.querySelector('#export-tokens').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(tokens, null, 2) + '\n'], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'design-to-code-tokens.json';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  editStatus.textContent = 'Token export requested. The JSON contains your current valid preview values.';
});

document.querySelector('#demo-action').addEventListener('click', () => {
  document.querySelector('#demo-status').textContent = 'Primary action clicked. Your component is working.';
});
document.querySelector('#demo-reset').addEventListener('click', () => {
  document.querySelector('#demo-status').textContent = 'Your component is ready to explore.';
});

syncControls();
render();
