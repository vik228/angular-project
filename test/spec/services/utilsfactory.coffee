'use strict'

describe 'Service: UtilsFactory', ->

  # load the service's module
  beforeEach module 'zopkyFrontendApp'

  # instantiate service
  UtilsFactory = {}
  beforeEach inject (_UtilsFactory_) ->
    UtilsFactory = _UtilsFactory_

  it 'should do something', ->
    expect(!!UtilsFactory).toBe true
