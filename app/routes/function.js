import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class FunctionRoute extends Route {
  async model({ id }) {
    const blob = await fetch('/inputs.json');
    const json = await blob.json();

    return json
      .filter(({ functions }) =>
        functions.includes(id) || functions.match(/all/i)
      );
  }
}
