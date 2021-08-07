const dropdown = document.querySelectorAll('#dropdownMenuButton')

dropdown.forEach(
  (e) =>
    e.addEventListener('click', () => {
      const dropdownOpen = document.querySelectorAll('.flex-fill')
      const type = e.previousElementSibling.textContent
      if (e.parentElement.classList.contains('flex-fill', 'show')) {
        e.parentElement.classList.remove('flex-fill', 'show')
        e.nextElementSibling.style.display = 'none'
        if (type === 'Recherche un ingrédient') {
          e.previousElementSibling.textContent = 'Ingrédients'
          e.previousElementSibling.classList.remove('my-btn--light')
        }
        if (type === 'Recherche un appareil') {
          e.previousElementSibling.textContent = 'Appareil'
          e.previousElementSibling.classList.remove('my-btn--light')
        }
        if (type === 'Recherche un ustensile') {
          e.previousElementSibling.textContent = 'Ustensiles'
          e.previousElementSibling.classList.remove('my-btn--light')
        }
      } else {
        e.parentElement.classList.add('flex-fill', 'show')
        e.nextElementSibling.style.display = 'block'
        if (type === 'Ingrédients') {
          e.previousElementSibling.textContent = 'Recherche un ingrédient'
          e.previousElementSibling.classList.add('my-btn--light')
        }
        if (type === 'Appareil') {
          e.previousElementSibling.textContent = 'Recherche un appareil'
          e.previousElementSibling.classList.add('my-btn--light')
        }
        if (type === 'Ustensiles') {
          e.previousElementSibling.textContent = 'Recherche un ustensile'
          e.previousElementSibling.classList.add('my-btn--light')
        }
      }
      if (dropdownOpen) {
        dropdownOpen.forEach((i) => {
          const span2 = i.firstElementChild
          const type2 = span2.textContent
          i.querySelector('.dropdown-menu').style.display = 'none'
          i.classList.remove('flex-fill', 'show')
          if (type2 === 'Recherche un ingrédient') {
            span2.textContent = 'Ingrédients'
            i.querySelector('button').classList.remove('my-btn--light')
          }
          if (type2 === 'Recherche un appareil') {
            span2.textContent = 'Appareil'
            i.querySelector('button').classList.remove('my-btn--light')
          }
          if (type2 === 'Recherche un ustensile') {
            span2.textContent = 'Ustensiles'
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
  const recipe = new Recipe(e)
  document.querySelector('#test').innerHTML += recipe.card()
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

// Select filter tags
const items = document.querySelectorAll('.list-group-item')

items.forEach((i) =>
  i.addEventListener('click', () => {
    document.querySelector('#forTags').innerHTML += `
  <a class="btn btn-primary my-btn--tag text-center">
    <span class="text-nowrap">${i.innerText}</span>
    <svg class="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
          d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
          fill="white" />
    </svg>
  </a>
  `
  })
)

// Close filters tags
const listTags = document.querySelector('#forTags')

listTags.addEventListener('click', (e) => {
  if (e.target) {
    if (e.target.nodeName === 'svg') {
      e.target.parentNode.remove()
    } else if (e.target.nodeName === 'path') {
      e.target.parentNode.parentNode.remove()
    }
  }
})

// function search1
let c

function myFilter(ingr) {
  if (ingr.includes(c)) {
    return true
  }
  return false
}

const mainSearch = document.querySelector('#search')

mainSearch.addEventListener('input', () => {
  if (mainSearch.value.length > 2) {
    ingredients.forEach((e) => {
      if (e.includes(mainSearch.value)) {
        console.log('ouiiiiiiiiii')
      }
      const arr = e.split(' ')
      arr.forEach((i) => {
        if (i.startsWith(mainSearch.value)) {
          c = i
          const test = ingredients.filter(myFilter)
          document.querySelector('#ingredients').innerHTML = createList(test)
        } else {
          c = ''
        }
      })
    })
  }
})
