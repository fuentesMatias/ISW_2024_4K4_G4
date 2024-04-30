import emailjs from '@emailjs/browser'

const configureEmail = () => {
  emailjs.init({
    publicKey: 'iFGG64FAUMjTXATtP',
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail'
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000
    }
  })
}

const enviarMailPedidoDeEnvio = (contenidoHtml, templateId = null) => {
  const templateParams = {
    html_message: contenidoHtml
  }
  configureEmail()
  emailjs.send('service_tango_app_g4', templateId || 'template_09d6npv', templateParams).then(
    (response) => {
      console.log('Mail enviado!', response.status, response.text)
    },
    (error) => {
      console.log('Error en el envío del mail:', error)
    }
  )
}

export default enviarMailPedidoDeEnvio
