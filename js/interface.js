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

console.log(appliance)
console.log(ustensils)

// create ul of ingredient

const listIngredient = `
<ul class="my-list">
${ingredients
  .map(
    (e) =>
      `<li class="list-group-item w-100 border-0 bg-transparent"><a class="dropdown-item" href="#">${e}</a></li>`
  )
  .join('')}
</ul>
`

const listApp = `
<ul class="my-list">
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

dropIngre.innerHTML = listIngredient
dropApp.innerHTML = listApp
dropUsten.innerHTML = listUsten
