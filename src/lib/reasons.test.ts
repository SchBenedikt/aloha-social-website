import {
  BOILERPLATE,
  HEADLINE_FIGURES,
  PROOF_POINTS,
  REASON_COUNT,
  REASON_GROUPS,
} from "@/lib/reasons";

describe("Release key points", () => {
  it("contains exactly 30 reasons in 8 groups", () => {
    expect(REASON_GROUPS).toHaveLength(8);
    expect(REASON_COUNT).toBe(30);
  });

  it("numbers every reason from 1 to 30 exactly once", () => {
    const numbers = REASON_GROUPS.flatMap((group) =>
      group.reasons.map((reason) => reason.number),
    );
    expect(numbers).toEqual(Array.from({ length: 30 }, (_, index) => index + 1));
  });

  it("gives every reason a title", () => {
    for (const group of REASON_GROUPS) {
      expect(group.id).toBeTruthy();
      expect(group.title).toBeTruthy();
      expect(group.reasons.length).toBeGreaterThan(0);
      for (const reason of group.reasons) {
        expect(reason.title.length).toBeGreaterThan(0);
        expect(reason.body ?? reason.bullets).toBeTruthy();
      }
    }
  });

  it("keeps the press boilerplate", () => {
    expect(BOILERPLATE.intro).toContain("Aloha");
    expect(BOILERPLATE.bullets.length).toBeGreaterThanOrEqual(7);
  });

  it("publishes the proof points", () => {
    expect(PROOF_POINTS.length).toBeGreaterThanOrEqual(8);
    expect(PROOF_POINTS.some((point) => point.value.includes("AGPL"))).toBe(true);
    expect(PROOF_POINTS.some((point) => point.value.includes("Aloha 34"))).toBe(true);
    expect(HEADLINE_FIGURES).toHaveLength(4);
  });
});
