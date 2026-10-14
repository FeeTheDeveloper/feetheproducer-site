import assert from "node:assert/strict";
import { test } from "node:test";
import { usdCents, retailForMargin, merchQuantity, validCheckoutKey } from "../../lib/merch-policy.ts";

test("30 percent gross margin rounds up without becoming a 30 percent markup", () => {
  for (const [cost, retail] of [[1682, 2403], [3871, 5530], [4071, 5816], [2018, 2883], [3191, 4559], [6065, 8665]]) {
    assert.equal(retailForMargin(cost), retail);
    assert.ok((retail - cost) / retail >= .30 - Number.EPSILON);
  }
  for (const cost of [0, -1, NaN, Infinity, 1.25]) assert.throws(() => retailForMargin(cost));
});
test("provider prices and checkout inputs reject malformed values", () => {
  assert.equal(usdCents("24.03"), 2403);
  assert.equal(usdCents("5.9"), 590);
  for (const price of [24.03, "-1", "NaN", "2e3", "2.003", " 24", null]) assert.equal(usdCents(price), null);
  for (const value of ["0", "6", "1.5", "1e0", 1, null]) assert.equal(merchQuantity(value), null);
  assert.equal(merchQuantity("5"), 5);
  assert.ok(validCheckoutKey("7251d3e1-d8e9-4dd9-af46-c20a3dd99eb4"));
  assert.equal(validCheckoutKey("any-key"), false);
});
