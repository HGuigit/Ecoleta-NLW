
function populateUFs () {
  const ufSelect = document.querySelector("select[name='uf']")
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())// function(res){return res.json}    //      (res) => {return res.json()}
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
populateUFs()

document
  .querySelector("select[name='uf']")
  .addEventListener('change', getCities)

function getCities (event) {
  const citySelect = document.querySelector("select[name='city']")
  const stateInput = document.querySelector("input[name='state']")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = '<option value>Selecione a cidade</option>'
  citySelect.disabled = true

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())// function(res){return res.json}    //      (res) => {return res.json()}
    .then(municips => {
      for (const municipio of municips) {
        citySelect.innerHTML += `<option value="${municipio.nome}">${municipio.nome}</option>`
      }
      citySelect.disabled = false
    })
}

// itens de coleta
// pegar todos os li's

const itensToCollect = document.querySelectorAll('.item-grid li')

for (const item of itensToCollect) {
  item.addEventListener('click', handleSelectedItem) // escuta o evento e chama função
}



const collectedItens = document.querySelector("input[name=itemsli]")

let SelectedItens = []

 

function handleSelectedItem (event) {
  const itemLi = event.target

  // adicionar ou remover uma classe com js
  itemLi.classList.toggle("selected")
  const itemid = itemLi.dataset.id
  
  // verificar se os itens tão selecionados
  // se sim, pegar os itens selecionados

  const alreadySelected = SelectedItens.findIndex(item =>{
    const itemFound = item == itemid
    return itemFound

  })
  
  //se já estiver selecionado, tirar da seleção

  if(alreadySelected >= 0){
    //tirar da seleção
    const filteredItems = SelectedItens.filter( item => {
        const ItemisDifferent = item != itemid
        return ItemisDifferent
    })  
    SelectedItens = filteredItems   
  }else{
      //se não estiver selecionado adicionar a seleção
      SelectedItens.push(itemid)
  }
  collectedItens.value = SelectedItens
 
}

//Atualizar campo escondido com itens selecionados


