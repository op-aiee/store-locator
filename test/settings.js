import test from 'ava'
import StoreLocater from '../src/'

test('Skip: Defaults get overridden', t => {
  const instance1 = new StoreLocater({
    templates: {
      'sidebar': 'TEST'
    }
  })

  const instance2 = new StoreLocater({
    templates: {
      'sidebar': 'TEST'
    }
  })

  t.true(instance1.settings.templates.sidebar === 'TEST')
  t.true(instance2.settings.elements.map === '.js-map')
})
