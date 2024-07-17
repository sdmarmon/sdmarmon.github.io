import Alpine from 'alpinejs'
import navigationMenu from './navigationMenu.js'
import projectCards from './projectCards.js'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'

Alpine.data('navigationMenu', navigationMenu)
Alpine.data('projectCards', projectCards)
Alpine.plugin(focus)
Alpine.plugin(intersect)

window.Alpine = Alpine
Alpine.start()