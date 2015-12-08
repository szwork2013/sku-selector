import { actions } from 'sdk';
import SkuSelector from './SkuSelector/SkuSelector';

let components = [
  {
    name: 'SkuSelector@vtex.sku-selector',
    constructor: SkuSelector
  }
];

actions.ComponentActions.register(components);
