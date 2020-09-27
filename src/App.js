import React from 'react';
import dracula from 'prism-react-renderer/themes/dracula';
import LiveEdit from './LiveEdit';


const someCode = `
function App() {
      
      function getKeys(data){
          let longest = data.reduce(function (a, b) { return Object.keys(a).length > Object.keys(b).length ? Object.keys(a) : Object.keys(b); });
          return longest;
      }
      
      function getHeader(data){
          var keys = getKeys(data);
              return keys.map((key, index)=>{
                  return <th key={key}>{key.toUpperCase()}</th>
          })
      }
      
      function getRowsData(data){
          var items = data;
          var keys = getKeys(data);
          console.log(...keys, ...items )
          return items.map((row, index)=>{
              return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
          })
      }
  
      return (
          <div>
            <form>
              <label htmlFor='custom-input'>{label}</label>
              <input id='cutom-input' type='text'/>
            </form>
            <div style={{overflow: 'auto'}}>
              <table>
                <thead>
                    <tr>{getHeader(products)}</tr>
                </thead>
                <tbody>
                    {getRowsData(products)}
                </tbody>
              </table>
            </div>
          </div>
      )
  }
  
  function RenderRow(props){
      return props.keys.map((key, index)=>{
          return <td key={props.data[key]}>{props.data[key]}</td>
      })
  }
  
  render(<App />)
  
  `;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'Search:',
      products: [
        {id: 0, name: 'produkt 1'}, {id: 1, name: 'produkt 2'}
      ]
    } 
  }

// funkcia meniaca label

  changeLabel(labels) {
    let randomNum = Math.floor(Math.random() * labels.length);
    let newLabel = labels[randomNum];
    this.setState({
      label: newLabel
    })
  }

  // funkcia, ktorá pridá stĺpec

  addColumn(rowNo, title, value) {
    const updatedProducts = this.state.products.map(product => {
      if (product.id === rowNo) {
        return ({
          ...product,
          [title]: value
        })
      } else {
         return product
        }
    });
    console.log(updatedProducts);
    this.setState({products: updatedProducts});
  }

  render() {
    const labels = ['Lorem:', 'Ipsum:', 'Dolor:'];
    const buttonsSection = {
      padding: '10px',
      textAlign: 'center'
    }

    return (
      <div className='App-live'>
        <div className='buttons' style={buttonsSection}>
          <button style={{margin: '10px'}} onClick={() => this.changeLabel(labels)}>Toggle Label</button>
          <button onClick={() => this.addColumn(1, 'price', 10)}>Add Column</button>
        </div>
        <LiveEdit code={someCode} scope={this.state} noInline={true} theme={dracula} />
      </div>
    )
  }
};

export default App;