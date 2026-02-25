import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Entrar" }).click();
  await expect(page).toHaveURL("http://localhost:5173/login");

  await page.getByLabel("E-mail").fill("willianpereira22@gmail.com");
  await page.getByLabel("Senha").fill("96873279");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL("http://localhost:5173/");
});

// test("create account", async ({ page }) => {
//   await page.goto("http://localhost:5173/");

//   const btnCreateAccount = page.getByRole("link", { name: "Criar conta" });
//   await btnCreateAccount.click();

//   await expect(page).toHaveURL("http://localhost:5173/criar-conta");

//   await page.getByLabel("Nome", { exact: true }).fill("Willian");
//   await page.getByLabel("Sobrenome", { exact: true }).fill("pereira");
//   await page
//     .getByLabel("E-mail", { exact: true })
//     .fill(`willianpereira222@gmail.com`);
//   await page.getByLabel("Senha", { exact: true }).fill("96873279");
//   await page.getByLabel("Confirmar Senha", { exact: true }).fill("96873279");
//   await page.locator("#terms").click();

//   await page.getByRole("button", { name: "Criar conta" }).click();
//   await expect(page.getByText("Design que transforma seu espaço")).toBeVisible({
//     timeout: 15000,
//   });
// });

// test("filtered products by men", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   page.getByRole("link", { name: "Explorar Coleção" }).click();
//   await expect(page).toHaveURL("http://localhost:5173/produtos");
//   await page.getByLabel("Masculino").check();
//   page.getByRole("button", { name: "Aplicar Filtros" }).click();
//   await expect(page).toHaveURL(/categories=men%27s\+clothing/);
//   await expect(
//     page.getByText("Mens Casual Premium Slim Fit T-Shirts")
//   ).toBeVisible();
// });

// test("filtered products by jewelery", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   page.getByRole("link", { name: "Explorar Coleção" }).click();
//   await expect(page).toHaveURL("http://localhost:5173/produtos");
//   await page.getByLabel("Joias").check();
//   page.getByRole("button", { name: "Aplicar Filtros" }).click();
//   await expect(page).toHaveURL(/categories=jewelery/);
//   await expect(page.getByText("Solid Gold Petite Micropave")).toBeVisible();
// });

// test("filtered products by electronics", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   page.getByRole("link", { name: "Explorar Coleção" }).click();
//   await expect(page).toHaveURL("http://localhost:5173/produtos");
//   await page.getByLabel("Eletronicos").check();
//   page.getByRole("button", { name: "Aplicar Filtros" }).click();
//   await expect(page).toHaveURL(/categories=electronics/);
//   await expect(
//     page.getByText(
//       "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin"
//     )
//   ).toBeVisible();
// });

// test("filtered products by women", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   page.getByRole("link", { name: "Explorar Coleção" }).click();
//   await expect(page).toHaveURL("http://localhost:5173/produtos");
//   await page.getByLabel("Feminina").check();
//   page.getByRole("button", { name: "Aplicar Filtros" }).click();
//   await expect(page).toHaveURL(/categories=women%27s\+clothing/);
//   await expect(
//     page.getByText("BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats")
//   ).toBeVisible();
// });

// test("add product to cart", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page
//     .getByRole("button", { name: "Adicionar ao Carrinho" })
//     .first()
//     .click();
//   await expect(page.getByText("Produto adicionado à sacola")).toBeVisible();
// });

// test("get details product", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page
//     .getByRole("link", {
//       name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     })
//     .click();

//   await expect(page).toHaveTitle(
//     "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
//   );

//   await expect(page.getByText("R$ 109,95")).toBeVisible();
//   await expect(
//     page.getByText(
//       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
//     )
//   ).toBeVisible();
// });

// test("view product details and increment quantity and click add to cart", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:5173/");
//   await page
//     .getByRole("link", {
//       name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     })
//     .click();

//   await expect(page).toHaveTitle(
//     "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
//   );

//   await page.getByTestId("increment-1").click();
//   await expect(page.getByTestId("quantity-value").getByText("2")).toBeVisible();
//   await page
//     .getByRole("button", { name: "Adicionar ao Carrinho" })
//     .first()
//     .click();
//   await expect(page.getByText("Produto adicionado à sacola")).toBeVisible();
// });

// test("checkout increment quantity product", async ({ page }) => {
//   page.goto("http://localhost:5173/");
//   await page
//     .getByRole("button", { name: "Adicionar ao Carrinho" })
//     .first()
//     .click();
//   await expect(page.getByText("Produto adicionado à sacola")).toBeVisible();

//   await page.getByTestId("checkout").click();
//   await expect(page).toHaveURL(/checkout/);

//   await page.getByTestId("increment-product-1").click();
//   await expect(
//     page.getByTestId("quantity-value-checkout").getByText("2")
//   ).toBeVisible();
// });

// test("checkout decrement quantity product", async ({ page }) => {
//   page.goto("http://localhost:5173/");
//   await page
//     .getByRole("button", { name: "Adicionar ao Carrinho" })
//     .first()
//     .click();
//   await expect(page.getByText("Produto adicionado à sacola")).toBeVisible();

//   await page.getByTestId("checkout").click();
//   await expect(page).toHaveURL(/checkout/);

//   await page.getByTestId("increment-product-1").click();
//   await page.getByTestId("decrement-product-1").click();

//   await expect(
//     page.getByTestId("quantity-value-checkout").getByText("1")
//   ).toBeVisible();
// });

// test("delete product in checkout", async ({ page }) => {
//   page.goto("http://localhost:5173/");
//   await page
//     .getByRole("button", { name: "Adicionar ao Carrinho" })
//     .first()
//     .click();
//   await expect(page.getByText("Produto adicionado à sacola")).toBeVisible();

//   await page.getByTestId("checkout").click();
//   await expect(page).toHaveURL(/checkout/);

//   await page.getByTestId("remove-product-1").click();
//   await expect(page.getByText("Seu carrinho está vazio")).toBeVisible();
// });

test("create address", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("dropdown").click();
  const options = page.getByRole("menuitem");
  await options.getByTestId("address").click();
  await page.keyboard.press("Escape");
  expect(page).toHaveURL(/enderecos/);
  const btnAdd = page.getByTestId("Novo Endereço");
  await expect(btnAdd).toBeVisible();

  await btnAdd.click();

  await page.getByLabel("Nome do Destinatário").fill("Jailson rodrigues");
  await page.getByLabel("CEP").fill("05614000");
  await page.getByLabel("Telefone").fill("11965239222");
  await page.getByLabel("Numero").fill("283");
  await page.getByLabel("Complemento").fill("complemento...");
  await page.getByLabel("Telefone").fill("11965239222");
  await page.getByLabel("Rua").fill("Rua Carlos Cyrillo Júnior");
  await page.getByLabel("Bairro").fill("Morumbi");
  await page.getByLabel("Cidade").fill("SP");
  await page.getByLabel("Estado").fill("SP");
  await page.getByRole("radio").first().check();
  await page.keyboard.press("Tab");
  await page.getByRole("button", { name: "Salvar Endereço" }).click();
  const toast = page.locator("li[data-sonner-toast]");
  await expect(toast).toContainText(/sucesso/i, { timeout: 10000 });
});

test("Edit address", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("dropdown").click();
  const options = page.getByRole("menuitem");
  await options.getByTestId("address").click();
  await page.keyboard.press("Escape");
  expect(page).toHaveURL(/enderecos/);

  await page.getByRole("button", { name: "Editar" }).first().click();
  await page.getByLabel("Nome do Destinatário").fill("Will");
  await page.getByLabel("Telefone").fill("11999999999");
  await page.getByRole("radio").last().check();
  await page.getByRole("button", { name: "Atulizar endereço" }).click();
  const toast = page.locator("li[data-sonner-toast]");
  await expect(toast).toContainText(/sucesso/i, { timeout: 10000 });
});

test("remove addresss", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("dropdown").click();
  const options = page.getByRole("menuitem");
  await options.getByTestId("address").click();
  await page.keyboard.press("Escape");
  expect(page).toHaveURL(/enderecos/);

  await page.getByRole("button", { name: "Excluir" }).first().click();
  await page.getByRole("button", { name: "Continuar" }).click();

  const toast = page.locator("li[data-sonner-toast]");
  await expect(toast).toContainText(/deletado/i, { timeout: 10000 });
});

test("define first address as default", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("dropdown").click();
  const options = page.getByRole("menuitem");
  await options.getByTestId("address").click();
  await page.keyboard.press("Escape");
  expect(page).toHaveURL(/enderecos/);
  const btn = page.getByRole("button", { name: "Definir como Padrão" });
  await expect(btn).toBeVisible();
  await btn.first().click();

  await expect(page.locator(".bg-card").getByText("Padrão").nth(1)).toBeVisible(
    { timeout: 1000 }
  );
});
