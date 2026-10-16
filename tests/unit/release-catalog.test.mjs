import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { releases, getReleaseBySlug } from "../../lib/data/releases.ts";

const source = JSON.parse(readFileSync(new URL("../../docs/CATALOG_SOURCE.json", import.meta.url)));

test("new single leads the catalog and retains official Apple Music metadata", () => {
  const release = getReleaseBySlug("dont-call-it-nothing");
  assert.equal(releases[0], release);
  assert.equal(release.title, "Don't Call It Nothing");
  assert.equal(release.appleSongId, "6823479049");
  assert.equal(release.artist, "Fee The Producer");
  assert.equal(release.explicit, true);
  assert.equal(release.releaseDate, "2026-10-15");
  assert.equal(release.links[0].url, "https://music.apple.com/us/album/dont-call-it-nothing/6823479048?i=6823479049");
});

test("catalog retains existing records, unique routes, artwork, and source agreement", () => {
  assert.deepEqual(releases.map(({ slug }) => slug), [
    "dont-call-it-nothing", "the-band-room", "neva-give-up",
    "back-from-venus", "all-gas-no-breaks", "rolling",
  ]);
  assert.equal(new Set(releases.map(({ appleSongId }) => appleSongId)).size, releases.length);
  for (const release of releases) {
    const recorded = source.releases.find(({ slug }) => slug === release.slug);
    for (const [key, value] of Object.entries(release)) assert.deepEqual(recorded[key], value);
    assert.ok(existsSync(new URL(`../../public${release.coverArt}`, import.meta.url)));
  }
});
