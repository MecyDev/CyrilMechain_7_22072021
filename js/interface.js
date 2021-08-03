const dropdown = document.querySelectorAll('#dropdownMenuButton')

dropdown.forEach(
  (e) =>
    e.addEventListener('click', () => {
      const dropdownOpen = document.querySelectorAll('.flex-fill')
      if (e.parentElement.classList.contains('flex-fill', 'show')) {
        e.parentElement.classList.remove('flex-fill', 'show')
        e.nextElementSibling.style.display = 'none'
      } else {
        e.parentElement.classList.add('flex-fill', 'show')
        e.nextElementSibling.style.display = 'block'
      }
      if (dropdownOpen) {
        dropdownOpen.forEach((i) => {
          i.querySelector('.dropdown-menu').style.display = 'none'
          i.classList.remove('flex-fill', 'show')
        })
      }
    }),
  false
)

// create ingredient list
const ingredients = []
const appliance = []
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
  if (!appliance.includes(e.appliance)) {
    appliance.push(e.appliance)
  }
})

// create ul of ingredient

const listIngredient = `
<ul class="list-group">
${ingredients
  .map(
    (e) =>
      `<li class="list-group-item w-100 border-0 bg-transparent"><a class="dropdown-item" href="#">${e}</a></li>`
  )
  .join('')}
</ul>
`

const listIngre = (function () {
  let array = ''
  let pointer = 2
  let j = 0
  for (let i = 0; i < ingredients.length; i += 3) {
    let t = `<ul class="list-group list-group-horizontal">`
    for (j; j <= pointer; j += 1) {
      t += `<li class="list-group-item w-100 border-0 bg-transparent"><a class="dropdown-item" href="#">${ingredients[j]}</a></li>`
    }
    t += `</ul>`
    pointer += 3
    if (pointer > ingredients.length) {
      pointer = ingredients.length - 1
    }
    array += t
  }
  return array
})()

const listApp = `
<ul class="list-group">
${appliance
  .map(
    (e) =>
      `<li class="list-group-item w-100 border-0 bg-transparent"><a class="dropdown-item" href="#">${e}</a></li>`
  )
  .join('')}
</ul>
`

const listUsten = `
<ul class="my-list">
${ustensils
  .map(
    (e) =>
      `<li class="list-group-item w-100 border-0 bg-transparent"><a class="dropdown-item" href="#">${e}</a></li>`
  )
  .join('')}
</ul>
`
const dropIngre = document.querySelector('#ingredients')
const dropApp = document.querySelector('#appliance')
const dropUsten = document.querySelector('#ustensils')

dropIngre.innerHTML = listIngre
// dropApp.innerHTML = listApp
// dropUsten.innerHTML = listUsten
