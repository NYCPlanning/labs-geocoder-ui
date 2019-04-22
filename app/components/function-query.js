import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const API = 'http://geosupport.planninglabs.nyc';

const objectToQueryString = (object) => Object.keys(object).map(key => key + '=' + object[key]).join('&');

export default class FunctionQueryComponent extends Component {
  functionModel = {};

  queryInputs = {};

  @tracked
  queryResults = {};

  @action
  async queryGeosupport() {
    const queryURI =`${API}/${this.args.functionModel.function}?${objectToQueryString(this.queryInputs)}`;
    const blob = await fetch(queryURI);

    this.queryResults = await blob.json();
  }

  willDestroyElement() {
    this.queryInputs = {};
    this.queryResults = {};
  }
}
