import { DrivingPage } from './app.po';

describe('driving App', () => {
  let page: DrivingPage;

  beforeEach(() => {
    page = new DrivingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
