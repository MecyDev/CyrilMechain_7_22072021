const dropdown = document.querySelectorAll('#dropdownMenuButton')
let tab = []
/*
 * First search implementation - the simple
 */
const mainSearch = document.querySelector('#search')
const recipesList = []

function search(recipe, word) {
  if (word.endsWith(' ')) {
    word = word.trimEnd()
  }
  return recipe.filter(function (e) {
    if (e.name.toLowerCase().includes(word.toLowerCase())) {
      return true
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const el of e.ingredients) {
      if (el.ingredient.toLowerCase().includes(word.toLowerCase())) {
        return true
      }
    }

    if (e.description.toLowerCase().includes(word.toLowerCase())) {
      return true
    }
    return false
  })
}

let declencheur = false

mainSearch.addEventListener('input', () => {
  if (mainSearch.value.length > 2) {
    setTimeout(() => {
      generateList(search(recipes, mainSearch.value))
    }, 250)
    if (declencheur === false) {
      declencheur = true
    }
  } else if (mainSearch.value.length === 2 && declencheur === true) {
    setTimeout(() => {
      generateList(recipes)
    }, 250)
    if (declencheur === true) {
      declencheur = false
    }
  }
})

// interaction on page
const nbIngredients = 3
let menuSize = 'w-75'

if (nbIngredients === 2) {
  menuSize = 'w-50'
} else if (nbIngredients < 2) {
  menuSize = 'w-0'
}

dropdown.forEach(
  (e) =>
    e.addEventListener('click', () => {
      const dropdownOpen = document.querySelectorAll('.show')
      let type = e.previousElementSibling.getAttribute('value')
      if (type === null) {
        type = e.previousElementSibling.getAttribute('placeholder')
      }
      if (e.parentElement.classList.contains('show')) {
        e.parentElement.classList.remove(menuSize, 'show')
        e.nextElementSibling.style.display = 'none'
        if (type === 'Recherche un ingrédient') {
          e.previousElementSibling.removeAttribute('placeholder')
          e.previousElementSibling.disabled = true
          e.previousElementSibling.setAttribute('value', 'Ingrédients')
        }
        if (type === 'Recherche un appareil') {
          e.previousElementSibling.removeAttribute('placeholder')
          e.previousElementSibling.disabled = true
          e.previousElementSibling.setAttribute('value', 'Appareil')
        }
        if (type === 'Recherche un ustensile') {
          e.previousElementSibling.removeAttribute('placeholder')
          e.previousElementSibling.disabled = true
          e.previousElementSibling.setAttribute('value', 'Ustensiles')
        }
      } else {
        e.parentElement.classList.add(menuSize, 'show')
        e.nextElementSibling.style.display = 'block'
        if (type === 'Ingrédients') {
          e.previousElementSibling.removeAttribute('value')
          e.previousElementSibling.disabled = false
          e.previousElementSibling.setAttribute(
            'placeholder',
            'Recherche un ingrédient'
          )
        }
        if (type === 'Appareil') {
          e.previousElementSibling.removeAttribute('value')
          e.previousElementSibling.disabled = false
          e.previousElementSibling.setAttribute(
            'placeholder',
            'Recherche un appareil'
          )
        }
        if (type === 'Ustensiles') {
          e.previousElementSibling.removeAttribute('value')
          e.previousElementSibling.disabled = false
          e.previousElementSibling.setAttribute(
            'placeholder',
            'Recherche un ustensile'
          )
        }
      }
      if (dropdownOpen) {
        dropdownOpen.forEach((i) => {
          const type2 = i.firstElementChild.getAttribute('placeholder')
          i.querySelector('.dropdown-menu').style.display = 'none'
          i.classList.remove(menuSize, 'show')
          if (type2 === 'Recherche un ingrédient') {
            i.firstElementChild.removeAttribute('placeholder')
            i.firstElementChild.disabled = true
            i.firstElementChild.setAttribute('value', 'Ingrédients')
          }
          if (type2 === 'Recherche un appareil') {
            i.firstElementChild.removeAttribute('placeholder')
            i.firstElementChild.disabled = true
            i.firstElementChild.setAttribute('value', 'Appareil')
          }
          if (type2 === 'Recherche un ustensile') {
            i.firstElementChild.removeAttribute('placeholder')
            i.firstElementChild.disabled = true
            i.firstElementChild.setAttribute('value', 'Ustensiles')
          }
        })
      }
    }),
  false
)

// create ingredient list
const allIngredients = []
const allAppliances = []
const allUstensils = []

function generateList(list) {
  document.querySelector('#ingredients').innerHTML = ''
  document.querySelector('#ustensils').innerHTML = ''
  document.querySelector('#appliances').innerHTML = ''
  document.querySelector('#test').innerHTML = ''
  allIngredients.length = 0
  allAppliances.length = 0
  allUstensils.length = 0
  list.forEach((e) => {
    const recipe = new Recipe(e)
    document.querySelector('#test').innerHTML += recipe.card()
    e.ingredients.forEach((i) => {
      if (!allIngredients.includes(i.ingredient)) {
        allIngredients.push(i.ingredient)
      }
    })
    e.ustensils.forEach((u) => {
      if (!allUstensils.includes(u)) {
        allUstensils.push(u)
      }
    })
    if (!allAppliances.includes(e.appliance)) {
      allAppliances.push(e.appliance)
    }
  })
  document.querySelector('#ingredients').innerHTML = createList(allIngredients)
  document.querySelector('#ustensils').innerHTML = createList(allUstensils)
  document.querySelector('#appliances').innerHTML = createList(allAppliances)
}

generateList(recipes)

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

// Select filter tags
const itemsIngredients = document.querySelector('#ingredients')

function searchTag(type, tags) {
  const nb = tags.length

  if (type === 'ingredients') {
    return recipes.filter((el) => {
      let nbFind = 0
      el.ingredients.forEach((i) => {
        if (tags.includes(i.ingredient)) {
          nbFind += 1
        }
      })
      if (nb === nbFind) {
        return true
      }
    })
  }
}

itemsIngredients.addEventListener('click', (i) => {
  if (i.target) {
    if (i.target.nodeName === 'SPAN' && i.target.textContent) {
      tab.push(i.target.textContent)
      console.log(tab)
      generateList(searchTag('ingredients', tab))
      document.querySelector('#forTags').innerHTML += `
    <a class="btn btn-primary my-btn--tag text-center">
      <span class="text-nowrap">${i.target.textContent}</span>
      <svg class="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
            fill="white" />
      </svg>
    </a>
    `
    }
  }
})

/* items.forEach((i) =>
  i.addEventListener('click', () => {
    tab.push(i.innerText)
    console.log(i.innerText)
    console.log(tab)
    generateList(searchTag('ingredients', tab))
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
) */

// Close filters tags
const listTags = document.querySelector('#forTags')

listTags.addEventListener('click', (e) => {
  e.stopPropagation()
  if (e.target.nodeName === 'path') {
    tab = tab.filter(function (i) {
      return (
        i !== e.target.parentNode.parentNode.querySelector('span').textContent
      )
    })
    generateList(searchTag('ingredients', tab))
    e.target.parentNode.parentNode.remove()

    /* if (e.target.nodeName === 'svg') {
      e.target.parentNode.remove()
    } else if (e.target.nodeName === 'path') {
      e.target.parentNode.parentNode.remove()
    } */
  }
})
