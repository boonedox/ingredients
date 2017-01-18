import { TmpprojPage } from './app.po';

describe('tmpproj App', function() {
  let page: TmpprojPage;

  beforeEach(() => {
    page = new TmpprojPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
