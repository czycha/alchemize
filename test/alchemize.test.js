describe('alchemize', () => {
  beforeEach(async () => {
    await navigate(PATH)
  })
  test('match: selector; transform: function; parent: document', async () => {
    await page.evaluate(() => {
      alchemize('.water', (el) => { $(el).removeClass('water').addClass('wine').text('wine') })
      $('#root').html('<div class="water">water</div>')
    })
    await expect(page).not.toMatchElement('.water')
    await expect(page).toMatchElement('.wine', { text: 'wine' })
  })
  test('match: function; transform: function; parent: document', async () => {
    await page.evaluate(() => {
      alchemize((el) => (el.nodeType === 1 && $(el).hasClass('water')), (el) => { $(el).removeClass('water').addClass('wine').text('wine') })
      $('#root').html('<div class="water">water</div>')
    })
    await expect(page).not.toMatchElement('.water')
    await expect(page).toMatchElement('.wine', { text: 'wine' })
  })
  test('match: selector; transform: constant; parent: document', async () => {
    await page.evaluate(() => {
      alchemize('.water', $('<div class="wine">wine</div>').get(0))
      $('#root').html('<div class="water">water</div>')
    })
    await expect(page).not.toMatchElement('.water')
    await expect(page).toMatchElement('.wine', { text: 'wine' })
  })
  test('match: selector; transform: function; parent: element', async () => {
    await page.evaluate(() => {
      alchemize('.water', (el) => { $(el).removeClass('water').addClass('wine').text('wine') }, document.getElementById('root'))
      $('#root')
        .html('<div class="water should-transform">water</div>')
        .after('<div class="water should-not-transform">water</div>')
    })
    await expect(page).not.toMatchElement('.water.should-transform')
    await expect(page).toMatchElement('.wine.should-transform', { text: 'wine' })
    await expect(page).toMatchElement('.water.should-not-transform')
  })
})
