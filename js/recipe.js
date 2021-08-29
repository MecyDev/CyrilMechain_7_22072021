/**
 * The class who represent a recipe
 */
class Recipe {
  /**
   *
   * @param {Array} recipe
   */
  constructor(recipe) {
    this.id = recipe.id
    this.name = recipe.name
    this.ingredients = recipe.ingredients
    this.time = recipe.time
    this.description = recipe.description
  }

  /**
   * Give the ingredient quantity and unit in one string.
   * @param {Array} i
   * @returns {string} Return a string of ingredient with quantity and unit.
   */
  listIngredients(i) {
    let quantity = ''
    let unit = ''
    if (i.quantity) {
      quantity = i.quantity
    }
    if (i.unit) {
      unit = i.unit
    }
    return `${i.ingredient}: ${quantity} ${unit}`
  }

  /**
   *Make the recipe card html
   * @returns {string} The html of the card
   */
  card() {
    const card = `
    <div class="col mb-4">
      <div class="card my-card">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180"
            xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#C7BEBE"></rect>
        </svg>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title my-card-title">${this.name}</h5>
                <div class="card-text my-card-text d-flex align-items-start justify-content-between">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                            fill="black" />
                    </svg>
                    <span>${this.time} min</span>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-2">
                <div>
                    <ul class="text-truncate">
                    ${this.ingredients
                      .map((e) => `<li>${this.listIngredients(e)}</li>`)
                      .join('')}
                    </ul>
                </div>

                <p class="card-text my-card-desc text-wrap text-truncate">${
                  this.description
                }</p>
            </div>
        </div>
      </div>
    </div>`
    return card
  }
}
