import Alpine from 'alpinejs'
import navigationMenu from './navigationMenu.js'
import projectCards from './projectCards.js'

Alpine.data('navigationMenu', navigationMenu)
Alpine.data('projectCards', projectCards)

window.Alpine = Alpine
Alpine.start()