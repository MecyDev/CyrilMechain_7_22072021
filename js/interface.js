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
