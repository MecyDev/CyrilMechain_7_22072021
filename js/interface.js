/*
 * First search implementation - the simple
 */

const dropdown = document.querySelectorAll('#dropdownMenuButton')
const tab = [[], [], []]
let recipesCopy = []
let declencheur = false
let switchRecipes
let saveSearchTerm = ''
const mainSearch = document.querySelector('#search')

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

mainSearch.addEventListener('input', () => {
  if (mainSearch.value.length > 2) {
    saveSearchTerm = mainSearch.value
    if (
      recipesCopy.length === 0 &&
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0
    ) {
      switchRecipes = recipes
    }

    if (
      (recipesCopy.length > 0 && tab[0].length > 0) ||
      tab[1].length > 0 ||
      tab[2].length > 0
    ) {
      switchRecipes = recipesCopy
    }

    if (
      recipesCopy.length > 0 &&
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0
    ) {
      switchRecipes = recipes
    }

    recipesCopy = search(switchRecipes, mainSearch.value)
    generateList(recipesCopy)

    if (declencheur === false) {
      declencheur = true
    }
  } else if (mainSearch.value.length === 2 && declencheur === true) {
    saveSearchTerm = ''
    recipesCopy.length = 0
    if (tab[0].length === 0 && tab[1].length === 0 && tab[2].length === 0) {
      generateList(recipes)
    } else {
      generateList(searchTag(tab))
    }
    if (declencheur === true) {
      declencheur = false
    }
  }
})

// interaction on page

const menuSize = 'w-75'

dropdown.forEach(
  (e) =>
    e.addEventListener('click', () => {
      if (allIngredients.length > 0) {
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
            e.previousElementSibling.value = 'Ingrédients'
            e.previousElementSibling.setAttribute('value', 'Ingrédients')
          }
          if (type === 'Recherche un appareil') {
            e.previousElementSibling.removeAttribute('placeholder')
            e.previousElementSibling.disabled = true
            e.previousElementSibling.value = 'Appareil'
            e.previousElementSibling.setAttribute('value', 'Appareil')
          }
          if (type === 'Recherche un ustensile') {
            e.previousElementSibling.removeAttribute('placeholder')
            e.previousElementSibling.disabled = true
            e.previousElementSibling.value = 'Ustensiles'
            e.previousElementSibling.setAttribute('value', 'Ustensiles')
          }
        } else {
          e.parentElement.classList.add(menuSize, 'show')
          e.nextElementSibling.style.display = 'block'
          if (type === 'Ingrédients') {
            e.previousElementSibling.removeAttribute('value')
            e.previousElementSibling.value = ''
            e.previousElementSibling.disabled = false
            e.previousElementSibling.setAttribute(
              'placeholder',
              'Recherche un ingrédient'
            )
          }
          if (type === 'Appareil') {
            e.previousElementSibling.removeAttribute('value')
            e.previousElementSibling.value = ''
            e.previousElementSibling.disabled = false
            e.previousElementSibling.setAttribute(
              'placeholder',
              'Recherche un appareil'
            )
          }
          if (type === 'Ustensiles') {
            e.previousElementSibling.removeAttribute('value')
            e.previousElementSibling.value = ''
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
            i.classList.remove('show')
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
  document
    .querySelector('#showRecipes')
    .classList.add('row-cols-1', 'row-cols-md-3')
  document.querySelector('#showRecipes').innerHTML = ''
  allIngredients.length = 0
  allAppliances.length = 0
  allUstensils.length = 0

  if (list.length > 0) {
    list.forEach((e) => {
      const recipe = new Recipe(e)
      document.querySelector('#showRecipes').innerHTML += recipe.card()
      e.ingredients.forEach((i) => {
        if (!allIngredients.includes(i.ingredient)) {
          allIngredients.push(i.ingredient)
        }
      })
      if (!allAppliances.includes(e.appliance)) {
        allAppliances.push(e.appliance)
      }
      e.ustensils.forEach((u) => {
        if (!allUstensils.includes(u)) {
          allUstensils.push(u)
        }
      })
    })
    document.querySelector('#ingredients').innerHTML =
      createList(allIngredients)
    document.querySelector('#appliances').innerHTML = createList(allAppliances)
    document.querySelector('#ustensils').innerHTML = createList(allUstensils)
  } else {
    document
      .querySelector('#showRecipes')
      .classList.remove('row-cols-1', 'row-cols-md-3')

    document.querySelector(
      '#showRecipes'
    ).innerHTML = `<div class="col">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », « coco » « lait » etc...</div>`
  }
}

// create list ul of ingredient

function createList(list) {
  let result = ''
  let pointer = 2
  let j = 0
  for (let i = 0; i < list.length; i += 3) {
    let t = `<ul class="list-group list-group-horizontal">`
    for (j; j <= pointer; j += 1) {
      let item = list[j]
      if (typeof list[j] === 'undefined') {
        item = ''
      }
      t += `<li class="list-group-item w-100 border-0 bg-transparent"><a href="#" class="dropdown-item" title="${item}"><span class="d-inline-block text-truncate" style="width: 10rem;">${item}</span></a></li>`
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
const items = document.querySelector('#aSearch')

function searchTag(tags) {
  const nbi = tags[0].length
  const nba = tags[1].length
  const nbu = tags[2].length
  const nbt = nbi + nba + nbu

  if (recipesCopy.length === 0) {
    switchRecipes = recipes
  } else {
    switchRecipes = recipesCopy
  }

  recipesCopy = switchRecipes.filter((el) => {
    let nbFind = 0
    if (nbi > 0) {
      el.ingredients.forEach((i) => {
        if (tags[0].includes(i.ingredient.toLowerCase())) {
          nbFind += 1
        }
      })
    }
    if (nba > 0) {
      if (tags[1].includes(el.appliance.toLowerCase())) {
        nbFind += 1
      }
    }
    if (nbu > 0) {
      el.ustensils.forEach((u) => {
        if (tags[2].includes(u.toLowerCase())) {
          nbFind += 1
        }
      })
    }

    if (nbt === nbFind) {
      return true
    }
  })
  return recipesCopy
}

items.addEventListener('click', (i) => {
  if (i.target) {
    if (i.target.nodeName === 'SPAN' && i.target.textContent) {
      greatParentId =
        i.target.parentElement.parentElement.parentElement.parentElement.id

      if (greatParentId === 'ingredients') {
        tab[0].push(i.target.textContent.toLowerCase())
      } else if (greatParentId === 'appliances') {
        tab[1].push(i.target.textContent.toLowerCase())
      } else {
        tab[2].push(i.target.textContent.toLowerCase())
      }

      generateList(searchTag(tab))
      document.querySelector('#forTags').innerHTML += `
    <a class="btn btn-primary my-btn--tag text-center" type="${greatParentId}">
      <span class="text-nowrap">${i.target.textContent}</span>
      <span id="tag" class="flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
              fill="white" />
        </svg>
      </span>
    </a>
    `
    }
  }
})

// filter les tags
items.addEventListener('input', (i) => {
  if (i.target.value.length > 2) {
    const filter = i.target.value.toLowerCase()
    let targetList
    let selector

    if (i.target.id === 'ing') {
      targetList = allIngredients
      selector = 'ingredients'
    }
    if (i.target.id === 'app') {
      targetList = allAppliances
      selector = 'appliances'
    }
    if (i.target.id === 'ust') {
      targetList = allUstensils
      selector = 'ustensils'
    }

    targetList = targetList.filter((el) => {
      if (el.toLowerCase().includes(filter)) {
        return true
      }
      return false
    })

    document.querySelector(`#${selector}`).innerHTML = createList(targetList)
  } else if (i.target.value.length === 2) {
    document.querySelector('#ingredients').innerHTML =
      createList(allIngredients)
    document.querySelector('#appliances').innerHTML = createList(allAppliances)
    document.querySelector('#ustensils').innerHTML = createList(allUstensils)
  }
})

// Close filters tags
const listTags = document.querySelector('#forTags')

listTags.addEventListener('click', (e) => {
  e.stopPropagation()
  let parent
  if (e.target.nodeName === 'svg') {
    parent = e.target.parentElement.parentElement
  } else if (e.target.nodeName === 'path') {
    parent = e.target.parentElement.parentElement.parentElement
  }

  if (parent !== undefined) {
    let index

    if (parent.getAttribute('type') === 'ingredients') {
      index = 0
    }
    if (parent.getAttribute('type') === 'appliances') {
      index = 1
    }
    if (parent.getAttribute('type') === 'ustensils') {
      index = 2
    }
    const tabIndex = tab[index].indexOf(
      parent.querySelector('span').textContent.toLowerCase()
    )
    if (tabIndex !== -1) {
      tab[index].splice(tabIndex, 1)
    }

    if (
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0 &&
      saveSearchTerm !== ''
    ) {
      recipesCopy = search(recipes, saveSearchTerm)
      generateList(recipesCopy)
    } else if (
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0 &&
      saveSearchTerm === ''
    ) {
      recipesCopy.length = 0
      generateList(recipes)
    } else {
      recipesCopy.length = 0
      generateList(searchTag(tab))
      console(`qu'est ce que je fou ici !`)
    }

    parent.remove()
  }
})

window.addEventListener('load', () => {
  generateList(recipes)
})
