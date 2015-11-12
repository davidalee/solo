// <form id="search">
//   <input id="searchQuery" type="text" placeholder="What would you like to search for?">
//   <input id="submit" type="submit">
// </form>
// <div id="results">
//   <div id="personality" class="container">
//     <div id="personality0" class="subcontainer">
//       <div class="container-title"></div>
//     </div>
//      <div id="personality1" class="subcontainer"></div>
//     <div id="personality2" class="subcontainer"></div>
//     <div id="personality3" class="subcontainer"></div>
//     <div id="personality4" class="subcontainer"></div>
//   </div>
//   <div id="needs" class="container">
//     <!-- TODO: Create sub-containers -->
//   </div>
//   <div id="values" class="container">
//     <!-- TODO: Create sub-containers -->
//   </div>
// </div>

// This determines whether <Trait /> is rendered
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
    console.log('handling search', search);
    
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
          <div className="flextrait">
            { this.state.traits.map(function(trait) {
              console.log('heres a trait', trait);
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
          <input type="submit" ref="submit" />
        </form>
      </div>
      );
  }
});

// var SearchResult = React.createClass({
//   render: function() {

//     return (
//       // TODO: Update className so it's more relevant
      
//     );
//   }
// });

// ****** CONTINUE
// var subCatsForPersonality = personality.children[0].children; // array-like object of sub-traits

//       for( var i in subCatsForPersonality ){
//         // console.log(subCatsForPersonality[i]);
//         var subTrait = subCatsForPersonality[i];
//         var subTraitName = subTrait.id;
//         var subTraitScore = subTrait.percentage;

//         var subSubTrait = subTrait.children; // Array of sub-sub-traits

//         for( var j = 0; j < subSubTrait.length; j++ ){
//           var currentSubSubTrait = subSubTrait[j];
//           var currentSubSubTraitName = currentSubSubTrait.id;
//           var currentSubSubTraitScore = currentSubSubTrait.percentage;
          
//           // Some sub-sub-traits have names that are slightly more descriptive than the id
//           // in which case, we'll concat the name prop to the id inside parens
//           if( currentSubSubTrait.id !== currentSubSubTrait.name ){
//             currentSubSubTraitName += ' (' + currentSubSubTrait.name + ')';
//           }

//           console.log(currentSubSubTrait);
//         }
//       }

var Trait = React.createClass({
  // getInitialState: function(){
  //   return { subtraits: [] };
  // },
  render: function() {
    console.log('rendering <Trait />');
    for( var i = 0; i < this.props.data.children[0].length; i++ ){
      // .children = array of sub-sub-traits
      // .id = the title of the sub-trait
      // .name = optional extra description of sub-trait, if different from .id then render .name in addition to .id
      // .percentage = score
      var subTrait = this.props.data.children[i];

    }
    return (
      // <div className="trait">
      //   <div className="title">
      //     { this.props.data.children.id }
      //   </div>
      //   <div className="score">
      //     { this.state.subtraits.percentage }
      //   </div>
      //   // Iterate over subtraits, creating a new subtrait for each one
      //   // NOt sure if i'm passing in the right element (this.props.data.children ??)
      //   // <SubTrait data = { this.props.data.children } />
      //   { this.state.subtraits.children.map(function(subTrait){
      //     return (
      //       <SubTrait data={ subTrait } />
      //   );
      // })}
      // </div>

      // Iterate over this.props.data.children, which will give sub-traits and have id property (name of trait)
      <div></div>
    );
  }
});

var SubTrait = React.createClass({
  render: function() {
    return (
      <div className="subtrait">
        <SubSubTrait />
      </div>
    );
  }
});

var SubSubTrait = React.createClass({
  render: function() {
    return (
      <div className="subsubtrait">
        
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);