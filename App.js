import React, { Component } from 'react'
import './styles/style.css'
import dollar from './images/dollar.svg'
import up from './images/up.svg'
import down from './images/down.svg'
import trash from './images/trash.svg'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itens: [],
      detalhes: '',
      valor: '',
      tipo: '',
      id: ''

    }
    this.submit = this.submit.bind(this)
    this.desc = this.desc.bind(this)
    this.value = this.value.bind(this)
    this.radio = this.radio.bind(this)
  }

  submit(e) {
    
  }
  value(e) {
    this.setState({ valor: e.target.value })
  }
  desc(e) {
    this.setState({ detalhes: e.target.value })
  }
  radio(e) {
    this.setState({ tipo: e.target.value })
  }

  render() {
    return (
      <div>
        <header className='header'>
          <div className='header-container'>
            <div className='container-name-div'>
              <div className='dollar-div'> <img src={dollar} alt='..' /> </div>
              <h2>Quasar</h2>
            </div>
            <div className='container-name-div end'>
              <h2>Controle de Finanças</h2>
            </div>
          </div>
        </header>
        <main className='main'>
          <div className='main-container'>
            <div className='itens-div'>
              <div className='div-main'>
                <div className='just-a-container'>
                  <div className='flex-m'>
                    <div className='on1'> <h3>Entradas</h3> </div>
                    <div className='on2'> <div className='div-img-act'> <img src={up} alt='ok' id='img-act' />  </div> </div>
                  </div>
                  <div className='score'>
                    <h2>R$0.00</h2>
                  </div>
                </div>
              </div>
              <div className='div-main'>
                <div className='just-a-container'>
                  <div className='flex-m'>
                    <div className='on1'> <h3>Saidas</h3> </div>
                    <div className='on2'> <div className='div-img-act-red'> <img src={down} alt='ok' id='img-act' />  </div> </div>
                  </div>
                  <div className='score'>
                    <h2>R$0.00</h2>
                  </div>
                </div>
              </div>
              <div className='div-main last'>
                <div className='just-a-container'>
                  <div className='flex-m'>
                    <div className='on1'> <h3>Total</h3> </div>
                    <div className='on2'> <div className='div-img-act-w'> <img src={dollar} alt='ok' id='img-act' />  </div> </div>
                  </div>
                  <div className='score'>
                    <h2>R$0.00</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className='input-div'>
              <form name='form' onSubmit={this.submit}>
                <div className='input-container'>
                  <div className='flexdiv'>
                    <div className='inputs-div margin'><span>Descricão</span>
                      <input type={'text'} className='input-txt' onChange={this.desc} required={true} value={this.state.detalhes} />
                    </div>
                    <div className='inputs-div'><span>Valor</span>
                      <input type={'number'} className='input-txt' placeholder='R$' onChange={this.value} value={this.state.valor} required />
                    </div>
                  </div>
                  <div className='flexdiv'>
                    <div className='select-div'>
                      <div className='radio-div'>
                        <input type={'radio'} id='entrada' name='entrada' value={'entrada'} className='radio' onChange={this.radio} required />
                        <label id='margin' htmlFor='entrada'>Entrada</label>
                        <input type={'radio'} id='saida' name='entrada' value={'saida'} className='radio' onChange={this.radio} required />
                        <label htmlFor='saida'>Saida</label>
                        <input type={'submit'} value='Adicionar' className='btn' />
                      </div>
                    </div>
                  </div>
                </div>
              </form>

            </div>
            <div className='filter-div'>
              <span id='filter-span'>Filtrar:</span>
              <form>
                <input type={'radio'} name='Filtro' />
                <label htmlFor='Todos'>Todos</label>
                <input type={'radio'} name='Filtro' />
                <label htmlFor='Entrada'>Entrada</label>
                <input type={'radio'} name='Filtro' />
                <label htmlFor='Saida'>Saida</label>
              </form>
            </div>
            <div className='historic'>
              <div className='historic-container'>
                <div className='cnt'>
                  <div className='first-d'> <span>Descricão</span> </div>
                  <div className='second-d'> <span>Valor</span> </div>
                  <div className='td-d'> <span>Tipo</span></div>
                  <div className='last-d'> <span>Remover</span></div>
                </div>
              </div>
              <div className='historic-container-info'>
                <div className='cnt top'>
                  <div className='first-d flex'> <span>0</span> </div>
                  <div className='second-d flex'> <span>R$:2.00</span> </div>
                  <div className='td-d flex'> <div className='div-img-act'> <img src={up} alt='ok' id='img-act' />  </div></div>
                  <div className='last-d flex'> <img src={trash} id='trash-img' alt='..' ></img></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
export default App