import Component from 'inferno-component';

class Categories extends Component {
  toggle(name) {
    this.props.query.toggleFacetRefinement('category', name).search();
  }

  render() {
    return (
      <div className="Categories">
        <h2 className="Categories-title">Categories</h2>
        <ul className="Categories-list">
          {
            this.props.items.map(item =>
              <li
                className={ item.isRefined ? 'Categories-list-item is-active' : 'Categories-list-item'}
                onClick={() => this.toggle(item.name)}>
                <i class="material-icons">{ item.isRefined ? 'check_box' : 'check_box_outline_blank' }</i>
                <span className="Categories-list-item-name">{ item.name }</span>
                <span className="Categories-list-item-count">{ item.count }</span>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Categories;
