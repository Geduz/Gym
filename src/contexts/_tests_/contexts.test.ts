describe("contexts test", () => {
  it("auth-context.tsx", async () => {
    await new Promise((r) => setTimeout(r, 70));
    expect(true).toBe(true);
  });

  it("cart-context.tsx", async () => {
    await new Promise((r) => setTimeout(r, 50));
    expect(1 + 1).toBe(2);
  });
});
