import React from 'react';
import Immutable from 'immutable';
import getSkuVariations from 'utils/getSkuVariations'
import SelectVariationEditor from './SelectVariationEditor/SelectVariationEditor';
import './SkuSelectorEditor.less';

class SkuSelectorEditor extends React.Component {
  constructor(props) {
    super(props);

    let settings = this.props.settings;
    let { skus } = this.props.componentProps;
    let skuVariations = Immutable.fromJS(getSkuVariations(skus));

    this.state = {
      skuVariations: settings && !settings.isEmpty() ? settings.get('skuVariations') : skuVariations,
      skus: skus
    };
  }

  changeValue = (currentLabel, newValue, id) => {
    id = id === 'label-selector' ? 'label' : id;
    let skuVariations = this.state.skuVariations;
    let index = skuVariations.findIndex((variation) => {
      return variation.get('label') === currentLabel;
    });
    skuVariations = skuVariations.update(index, (variation) => {
      return variation.set(id, newValue);
    });
    this.setState({
      skuVariations: skuVariations
    });
  }

  changeOrder = (variationName, newOrder) => {
    let skuVariations = this.state.skuVariations;
    let index = skuVariations.findIndex((variation) => {
      return variation.get('name') === variationName;
    });
    skuVariations = skuVariations.update(index, (variation) => {
      return variation.set('orderedValues', newOrder);
    });
    this.setState({
      skuVariations: skuVariations
    });
  }

  handleSave = () => {
    this.props.saveSettings(this.state);
  }

  render() {
    const ActionBar = this.props.actionBar;
    const skuVariations = this.state.skuVariations;
    const defineConfigOpen = true;

    return (
      <div className="SkuSelectorEditor">
        {
          skuVariations.map((variationType) => {
            return (
              <SelectVariationEditor
                key={variationType.get('name')}
                name={variationType.get('name')}
                changeValue={this.changeValue}
                type={variationType.get('type')}
                variationLabel={variationType.get('label')}
                skus={this.state.skus}
                isConfigOpen={defineConfigOpen}
                variationOrder={variationType.get('orderedValues')}
                variationValues={variationType.get('values')}
                changeOrder={this.changeOrder}
              />
            );
          })
        }
        <div className="SkuSelectorEditor-actionbar">
          <ActionBar
            id="-"
            title={this.props.title}
            onSave={this.handleSave.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default SkuSelectorEditor;
