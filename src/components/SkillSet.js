import React from 'react';
import StatLongText from './StatLongText';

class SkillSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      skills: props.skills
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.skills !== prevProps.skills) {
      this.setState({skills: this.props.skills});
    }
  }

  handleClick = (skillName) => {
    if (!this.props.editMode)
      return;

    var updatedSkills = Object.assign(this.state.skills);

    var keys = Object.keys(updatedSkills);

    keys.forEach(key => {
      var skill = Object.assign(updatedSkills[key]);
      if (key === skillName) {
        skill.proficient = !skill.proficient;
        this.props.onChange(skillName);
      }
    });

    this.setState({skills: updatedSkills});
  };

  renderSkills = () => {
    var skillsArray = [];
    var skillSet = this.state.skills;

    var keys = Object.keys(Object.assign(skillSet));

    keys.forEach(key => {
      var skill = Object.assign(skillSet[key]);

      var prefix = "";

      if (skill.modifier >= 0)
        prefix = "+";

      var style = skill.proficient ? "skill proficient" : "skill";

      var element = (
        <div className={style} key={key}>
          <StatLongText name={key} value={prefix + skill.modifier} editMode={this.props.editMode} onClick={() => {this.handleClick(key)}} />
        </div>
      );

      skillsArray.push(element);
    });

    return skillsArray;
  };


  render() {
    if (!this.state.skills)
      return null;

    var skills = this.renderSkills();

    return(
      <div>
        <h3>Skills</h3>
        <div className="skills">
          {skills}
        </div>
      </div>
    );
  }
}

export default SkillSet;