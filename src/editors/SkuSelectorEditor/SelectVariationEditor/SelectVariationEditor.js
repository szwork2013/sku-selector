import React from 'react';
import VariationButtonEditor from './VariationButtonEditor/VariationButtonEditor';
import './SelectVariationEditor.less';

class SelectVariationEditor extends React.Component {

  handleChange = (ev) => {
    this.props.changeValue(ev.target.name, ev.target.value, ev.target.id);
  }

  render() {

    return (
      <div className="SelectVariationEditor clearfix" data-is-shown={this.props.isConfigOpen}>
        <span className="variation-label theme-font">Variação de SKU</span>

        <h3 className="variation-header-title">{this.props.name}</h3>
        <div className="inner">
          <form className="variation-field">
              <label htmlFor="label-selector" className="variation-label">Label da Variação</label>
              <span className="label-selector-current theme-font">{this.props.variationLabel}</span>
              <input className="form-control label-selector" id="label" type="text" name={this.props.variationLabel}
                     placeholder="Novo label" onChange={this.handleChange}/>
          </form>
          <div className="variation-field">
            <label className="variation-label" htmlFor="button-type">Tipo do Seletor</label>
            <div id="button-type">
              <button className="list-group-item button-type-selector" data-is-selected={this.props.type === 'PICKER'} id="type" name={this.props.variationLabel} value="PICKER" onTouchTap={this.handleChange}>
                Picker <span className="button-type-beacon"></span>
              </button>
              <button className="list-group-item button-type-selector" data-is-selected={this.props.type === 'IMG'} id="type" name={this.props.variationLabel} value="IMG" onTouchTap={this.handleChange}>
              Image  <span className="button-type-beacon"></span></button>
            </div>
          </div>
          <div className="variation-field">
            <label className="variation-label">Ordenação das Opções</label>
            <VariationButtonEditor className="VariationButtonEditor clearfix" skus={this.props.skus} type={this.props.type} label={this.props.variationLabel} name={this.props.name} variationOrder={this.props.variationOrder} variationValues={this.props.variationValues} changeOrder={this.props.changeOrder}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectVariationEditor;
