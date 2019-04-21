import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  async model() {
    const blob = await fetch('/functions.json');

    return blob.json();
  }
}
