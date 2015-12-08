import { actions } from 'sdk';
import SkuSelectorEditor from './SkuSelectorEditor/SkuSelectorEditor';

let components = [
  {
    name: 'SkuSelectorEditor@vtex.sku-selector',
    constructor: SkuSelectorEditor
  }
];

actions.ComponentActions.register(components);
