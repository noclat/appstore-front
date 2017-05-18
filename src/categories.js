import Component from 'inferno-component';

class Categories extends Component {
  toggle(name) {
    this.props.query.toggleFacetRefinement('category', name).search();
  }

  render() {
    return (
      <ul>
        {
          this.props.items.map(item =>
            <li onClick={() => this.toggle(item.name)}>
              {item.isRefined ? (
                <b>{ item.name } ({ item.count })</b>
              ) : (
                <span>{ item.name } ({ item.count })</span>
              )}
            </li>
          )
        }
      </ul>
    );
  }
}

export default Categories;
