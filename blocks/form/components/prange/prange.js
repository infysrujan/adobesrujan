function formatMoney(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function updateBubble(input, element) {
  const step = Number(input.step) || 1;
  const max = Number(input.max) || 0;
  const min = Number(input.min) || 1;
  const value = Number(input.value) || min;
  const current = Math.ceil((value - min) / step);
  const total = Math.ceil((max - min) / step);
  const bubble = element.querySelector('.range-bubble');
  const bubbleWidth = bubble.getBoundingClientRect().width || 31;
  const left = `${(current / total) * 100}% - ${(current / total) * bubbleWidth}px`;
  bubble.innerText = formatMoney(value);
  const steps = {
    '--total-steps': Math.ceil((max - min) / step),
    '--current-steps': Math.ceil((value - min) / step),
  };
  const style = Object.entries(steps).map(([varName, varValue]) => `${varName}:${varValue}`).join(';');
  bubble.style.left = `calc(${left})`;
  element.setAttribute('style', style);
}

export default async function decorate(fieldDiv, fieldJson) {
  const input = fieldDiv.querySelector('input');
  const properties = fieldJson?.properties || {};
  const minValue = Number(properties.minValue ?? properties.min ?? input.min ?? 50000);
  const maxValue = Number(properties.maxValue ?? properties.max ?? input.max ?? 1500000);
  const defaultValue = Number(properties.defaultValue ?? properties.value ?? input.value ?? minValue);
  const stepValue = Number(properties.stepValue ?? properties.step ?? 5000);

  input.type = 'range';
  input.min = minValue;
  input.max = maxValue;
  input.step = stepValue;
  input.value = defaultValue;

  const div = document.createElement('div');
  div.className = 'range-widget-wrapper decorated';
  input.after(div);

  const hover = document.createElement('span');
  hover.className = 'range-bubble';
  const rangeMinEl = document.createElement('span');
  rangeMinEl.className = 'range-min';
  const rangeMaxEl = document.createElement('span');
  rangeMaxEl.className = 'range-max';

  rangeMinEl.innerText = formatMoney(input.min);
  rangeMaxEl.innerText = formatMoney(input.max);

  div.appendChild(hover);
  div.appendChild(input);
  div.appendChild(rangeMinEl);
  div.appendChild(rangeMaxEl);

  input.addEventListener('input', (e) => {
    updateBubble(e.target, div);
  });

  updateBubble(input, div);
  return fieldDiv;
}
