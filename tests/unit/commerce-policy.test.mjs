import assert from 'node:assert/strict';
import test from 'node:test';
import { checkoutQuantity, checkoutRequestKey, checkoutStatus } from '../../lib/integrations/commerce-policy.ts';

test('quantity rejects coercion, decimals, null, and values outside the contract', () => {
  for (const value of ['1', '2abc', 1.5, null, true, {}, 0, 100]) assert.equal(checkoutQuantity(value), null);
  assert.equal(checkoutQuantity(undefined), 1);
  assert.equal(checkoutQuantity(99), 99);
});
test('completed but unpaid checkout does not grant access', () => {
  assert.equal(checkoutStatus({paymentStatus:'unpaid',sessionStatus:'complete',eventType:'checkout.session.completed',fullyRefunded:false}), 'pending');
});
test('delayed success grants access; delayed failure does not', () => {
  assert.equal(checkoutStatus({paymentStatus:'paid',sessionStatus:'complete',eventType:'checkout.session.async_payment_succeeded',fullyRefunded:false}), 'paid');
  assert.equal(checkoutStatus({paymentStatus:'unpaid',sessionStatus:'complete',eventType:'checkout.session.async_payment_failed',fullyRefunded:false}), 'failed');
});
test('full refund takes precedence over late success', () => {
  assert.equal(checkoutStatus({paymentStatus:'paid',sessionStatus:'complete',eventType:'checkout.session.completed',fullyRefunded:true}), 'refunded');
});
test('idempotency keys are bounded opaque identifiers', () => {
  assert.equal(checkoutRequestKey('request_1234'), 'request_1234');
  for (const value of [null, '', 'short', 'contains a space', 'a'.repeat(129)]) assert.equal(checkoutRequestKey(value), null);
});
