import React from 'react';
import SelectVariation from './SelectVariation/SelectVariation';
import { editable } from 'vtex-editor';
import './SkuSelector.less';

@editable({
  name: 'SkuSelector@vtex.sku-selector',
  title: 'SkuSelector'
})
class SkuSelector extends React.Component {
  render() {
    let classes = 'v-dream__selector-section col-xs-12';
    let skuVariations = this.props.skuVariations;

    if (this.props.settings && !this.props.settings.isEmpty()) {
      skuVariations = this.props.settings.get('skuVariations');
    }

    return (
      <div className="row clearfix">
        <div className={classes}>
        { skuVariations ?
          skuVariations.map((variationType) => {
            return (
              <div className="v-dream__selector-row row-fluid" key={variationType.get('name')}>
                <SelectVariation skus={this.props.skus} filteredSkus={this.props.filteredSkus}
                                 addFacet={this.props.addFacet} removeFacet={this.props.removeFacet}
                                 facets={this.props.facets} skuVariation={variationType}
                                 id="select-variation" route="product"/>
              </div>
            );
          }) : null
        }
        </div>
      </div>
    );
  }
}

export default SkuSelector;
