export default function decorate(fieldDiv, fieldJson) {
  const properties = fieldJson?.properties || {};
  const title = properties.loanTitle || 'Avail XPRESS Personal Loan of';
  const amount = properties.loanAmount || '₹15,00,000';
  const interestRate = properties.interestRate || '9.5% p.a.';
  const processingFee = properties.processingFee || '₹5,000';
  const tenure = properties.tenure || '5 years';
  const noticeText = properties.noticeText || 'Loan subject to eligibility and final approval.';

  const card = document.createElement('article');
  card.className = 'loan-summary-card';
  card.innerHTML = `
    <div class="loan-summary-content">
      <div class="loan-title">${title}</div>
      <div class="loan-amount">${amount}</div>
      <div class="separator"></div>
      <div class="loan-details">
        <div class="loan-detail">
          <div class="loan-detail-label">Interest Rate</div>
          <div class="loan-detail-value">${interestRate}</div>
        </div>
        <div class="loan-detail">
          <div class="loan-detail-label">Processing Fee</div>
          <div class="loan-detail-value">${processingFee}</div>
        </div>
        <div class="loan-detail">
          <div class="loan-detail-label">Tenure</div>
          <div class="loan-detail-value">${tenure}</div>
        </div>
        <div class="loan-detail">
          <div class="loan-detail-label">Taxes</div>
          <div class="loan-detail-value">As applicable</div>
        </div>
      </div>
    </div>
    <div class="loan-notice">${noticeText}</div>
  `;

  fieldDiv.innerHTML = '';
  fieldDiv.append(card);
  return fieldDiv;
}
