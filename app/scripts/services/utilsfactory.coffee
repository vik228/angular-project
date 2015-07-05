'use strict'

###*
 # @ngdoc service
 # @name zopkyFrontendApp.UtilsFactory
 # @description
 # # UtilsFactory
 # Factory in the zopkyFrontendApp.
###
angular.module 'zopkyFrontendApp'
  .factory 'UtilsFactory', ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    someMethod: ->
      meaningOfLife
