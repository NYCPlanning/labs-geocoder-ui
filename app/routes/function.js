import Route from '@ember/routing/route';
import { set } from '@ember/object';
import fetch from 'fetch';

export default class FunctionRoute extends Route {
  async model({ id }) {
    const functionType = this.modelFor('application')
      .findBy('function', id); 
    const blob = await fetch('/inputs.json');
    const json = await blob.json();

    // grab a reference to the top-level application model,
    // the function, and add the filtered 
    const inputs = json
      // filter by function ID or by reference to "all"
      .filter(({ functions }) => functions.includes(id) || functions.match(/all/i))
      .map(input => {
        input.alt_names = input.alt_names.split(',').map(name => name.trim());

        return input;
      });

    set(functionType, 'inputs', inputs);

    return functionType;
  }
}
