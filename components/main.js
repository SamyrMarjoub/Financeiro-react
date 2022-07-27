import React, { Component } from "react";
import dollar from '../images/dollar.svg'
import up from '../images/up.svg'
import down from '../images/down.svg'
import trash from '../images/trash.svg'

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storagerray: [],
            detalhes: '',
            valor: '',
            tipo: '',
            uid: 0,
            entradaTotal: 0,
            saidaTotal: 0,
            Total: 0,
            uidcT: 0,
            getitens: JSON.parse(localStorage.getItem('itens')),
            filtro: ''


        }
        this.submit = this.submit.bind(this)
        this.cor = this.cor.bind(this)
        this.controleDeSaida = this.controleDeSaida.bind(this)
        this.todos = this.todos.bind(this)
        this.saidas = this.saidas.bind(this)
        this.entradas = this.entradas.bind(this)

    }

    submit(e) {

        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({ uid: ++this.state.uid })
        e.preventDefault()
        const conteudo = document.querySelector('.flex-direction')
        const Maincontainer = document.createElement('div')
        Maincontainer.classList.add('historic-container-info', 'aaa')
        Maincontainer.id = `M${this.state.uid}`
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
        m4img.src = trash
        m4img.id = `I${this.state.uidcT}`

        if (this.state.tipo === 'saida') {
            m2span.innerHTML = `RS$: <span class=T${this.state.uidcT}>${this.state.valor}</span>.00`
        } else if (this.state.tipo === 'entrada') {
            m2span.innerHTML = `RS$: <span class=T${this.state.uidcT}>${this.state.valor}</span>.00`
        }

        if (this.state.tipo === 'saida') {
            m3div.classList.add('div-img-act-red')
            m3img.src = down
            this.setState({ saidaTotal: parseFloat(this.state.valor) + parseFloat(this.state.saidaTotal) })
            Maincontainer.classList.add('saida')
        } else if (this.state.tipo === 'entrada') {
            m3div.classList.add('div-img-act')
            m3img.src = up
            this.setState({ entradaTotal: parseFloat(this.state.valor) + parseFloat(this.state.entradaTotal) })
            Maincontainer.classList.add('entrada')

        }
        m2.classList.add(this.state.uidcT)
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({ uidcT: ++this.state.uidcT })


        if (this.state.tipo === 'entrada') {
            this.setState({ Total: parseFloat(this.state.valor) + parseFloat(this.state.Total) })
        } else if (this.state.tipo === 'saida') {
            this.setState({ Total: parseFloat(this.state.Total) - parseFloat(this.state.valor) })
        }
        const imgdinamica = document.getElementById(m4img.id)
        imgdinamica.addEventListener('click', () => {
            if (document.getElementById(Maincontainer.id).classList.contains('saida')) {
                let conta = m4img.id
                const node = document.querySelector(`.T${conta[1]}`)
                let valor = node.innerText
                this.setState({ saidaTotal: parseFloat(this.state.saidaTotal) - parseFloat(valor) })
                this.setState({ Total: parseFloat(this.state.Total) + parseFloat(valor) })
                document.getElementById(Maincontainer.id).remove()
            } else if (document.getElementById(Maincontainer.id).classList.contains('entrada')) {
                let conta = m4img.id
                const node = document.querySelector(`.T${conta[1]}`)
                let valor = node.innerText
                this.setState({ entradaTotal: parseFloat(this.state.entradaTotal) - parseFloat(valor) })
                this.setState({ Total: parseFloat(this.state.Total) - parseFloat(valor) })
                document.getElementById(Maincontainer.id).remove()
            }

        })

        // const objeto = {
        //     idM: this.state.uid,
        //     idT: this.state.uidcT,
        //     detalhes: this.state.detalhes,
        //     valor: this.state.valor,
        //     tipo: this.state.tipo
        // }
        // this.setState({ storagerray: this.state.storagerray.concat(objeto) })
        // localStorage.setItem('itens', JSON.stringify(this.state.storagerray))
        this.setState({ detalhes: '' })
        this.setState({ valor: '' })
    }

    todos() {
        const elementos = document.getElementsByClassName('historic-container-info')
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].classList.remove('hide')
            elementos[i].classList.add('show')
        }
    }
    saidas() {
        const elementos = document.getElementsByClassName('historic-container-info')
        const elementosS = document.getElementsByClassName('saida')
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].classList.add('hide')
        }
        for (let i = 0; i < elementosS.length; i++) {
            elementosS[i].classList.remove('hide')
            elementosS[i].classList.add('show')
        }
    }
    entradas() {
        const elementos = document.getElementsByClassName('historic-container-info')
        const elementosS = document.getElementsByClassName('entrada')
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].classList.add('hide')
        }
        for (let i = 0; i < elementosS.length; i++) {
            elementosS[i].classList.remove('hide')
            elementosS[i].classList.add('show')
        }
    }
    componentDidUpdate(prevPros, prevState) {
        if (prevState.Total !== this.state.Total) {
            this.cor()
            this.controleDeSaida()
            localStorage.setItem('itens', JSON.stringify(this.state.storagerray))
            console.log(localStorage.getItem('itens'))
        }
        if (prevState.visitedd !== this.state.visitedd) {

        }
        if (prevState.storagerray !== this.state.storagerray) {

        }

    }
    cor() {
        if (this.state.Total < 0) {
            document.querySelector('.total').classList.add('prejuizo')
        } else {
            document.querySelector('.total').classList.remove('prejuizo')
        }
    }
    controleDeSaida() {
        if (this.state.saidaTotal < 0) {
            this.setState({ saidaTotal: 0 })
        }
    }


    render() {

        return (
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
                                    <h2>R$ <span className='nme'>{this.state.entradaTotal}</span>.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className='div-main'>
                            <div className='just-a-container'>
                                <div className='flex-m'>
                                    <div className='on1'> <h3>Saidas</h3> </div>
                                    <div className='on2'> <div className='div-img-act-red'> <img src={down} alt='ok' id='img-act' />  </div> </div>
                                </div>
                                <div className='score saida-h2'>
                                    <h2>R$ <span className='nmv'>{this.state.saidaTotal}</span>.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className='div-main last nomargin'>
                            <div className='just-a-container'>
                                <div className='flex-m'>
                                    <div className='on1'> <h3>Total</h3> </div>
                                    <div className='on2'> <div className='div-img-act-w'> <img src={dollar} alt='ok' id='img-act' />  </div> </div>
                                </div>
                                <div className='score'>
                                    <h2 className='total'>R$ <span className='nmt'> {this.state.Total}</span>.00</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='input-div'>
                        <form name='form' onSubmit={this.submit}>
                            <div className='input-container'>
                                <div className='flexdiv'>
                                    <div className='inputs-div margin'><span>Descricão</span>
                                        <input type={'text'} className='input-txt' onChange={(e) => { this.setState({ detalhes: e.target.value }) }} required={true} value={this.state.detalhes} />
                                    </div>
                                    <div className='inputs-div nomargin'><span>Valor</span>
                                        <input type={'number'} className='input-txt' placeholder='R$' onChange={(e) => { this.setState({ valor: e.target.value }) }} value={this.state.valor} required />
                                    </div>
                                </div>
                                <div className='flexdiv nomargintop'>
                                    <div className='select-div'>
                                        <div className='radio-div'>
                                            <input type={'radio'} id='entrada' name='entrada' value={'entrada'} className='radio' onChange={(e) => { this.setState({ tipo: e.target.value }) }} required />
                                            <label id='margin' htmlFor='entrada'>Entrada</label>
                                            <input type={'radio'} id='saida' name='entrada' value={'saida'} className='radio' onChange={(e) => { this.setState({ tipo: e.target.value }) }} required />
                                            <label htmlFor='saida'>Saida</label>
                                        </div>
                                        <div className='div-submit'>
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
                            <input type={'radio'} name='Filtro' onClick={this.todos} />
                            <label htmlFor='Todos '>Todos</label>
                            <input type={'radio'} name='Filtro' onClick={this.entradas} />
                            <label htmlFor='Entrada'>Entrada</label>
                            <input type={'radio'} name='Filtro' onClick={this.saidas} />
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
                            {localStorage.getItem('itens') && localStorage.getItem('boolean') ? <div className='historic-container-info aaa' id={this.state.uid}>{this.state.getitens.map((e) => {
                                return (
                                    <div className='cnt top' key={e.idM}>
                                        <div className='first-d flex'> <span>{e.detalhes}</span> </div>
                                        <div className='second-d flex'> <span>R${e.valor}.00</span> </div>
                                        <div className='td-d flex'> <div className={e.tipo === 'entrada' ? 'div-img-act' : 'div-img-act-red'}> <img src={e.tipo === 'entrada' ? up : down} className='img-act' alt='' /> </div> </div>
                                        <div className='last-d flex'> <img src={trash} className='trash-img' alt='' /> </div>
                                    </div>
                                )
                            })} </div> : <></>}
                        </div>
                    </div>
                </div>
            </main>
        )


    }


}
export default Main