import { Resend } from 'resend'
import env from '#start/env'

export interface EmailOptions {
  to: string | string[]
  subject: string
  from: string
  html?: string
  text?: string
}

export default class EmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(env.get('RESEND_API_KEY'))
  }

  async send(options: EmailOptions) {
    const { data, error } = await this.resend.emails.send({
      from: options.from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text!,
    })

    if (error) {
      throw error
    }

    return data
  }
}
