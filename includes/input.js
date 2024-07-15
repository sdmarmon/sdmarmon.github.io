import Alpine from 'alpinejs'
import navigationMenu from './navigationMenu.js'
import projectCards from './projectCards.js'
import focus from '@alpinejs/focus'

Alpine.data('navigationMenu', navigationMenu)
Alpine.data('projectCards', projectCards)
Alpine.plugin(focus)

window.Alpine = Alpine
Alpine.start()