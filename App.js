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
      valores: [],
      detalhes: '',
      valor: '',
      tipo: '',
      uid: 0,
      entradaTotal: 0,
      saidaTotal: 0,
      Total: 0

    }
    this.submit = this.submit.bind(this)
    this.desc = this.desc.bind(this)
    this.value = this.value.bind(this)
    this.radio = this.radio.bind(this)
    this.cor = this.cor.bind(this)
  }

  submit(e) {
    this.setState({ uid: ++this.state.uid })
    e.preventDefault()
    const conteudo = document.querySelector('.flex-direction')
    const Maincontainer = document.createElement('div')
    Maincontainer.classList.add('historic-container-info')
    Maincontainer.id = this.state.uid
    const Secondcontainer = document.createElement('div')
    Secondcontainer.classList.add('cnt', 'top')
    const m1 = document.createElement('div')
    m1.classList.add('first-d', 'flex')
    const m2 = document.createElement('div')
    m2.classList.add('second-d', 'flex')
    const m3 = document.createElement('div')
    m3.classList.add('td-d', 'flex')
    const m4 = document.createElement('div')
    m4.classList.add('last-d', 'flex')
    const m1span = document.createElement('span')
    const m2span = document.createElement('span')
    const m3div = document.createElement('div')
    const m3img = document.createElement('img')
    m3img.classList.add('img-act')
    const m4img = document.createElement('img')
    m4img.classList.add('trash-img')
    conteudo.append(Maincontainer)
    Maincontainer.append(Secondcontainer)
    Secondcontainer.append(m1, m2, m3, m4)
    m1.append(m1span)
    m2.append(m2span)
    m3.append(m3div)
    m3div.append(m3img)
    m4.append(m4img)
    m1span.innerHTML = this.state.detalhes
    m2span.innerHTML = `R$: ${this.state.valor},00`
    m4img.src = trash
    m4img.addEventListener('click', function () {
      document.getElementById(Maincontainer.id).remove()
    })
    if (this.state.tipo === 'saida') {
      m3div.classList.add('div-img-act-red')
      m3img.src = down
      this.setState({ saidaTotal: parseFloat(this.state.valor) + parseFloat(this.state.saidaTotal) })
    } else if (this.state.tipo === 'entrada') {
      m3div.classList.add('div-img-act')
      m3img.src = up
      this.setState({ entradaTotal: parseFloat(this.state.valor) + parseFloat(this.state.entradaTotal) })
    }
    if (this.state.tipo === 'entrada') {
      this.setState({ Total: parseFloat(this.state.valor) + parseFloat(this.state.Total) })
    } else if (this.state.tipo === 'saida') {
      this.setState({ Total: parseFloat(this.state.Total) - parseFloat(this.state.valor) })
    }

    const objeto = {
      id: Date.now(),
      valor: this.state.valor
    }
    setTimeout(() => {
      console.log(this.state.valores)
    }, 100);
    // this.setState({valores: [...this.state.valores, objeto]})
    this.setState({ valores: this.state.valores.concat(objeto) })
    this.setState({ detalhes: '' })
    this.setState({ valor: '' })
  }
  componentDidUpdate() {
    this.cor()
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
  cor() {
    if (this.state.Total < 0) {
      document.querySelector('.total').classList.add('prejuizo')
    } else {
      document.querySelector('.total').classList.remove('prejuizo')
    }
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
                    <h2>R$ {this.state.entradaTotal}.00</h2>
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
                    <h2>R$ {this.state.saidaTotal}.00</h2>
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
                    <h2 className='total'>R$ {this.state.Total}.00</h2>
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
              <div className='flex-direction'>

              </div>

            </div>
          </div>
        </main>
      </div>
    )
  }
}
export default App