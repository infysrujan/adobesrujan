export default function decorate(fieldDiv, fieldJson) {
  const properties = fieldJson?.properties || {};
  const title = properties.loanTitle || 'Avail XPRESS Personal Loan of';
  const defaultAmount = properties.loanAmount || '₹15,00,000';
  const interestRate = properties.interestRate || '9.5% p.a.';
  const defaultTenure = properties.tenure || '5 years';
  const noticeText = properties.noticeText || 'Loan subject to eligibility and final approval.';

  const card = document.createElement('article');
  card.className = 'loan-summary-card';

  fieldDiv.style.width = '100%';
  fieldDiv.style.maxWidth = '900px';
  fieldDiv.style.margin = '0 auto';
  fieldDiv.style.display = 'block';
  fieldDiv.style.minHeight = '100%';

  const content = document.createElement('div');
  content.className = 'loan-summary-content';

  const titleEl = document.createElement('div');
  titleEl.className = 'loan-title';
  titleEl.textContent = title;

  const amountLabel = document.createElement('label');
  amountLabel.className = 'loan-amount-label';
  amountLabel.textContent = 'EMI Amount';

  const amountInput = document.createElement('input');
  amountInput.type = 'text';
  amountInput.className = 'loan-amount-input';
  amountInput.value = defaultAmount;
  amountInput.placeholder = 'Enter loan amount';
  amountInput.setAttribute('aria-label', 'EMI Amount');

  const separator = document.createElement('div');
  separator.className = 'separator';

  const details = document.createElement('div');
  details.className = 'loan-details';

  const createDetail = (label, valueText) => {
    const item = document.createElement('div');
    item.className = 'loan-detail';

    const labelEl = document.createElement('div');
    labelEl.className = 'loan-detail-label';
    labelEl.textContent = label;

    const valueEl = document.createElement('div');
    valueEl.className = 'loan-detail-value';
    valueEl.textContent = valueText;

    item.append(labelEl, valueEl);
    return { item, valueEl };
  };

  const rateDetail = createDetail('Interest Rate', interestRate);
  const tenureDetail = createDetail('Tenure', defaultTenure);
  const taxesDetail = createDetail('Taxes', 'As applicable');

  const tenureInput = document.createElement('input');
  tenureInput.type = 'text';
  tenureInput.className = 'loan-tenure-input';
  tenureInput.value = defaultTenure;
  tenureInput.placeholder = 'Enter tenure';
  tenureInput.setAttribute('aria-label', 'Tenure');

  tenureDetail.valueEl.innerHTML = '';
  tenureDetail.valueEl.append(tenureInput);

  const notice = document.createElement('div');
  notice.className = 'loan-notice';
  notice.textContent = noticeText;

  amountInput.addEventListener('input', () => {
    if (amountInput.value) {
      titleEl.textContent = title;
    }
  });

  const amountDisplay = document.createElement('div');
  amountDisplay.className = 'loan-amount';
  amountDisplay.textContent = defaultAmount;

  amountInput.addEventListener('input', () => {
    amountDisplay.textContent = amountInput.value || '₹0';
  });

  details.append(
    rateDetail.item,
    tenureDetail.item,
    taxesDetail.item,
  );

  content.append(titleEl, amountDisplay, amountLabel, amountInput, separator, details);
  card.append(content, notice);
  fieldDiv.innerHTML = '';
  fieldDiv.append(card);
  return fieldDiv;
}
