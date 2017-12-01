import { MashupNg2Page } from './app.po';

describe('mashup-ng2 App', function() {
  let page: MashupNg2Page;

  beforeEach(() => {
    page = new MashupNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
