describe('Index page', () => {
  let page
  beforeAll(async () => {
    page = await browser.visitPage('/home')
  })
  afterAll(async () => {
    await page.close()
  })

  it('renders index page', async () => {
    const elStr = await page.html()
    expect(elStr).toBeTruthy()
  })
})