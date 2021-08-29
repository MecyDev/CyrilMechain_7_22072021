/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// @ts-check

/*
 * First search implementation - the simple
 */

/**
 * For select all dropdow buttons
 * @type {NodeListOf}
 */
const dropdown = document.querySelectorAll(
  '#dropdownMenuButton, #dropdownMenuButton2, #dropdownMenuButton3'
)

/**
 * Select the input of main search
 * @type {HTMLInputElement}
 */
const mainSearch = document.querySelector('#search')

/**
 * Select the parent of all advance searches.
 * @type {HTMLElement}
 */
const items = document.querySelector('#aSearch')

/**
 * Select parent of all tags elements.
 * @type {HTMLElement}
 */
const listTags = document.querySelector('#forTags')

/**
 * Array contains 3 others arrays for listing tag Ingredients, Appliances and ustensils
 * @type {Array.<Array.<string>>}
 */
const tab = [[], [], []]

/**
 * Conntains a filtered copy of the recipes
 * @type {Array}
 */
let recipesCopy = []

/**
 * A switch to detect that the user input goes below 3 characters.
 * @type {boolean}
 */
let declencheur = false

/**
 * A switch to detect whether to use the complete or filtered list of recipes.
 * @type {Array}
 */
let switchRecipes

/**
 * Saving the user enter
 * @type {string}
 */
let saveSearchTerm = ''

const menuSize = 'w-75'

/**
 * lists of all recipes ingredients, appliances and ustensils of all recipes for the advance search.
 * @type {Array}
 */
const allIngredients = []
/** @type {Array} */
const allAppliances = []
/** @type {Array} */
const allUstensils = []

/**
 * Simple Binary search
 * @param {Array} keyList
 * @param {string} word
 * @returns -1 if false
 */
function search(keyList, word) {
  let start = 0
  let end = keyList.length - 1

  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (keyList[middle] === word) {
      return middle
    }
    if (keyList[middle] < word) {
      start = middle + 1
    } else {
      end = middle - 1
    }
  }

  return -1
}

/**
 * Filter the recipes according to the user's search.
 * @param {Array} recipe
 * @param {string} word
 * @returns {Array} Return the filtered recipes or, if not find, the origin recipes
 */
function listFilter(recipe, word) {
  word = word.split(' ').filter((el) => el.length > 2)

  const recipesFilters = []

  for (let i = 0; i < recipe.length; i += 1) {
    let keyWordTab = []
    let find = 0

    keyWordTab = keyWordTab
      .concat(
        recipe[i].description
          .toLowerCase()
          .replace(/['!"#$%&\\'()*+,\-./:;<=>?@[\\\]^_`{|}~']/g, '')
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .split(' '),
        recipe[i].name
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .split(' '),
        recipe[i].ingredients
          .map((el) => {
            const il = el.ingredient
              .toLowerCase()
              .normalize('NFD')
              .replace(/\p{Diacritic}/gu, '')
              .split(' ')
            return il
          })
          .flat()
      )
      .sort()

    for (let w = 0; w < word.length; w += 1) {
      if (
        search(
          keyWordTab,
          word[w]
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
        ) > -1
      ) {
        find += 1
      }
    }
    if (find === word.length) {
      recipesFilters.push(recipe[i])
    }
  }

  if (recipesFilters.length > 0) {
    return recipesFilters
  }
  return recipesCopy
}

/**
 * Generate the html of list of ingredients, appliances or ustensils for advance search.
 * @param {Array} list The list of ingredients or appliances or ustensils for create the list buttons of each
 * @returns {string} The html for render
 */
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

/**
 * Generate html for each recipes and render on page.
 * @param {Array} list List of recipes
 * @returns void
 */
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
      // @ts-ignore
      const recipe = new Recipe(e)
      document.querySelector('#showRecipes').innerHTML += recipe.card()
      e.ingredients.forEach((/** @type { {ingredient: string; }} */ i) => {
        if (!allIngredients.includes(i.ingredient)) {
          allIngredients.push(i.ingredient)
        }
      })
      if (!allAppliances.includes(e.appliance)) {
        allAppliances.push(e.appliance)
      }
      e.ustensils.forEach((/** @type {string} */ u) => {
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

/**
 *
 * @param {Array.<Array.<string>>} tags List of ingredients, appliances and ustensils each one in his table.
 * @returns {Array} Array of filtered recipes
 */
function searchTag(tags) {
  const nbi = tags[0].length
  const nba = tags[1].length
  const nbu = tags[2].length
  const nbt = nbi + nba + nbu

  if (recipesCopy.length === 0) {
    // @ts-ignore
    switchRecipes = recipes
  } else {
    switchRecipes = recipesCopy
  }

  recipesCopy = switchRecipes.filter((el) => {
    let nbFind = 0
    if (nbi > 0) {
      el.ingredients.forEach((/** @type {{ ingredient: string; }} */ i) => {
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
      el.ustensils.forEach((/** @type {string} */ u) => {
        if (tags[2].includes(u.toLowerCase())) {
          nbFind += 1
        }
      })
    }

    if (nbt === nbFind) {
      return true
    }
    return false
  })
  return recipesCopy
}

/**
 * Listen the user entry in the main search input.
 */
mainSearch.addEventListener('input', () => {
  if (mainSearch.value.length > 2) {
    saveSearchTerm = mainSearch.value
    if (
      recipesCopy.length === 0 &&
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0
    ) {
      // @ts-ignore
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
      // @ts-ignore
      switchRecipes = recipes
    }

    recipesCopy = listFilter(switchRecipes, mainSearch.value)
    generateList(recipesCopy)

    if (declencheur === false) {
      declencheur = true
    }
  } else if (mainSearch.value.length === 2 && declencheur === true) {
    saveSearchTerm = ''
    recipesCopy.length = 0
    if (tab[0].length === 0 && tab[1].length === 0 && tab[2].length === 0) {
      // @ts-ignore
      generateList(recipes)
    } else {
      generateList(searchTag(tab))
    }
    if (declencheur === true) {
      declencheur = false
    }
  }
})

/**
 * Listen for open and close buttons of advances search.
 */
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
            i.classList.remove(menuSize, 'show')
            if (type2 === 'Recherche un ingrédient') {
              i.firstElementChild.removeAttribute('placeholder')
              i.firstElementChild.disabled = true
              i.firstElementChild.value = 'Ingrédients'
              i.firstElementChild.setAttribute('value', 'Ingrédients')
            }
            if (type2 === 'Recherche un appareil') {
              i.firstElementChild.removeAttribute('placeholder')
              i.firstElementChild.disabled = true
              i.firstElementChild.value = 'Appareil'
              i.firstElementChild.setAttribute('value', 'Appareil')
            }
            if (type2 === 'Recherche un ustensile') {
              i.firstElementChild.removeAttribute('placeholder')
              i.firstElementChild.disabled = true
              i.firstElementChild.value = 'Ustensiles'
              i.firstElementChild.setAttribute('value', 'Ustensiles')
            }
          })
        }
      }
    }),
  false
)

/**
 * Listen for add tags of type ingredients, appliances or ustensils on page. Generate the html of tags.
 */
items.addEventListener('click', (i) => {
  if (i.target) {
    if (i.target.nodeName === 'SPAN' && i.target.textContent) {
      /**
       * Select the highest parent.
       * @type {string}
       */
      const greatParentId =
        i.target.parentElement.parentElement.parentElement.parentElement.id

      if (greatParentId === 'ingredients') {
        // @ts-ignore
        tab[0].push(i.target.textContent.toLowerCase())
      } else if (greatParentId === 'appliances') {
        // @ts-ignore
        tab[1].push(i.target.textContent.toLowerCase())
      } else {
        // @ts-ignore
        tab[2].push(i.target.textContent.toLowerCase())
      }

      /** @type {string} */
      let tagsType = 'btn-primary'

      if (greatParentId === 'appliances') {
        tagsType = 'btn-success'
      } else if (greatParentId === 'ustensils') {
        tagsType = 'btn-danger'
      }

      generateList(searchTag(tab))
      document.querySelector('#forTags').innerHTML += `
      <a class="btn ${tagsType} my-btn--tag text-center my-btn--${greatParentId}" type="${greatParentId}">
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

/**
 * Listen for remove tags of type ingredients, appliances or ustensils on page. Update the render.
 */
listTags.addEventListener('click', (e) => {
  e.stopPropagation()
  /** @type {HTMLElement} */
  let parent
  if (e.target.nodeName === 'svg') {
    parent = e.target.parentElement.parentElement
  } else if (e.target.nodeName === 'path') {
    parent = e.target.parentElement.parentElement.parentElement
  }

  if (parent !== undefined) {
    /** @type {number} */
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
      // @ts-ignore
      recipesCopy = listFilter(recipes, saveSearchTerm)
      generateList(recipesCopy)
    } else if (
      tab[0].length === 0 &&
      tab[1].length === 0 &&
      tab[2].length === 0 &&
      saveSearchTerm === ''
    ) {
      recipesCopy.length = 0
      // @ts-ignore
      generateList(recipes)
    } else {
      recipesCopy.length = 0
      generateList(searchTag(tab))
    }

    parent.remove()
  }
})

/**
 * Advance search. Filtered the list of ingredients, appliances and ustensils.
 */
items.addEventListener('input', (i) => {
  if (i.target.value.length > 2) {
    /** @type {string} */
    const filter = i.target.value.toLowerCase()
    /** @type {Array} */
    let targetList
    /** @type {string} */
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

/** Generate the page with all recipes on loading */
window.addEventListener('load', () => {
  // @ts-ignore
  generateList(recipes)
})
