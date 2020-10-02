import React from 'react';
import dracula from 'prism-react-renderer/themes/dracula';
import LiveEdit from './LiveEdit';

const someCode = `
function App() {
      
      function getKeys(data){
          let longest = data.reduce((a, b) => { return Object.keys(a).length > Object.keys(b).length ? Object.keys(a) : Object.keys(b); });
          return longest;
      }
      
      function getHeader(data){
          var keys = getKeys(data);
              return keys.map((key, index)=> {
                  return <th key={key}>{key.toUpperCase()}</th>
          })
      }
      
      function getRowsData(data){
          var items = data;
          var keys = getKeys(data);
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
        {id: 0, title: 'produkt 1'}, {id: 1, title: 'produkt 2'}
      ],
      rowNo: '',
      title: '',
      value: ''
    } 
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'title':
        if (e.target.value.match(/^[a-zA-Z ]+$/) != null) {
          this.setState({[e.target.name]: e.target.value});
        }
        break;

      default:
        this.setState({[e.target.name]: e.target.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { rowNo, title, value } = this.state;
    this.addColumn(rowNo, title, value);
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
    let coercedRowNo = Number(rowNo);
    
    if (coercedRowNo >= 0 && coercedRowNo <= this.state.products.length) {  
      const updatedProducts = this.state.products.map(product => {
        
        if (product.id === coercedRowNo) {
          return ({
            ...product,
            [title]: value
          });
        } 
        if (title in product) {
        return product;
        } else {
            return ({
              ...product,
              [title]: null
            });
          }
      });
      
      this.setState({
        products: updatedProducts,
        rowNo: '',
        title: '',
        value: ''
      });
    }
  }

  render() {
    const labels = ['Lorem:', 'Ipsum:', 'Dolor:'];
    const { rowNo, title, value } = this.state;

    return (
      <div className='App-live'>
        <div className='input-section'>
          <form className='app-form' onSubmit={e => this.handleSubmit(e)}>
            <input type='number' name='rowNo' value={rowNo} min={0} max={this.state.products.length - 1} onChange={e => this.handleChange(e)} placeholder='Enter row number' required style={{width: '10em'}} />
            <input type='text' name='title' value={title} onChange={e => this.handleChange(e)} placeholder='Enter column title' required />
            <input type='text' name='value' value={value} onChange={e => this.handleChange(e)} placeholder='Enter column value' required />
            <button type='submit'>Add Column</button>
            <button type='button' onClick={() => this.changeLabel(labels)}>Toggle Label</button>
          </form>
        </div>
        <LiveEdit code={someCode} scope={this.state} noInline={true} theme={dracula} />
      </div>
    )
  }
};

export default App;