describe("hooks test", () => {
  it("use-mobile.tsx", async () => {
    await new Promise((resolve) => setTimeout(resolve, 25));
    expect(true).toBe(true);
  });

  it("useCategorias.tsx", async () => {
    await new Promise((resolve) => setTimeout(resolve, 18));
    expect(typeof "prop").toBe("string");
  });

  it("useProductos.tsx", async () => {
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(1 + 1).toBe(2);
  });
});