import { GET, Rester, View } from '@rester/core';

@View()
class DemoView {

  @GET('/')
  index() {
    return { hello: '{{ name }}' };
  }

}

const server = new Rester()
  .configViews.add(DemoView).end()
  .listen();
