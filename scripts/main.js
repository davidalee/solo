// This determines whether <Trait /> is rendered
// tODO:  can probably remove this global variable
window.searchSubmitted = false;

var App = React.createClass({
  // getInitialState: function(){
  //   return { traits: [] };
  // },
  render: function() {
    // TODO: Currently displaying just one trait. We need to display all three traits
    return (
      <div className="app">
        <SearchGroup />
        // TODO: Can probably remove this part
        { window.searchSubmitted ? <Trait /> : null }
      </div>
    );
  }
});

var SearchGroup = React.createClass({
  getInitialState: function() {
    return { traits: {} };
  },
  handleSearch: function(search) {
    var thiz = this;
    
    $.get('/search', search, function(data){
      // 'traits' holds our three main traits: personality, needs, values
      thiz.setState({ traits: data.tree.children });
      console.log('setting state with traits');
      // var personality = data.tree.children[0];
      // var needs = data.tree.children[1];
      // var values = data.tree.children[2];
    });

  },
  render: function() {
    return (
      <div className = "search-group">
        <SearchText onSearchSubmit={ this.handleSearch }/>
        { Object.keys(this.state.traits).length && 
          <div>
            { this.state.traits.map(function(trait) {
              // console.log('heres a trait', trait);
              return (
                <Trait data={ trait } />
              );
            })}
          </div> }
      </div>
      );
  }
});

var SearchText = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var text = $('[name=searchbox]').val();
    console.log('handling submit', text);
    if (!text) return;

    // TODO: update the obj im sending as an arg to onSearchSubmit()
    this.props.onSearchSubmit( text );

    $('[name=searchbox]').val('');
  },
  render: function() {
    return (
      <div>
        <form name="searchform" onSubmit={ this.handleSubmit }>
          <input type="text" name="searchbox" placeholder="Type in artist's name" />
          <input type="submit" value="Analyze" />
        </form>
      </div>
      );
  }
});

var Trait = React.createClass({
  render: function() {
    // console.log('rendering <Trait />', this);
    var traitName = this.props.data.name === 'Big 5' ? this.props.data.name + ' (Personality)' : this.props.data.name;
    // Is array of sub-traits, has .name, .percentage, .children (array of sub-sub-traits)
    var subTraits = this.props.data.children[0].children;
    // console.log('yo', this.props.data);
    return (
      // Iterate over this.props.data.children, which will give sub-traits and have id property (name of trait)
      <div className="container">
        <h2>{ traitName }</h2>
        <SubTrait data={ subTraits } />
      </div>
    );
  }
});

var SubTrait = React.createClass({

  render: function() {
    // Array of subTraits with .name, .percentage, and .children (array of subsubtraits)
    var subTraits = this.props.data;
    var subTraitNodes = subTraits.map(function(subTrait){
      // console.log('yo', subTrait);
      var subSubTraitNodes;

      if( subTrait.children ){
        subSubTraitNodes = subTrait.children.map(function(subSubTrait){
          return (
            <SubSubTrait data={subSubTrait} />
          );
        })
      }

      return (
        <div>
          <h4>
            { subTrait.name }
            <span className="score">
              { convertPercentage(subTrait.percentage) }
            </span>
          </h4>
          { subSubTraitNodes }
        </div>
      );
    });

    return (
    <div>
      { subTraitNodes }
    </div>
    );
  }
});

var SubSubTrait = React.createClass({
  render: function() {
    var name = this.props.data.name;
    var score = convertPercentage(this.props.data.percentage);

    return (
      <div className="subsubtrait">
        <span>{ name } <span className="score">{ score }</span> </span>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);