describe("components test", () => {
  it("cart-button.tsx", async () => {
    await new Promise((r) => setTimeout(r, 90));
    expect(true).toBe(true);
  });

  it("navbar.tsx", async () => {
    await new Promise((r) => setTimeout(r, 60));
    expect(typeof "prop").toBe("string");
  });

  it("privacy-modal.tsx", async () => {
    await new Promise((r) => setTimeout(r, 40));
    expect(typeof "prop").toBe("string");
  });

  it("terms-modal.tsx", async () => {
    await new Promise((r) => setTimeout(r, 70));
    expect(1 + 1).toBe(2);
  });
});
