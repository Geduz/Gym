describe("app test", () => {
  it("layout.tsx", async () => {
    await new Promise((r) => setTimeout(r, 100));
    expect(true).toBe(true);
  });

  it("page.tsx", async () => {
    await new Promise((r) => setTimeout(r, 80));
    expect(typeof "prop").toBe("string");
  });

  it("providers.tsx", async () => {
    await new Promise((r) => setTimeout(r, 60));
    expect(typeof "prop").toBe("string");
    expect(1 + 1).toBe(2);
  });
});
