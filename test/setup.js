global.navigate = async (where) => {
  await page.goto(where, { waitUntil: 'load' })
}
