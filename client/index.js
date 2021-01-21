/* eslint-disable consistent-return, new-cap, no-alert, no-console */

const style = {
  base: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    lineHeight: '1.4',
    letterSpacing: '0.3',
  },
  input: {
    backgroundColor: 'white',
    fontSize: '16px',
    color: '#333',
    borderColor: '#dbdbdb',
    borderRadius: '4px',
    borderWidth: '1px',
    padding: '1rem',
  },
  invalid: {
    color: 'red',
  },
  active: {
    color: 'black',
  },
}

const order = {
  purchase_units: [
    {
      amount: {
        currency_code: 'EUR',
        value: '49.11',
      },
    },
  ],
  application_context: {
    return_url: `${window.location.origin}/success.html`,
    cancel_url: `${window.location.origin}/cancel.html`,
  },
}

/* paypal */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.PAYPAL,
  })
  .render('#paypal-mark')

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.PAYPAL,

    style: {
      label: 'pay',
    },

    createOrder(data, actions) {
      return actions.order.create(order)
    },

    onApprove(data, actions) {
      return actions.order.capture().then(function(details) {
        alert(`Transaction completed by ${details.payer.name.given_name}!`)
      })
    },
  })
  .render('#paypal-btn')

/* sofort */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.SOFORT,
  })
  .render('#sofort-mark')

paypal
  .Fields({
    fundingSource: paypal.FUNDING.SOFORT,
    style,
  })
  .render('#sofort-container')

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.SOFORT,

    style: {
      label: 'pay',
    },

    createOrder(data, actions) {
      return actions.order.create(order)
    },

    onApprove(data, actions) {
      // capture is called after recieving a webhook on the server
    },
  })
  .render('#sofort-btn')


// Listen for changes to the radio buttons
document.querySelectorAll('input[name=payment-option]').forEach(el => {
  // handle button toggles
  el.addEventListener('change', event => {
    switch (event.target.value) {
      case 'paypal':
        document.body.querySelector('#sofort-container').style.display = 'none'
        document.body.querySelector('#paypal-btn').style.display = 'block'

        document.getElementById('sofort-btn').style.display = 'none'

        break

      case 'sofort':
        document.body.querySelector('#paypal-btn').style.display = 'none'

        document.body.querySelector('#sofort-container').style.display = 'block'
        document.getElementById('sofort-btn').style.display = 'block'
        break
      default:
        break
    }
  })
})

document.body.querySelector('#sofort-container').style.display = 'none'
document.getElementById('sofort-btn').style.display = 'none'