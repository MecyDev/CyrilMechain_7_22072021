const dropdown = document.querySelectorAll('#dropdownMenuButton')

dropdown.forEach(
  (e) =>
    e.addEventListener('click', () => {
      const dropdownOpen = document.querySelectorAll('.flex-fill')
      const type = e.innerText
      if (e.parentElement.classList.contains('flex-fill', 'show')) {
        e.parentElement.classList.remove('flex-fill', 'show')
        e.nextElementSibling.style.display = 'none'
        if (type === 'Recherche un ingrédient') {
          e.textContent = 'Ingrédients'
          e.classList.remove('my-btn--light')
        }
        if (type === 'Recherche un appareil') {
          e.textContent = 'Appareil'
          e.classList.remove('my-btn--light')
        }
        if (type === 'Recherche un ustensile') {
          e.textContent = 'Ustensiles'
          e.classList.remove('my-btn--light')
        }
      } else {
        e.parentElement.classList.add('flex-fill', 'show')
        e.nextElementSibling.style.display = 'block'
        if (type === 'Ingrédients') {
          e.textContent = 'Recherche un ingrédient'
          e.classList.add('my-btn--light')
        }
        if (type === 'Appareil') {
          e.textContent = 'Recherche un appareil'
          e.classList.add('my-btn--light')
        }
        if (type === 'Ustensiles') {
          e.textContent = 'Recherche un ustensile'
          e.classList.add('my-btn--light')
        }
      }
      if (dropdownOpen) {
        dropdownOpen.forEach((i) => {
          const type2 = i.querySelector('button').innerText
          i.querySelector('.dropdown-menu').style.display = 'none'
          i.classList.remove('flex-fill', 'show')
          if (type2 === 'Recherche un ingrédient') {
            i.querySelector('button').textContent = 'Ingrédients'
            i.querySelector('button').classList.remove('my-btn--light')
          }
          if (type2 === 'Recherche un appareil') {
            i.querySelector('button').textContent = 'Appareil'
            i.querySelector('button').classList.remove('my-btn--light')
          }
          if (type2 === 'Recherche un ustensile') {
            i.querySelector('button').textContent = 'Ustensiles'
            i.querySelector('button').classList.remove('my-btn--light')
          }
        })
      }
    }),
  false
)

// create ingredient list
const ingredients = []
const appliances = []
const ustensils = []

recipes.forEach((e) => {
  e.ingredients.forEach((i) => {
    if (!ingredients.includes(i.ingredient)) {
      ingredients.push(i.ingredient)
    }
  })
  e.ustensils.forEach((u) => {
    if (!ustensils.includes(u)) {
      ustensils.push(u)
    }
  })
  if (!appliances.includes(e.appliance)) {
    appliances.push(e.appliance)
  }
})

// create list ul of ingredient

function createList(list) {
  let result = ''
  let pointer = 2
  let j = 0
  for (let i = 0; i < list.length; i += 3) {
    let t = `<ul class="list-group list-group-horizontal">`
    for (j; j <= pointer; j += 1) {
      t += `<li class="list-group-item w-100 border-0 bg-transparent .text-truncate"><a class="dropdown-item" href="#" title="${list[j]}"><span class="d-inline-block text-truncate" style="width: 10rem;">${list[j]}</span></a></li>`
    }
    t += `</ul>`
    pointer += 3
    if (pointer > list.length) {
      pointer = list.length - 1
    }
    result += t
  }
  return result
}

document.querySelector('#ingredients').innerHTML = createList(ingredients)
document.querySelector('#appliances').innerHTML = createList(appliances)
document.querySelector('#ustensils').innerHTML = createList(ustensils)
