import React from 'react';
import NameField from './editable/NameField';
import Stat from './Stat';
import StatWithSubvalue from './StatWithSubvalue';
import StatLongText from './StatLongText';
import SkillSet from './SkillSet';
import uuid from 'uuid';
import { Environment } from '../globals/Environment.Const';
import { Mocks } from '../globals/Mocks.Const';

class Character extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.character) {
        this.regenerate();
    } else {
      var character = this.props.character;
      var stats = this.formatStats(character);
      this.props.onLoadEnd();
      this.setState({
        isLoaded: true,
        character: character,
        stats: stats
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.character)
      return;

    if(this.props.character.id !== prevProps.character.id)
    {
      var character = this.props.character;
      var stats = this.formatStats(character);
      this.setState({
        character: character,
        stats: stats
      });
    }
  }
  
  regenerate = () => {
    var stats = [];

    this.props.onLoadStart();
    this.setState({
      isLoaded: false,
      character: Mocks.character,
      stats: this.formatStats(Mocks.character)
    });

    fetch(Environment.API_LOCATION + 'character/generate')
      .then(res => res.json())
      .then(
        (result) => {
          stats = this.formatStats(result);

      this.props.onLoadEnd();
          this.setState({
            isLoaded: true,
            character: result,
            stats: stats
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  formatStats = (character) => {
    var stats = [];
    for (var stat in character.stats)
    {
      var statName = stat;
      var statValue = character.stats[stat];
      var subValue = Math.floor((statValue - 10) / 2);

      var formattedStat = {
        name: statName.toUpperCase(),
        value: statValue,
        subValue: subValue
      };
      stats.push(formattedStat);
    }
    return stats;
  }

  onSave = (character) => {
    this.props.onSaveCharacter(character);
  }

  renderAttributes = () => {
    var stats = [];
    this.state.stats.forEach(stat => {
      if (!stat.name.includes('MODIFIER')) {
        stats.push(<StatWithSubvalue
            key={uuid.v4()}
            stat={stat}/>)
      }
    });
    return stats;
  }

  renderName = () => {
    var character = this.state.character;
    return (
      <div className="container">
        <NameField name={this.state.character.name} onChange={this.onEditName} />
        <p className="ml-1">{character.race.name} {character.class.name}</p>
      </div>
    );
  }

  renderStats = () =>  {
    var character = this.state.character;
    var proficiency = "+" + character.proficiencyBonus;
    var speed = character.speed + "ft";
    var hitDie = "1d" + character.class.hitDie;
    return(
      <div className="container">
        <div className="row mb-2 ml-0">
          <Stat name="Lvl" value={character.level}></Stat>
          <Stat name="AC" value={character.ac}></Stat>
          <Stat name="HP" value={character.maxHp}></Stat>
        </div>
        <div className="bio">
          <p><StatLongText name="Proficiency bonus" value={proficiency}></StatLongText></p>
          <p><StatLongText name="Speed" value={speed}></StatLongText></p>
          <p><StatLongText name="Hit die" value={hitDie}></StatLongText></p>
          <p><StatLongText name="Alignment" value={character.alignmentName}></StatLongText></p>
        </div>
      </div>
    );
  }

  onEditName = (name) => {
    var newChar = this.state.character;
    newChar.name = name;
    this.setState({
      character: newChar
    });
    this.onSave(newChar);
  }

  render() {
    let stats = this.renderStats();
    let attributes = this.renderAttributes();
    let name = this.renderName();
    return (
      <div className="container">
        <div className="row mt-2 ml-1">
            {name}
        </div>
        <div className="row">
          <div className="col col-8">
            {stats}
          </div>
          <div className="col col-3 mr-1">
            {attributes}
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <SkillSet skills={this.state.character.skillSet} />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={this.regenerate}>Generate a new Lv1 character</button>
        <br />
        <button className="btn btn-secondary mt-3" onClick={() => this.onSave(this.state.character)}>Save this character</button>
      </div>
    );
  }
}

export default Character;