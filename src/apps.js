import Component from 'inferno-component';

class Apps extends Component {
  render() {
    return (
      <ul>
        {
          this.props.items.map(item =>
            <li>{  item.name }</li>
          )
        }
      </ul>
    );
  }
}

export default Apps;
