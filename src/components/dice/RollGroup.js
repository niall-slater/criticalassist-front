import React, { Component } from 'react';
import RollMenuSave from './RollMenuSave';
import RollMenuSkill from './RollMenuSkill';
import RollMenuAttack from './RollMenuAttack';
import RollMenuGeneral from './RollMenuGeneral';

class RollGroup extends Component {

  constructor(props) {
    super(props);

    this.menus = {
      SAVE: 'save',
      SKILL: 'skill',
      ATTACK: 'attack',
      GENERAL: 'general',
    };

    this.state = {
      activeRollMenu: null
    }
  }

  onClickSave = () => {
    this.setState({
      activeRollMenu: this.menus.SAVE
    });
  }

  onClickSkill = () => {
    this.setState({
      activeRollMenu: this.menus.SKILL
    });
  }

  onClickAttack = () => {
    this.setState({
      activeRollMenu: this.menus.ATTACK
    });
  }

  onClickRegular = () => {
    this.setState({
      activeRollMenu: this.menus.GENERAL
    });
  }

  renderActiveMenu = () => {
    switch (this.state.activeRollMenu)
    {
      case this.menus.SAVE: return <RollMenuSave character={this.props.character} />;
      case this.menus.SKILL: return <RollMenuSkill character={this.props.character} />;
      case this.menus.ATTACK: return <RollMenuAttack character={this.props.character} />;
      case this.menus.GENERAL: return <RollMenuGeneral />;
      default: return <></>
    }
  }

  render() {
    var activeMenu = this.renderActiveMenu();

    return (
      <div className="row">
        <div className="btn-group rollGroup">
          <button className="btn btn-primary" 
            onClick={this.onClickSave}>Saving throw</button>
          <button className="btn btn-secondary" 
            onClick={this.onClickSkill}>Skill check</button>
          <button className="btn btn-primary" 
            onClick={this.onClickAttack}>Attack roll</button>
          <button className="btn btn-secondary" 
            onClick={this.onClickRegular}>Regular dice roll</button>
        </div>
        {activeMenu}
      </div>
    );
  }
}

export default RollGroup;