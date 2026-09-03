/* eslint-env mocha */
import assert from 'assert';
import decorateLoanSummaryCard from '../../blocks/form/components/loan-summary-card/loan-summary-card.js';
import decoratePRange from '../../blocks/form/components/prange/prange.js';

describe('Loan summary card and PRange fixes', () => {
  it('renders the loan amount field as a read-only inline row with the requested notice copy', () => {
    const fieldDiv = document.createElement('div');
    decorateLoanSummaryCard(fieldDiv, { properties: {} });

    const amountRow = fieldDiv.querySelector('.loan-amount-row');
    const amountLabel = fieldDiv.querySelector('.loan-amount-label');
    const amountInput = fieldDiv.querySelector('.loan-amount-input');
    const notice = fieldDiv.querySelector('.loan-notice');

    assert.ok(amountRow, 'loan amount row should exist');
    assert.strictEqual(amountLabel.textContent, 'Loan Amount (INR)', 'loan amount label should match the latest copy');
    assert.strictEqual(amountInput.readOnly, true, 'loan amount field should be read-only');
    assert.strictEqual(
      notice.textContent,
      'The principal offer is subject to credit review, basis which the loan amount may be down-sized or rejected.',
      'notice text should match the requested copy',
    );
  });

  it('wraps the read-only range value in a dedicated row above the slider', () => {
    const fieldDiv = document.createElement('div');
    const input = document.createElement('input');
    input.min = '10000';
    input.max = '1500000';
    input.value = '500000';
    fieldDiv.appendChild(input);

    decoratePRange(fieldDiv, { properties: {} });

    const rangeRow = fieldDiv.querySelector('.range-value-row');
    const valueField = fieldDiv.querySelector('.range-value-field');

    assert.ok(rangeRow, 'range value row should exist');
    assert.ok(rangeRow.contains(valueField), 'value field should be contained in the value row');
    assert.strictEqual(valueField.readOnly, true, 'range value field should stay read-only');
  });
});
