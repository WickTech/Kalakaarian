import axios from 'axios';

const WHATSAPP_API_VERSION = 'v18.0';

interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  businessAccountId: string;
}

interface SendMessageOptions {
  to: string;
  template: string;
  language?: string;
  components?: Array<{
    type: string;
    parameters: Array<{
      type: string;
      text?: string;
    }>;
  }>;
}

class WhatsAppService {
  private config: WhatsAppConfig | null = null;
  private baseUrl: string;

  constructor() {
    this.baseUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}`;
  }

  configure(config: WhatsAppConfig) {
    this.config = config;
  }

  isConfigured(): boolean {
    return !!this.config?.phoneNumberId && !!this.config?.accessToken;
  }

  private getHeaders() {
    if (!this.config) {
      throw new Error('WhatsApp not configured');
    }
    return {
      Authorization: `Bearer ${this.config.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async sendMessage(options: SendMessageOptions): Promise<{ messageId: string }> {
    if (!this.config) {
      throw new Error('WhatsApp not configured');
    }

    const payload = {
      messaging_product: 'whatsapp',
      to: options.to,
      type: 'template',
      template: {
        name: options.template,
        language: {
          code: options.language || 'en',
        },
        components: options.components || [],
      },
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        payload,
        { headers: this.getHeaders() }
      );

      return { messageId: response.data.messages[0].id };
    } catch (error: any) {
      console.error('WhatsApp send error:', error.response?.data || error.message);
      throw new Error('Failed to send WhatsApp message');
    }
  }

  formatPhoneNumber(phone: string): string {
    let formatted = phone.replace(/\D/g, '');
    if (!formatted.startsWith('91') && formatted.length === 10) {
      formatted = '91' + formatted;
    }
    if (!formatted.startsWith('+')) {
      formatted = '+' + formatted;
    }
    return formatted;
  }

  async sendCampaignNotification(to: string, campaignTitle: string, status: string): Promise<void> {
    const template = this.getTemplateForStatus(status);
    await this.sendMessage({
      to: this.formatPhoneNumber(to),
      template,
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: campaignTitle },
          ],
        },
      ],
    });
  }

  async sendProposalNotification(to: string, brandName: string, campaignTitle: string): Promise<void> {
    await this.sendMessage({
      to: this.formatPhoneNumber(to),
      template: 'proposal_received',
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: brandName },
            { type: 'text', text: campaignTitle },
          ],
        },
      ],
    });
  }

  async sendPaymentNotification(to: string, amount: string): Promise<void> {
    await this.sendMessage({
      to: this.formatPhoneNumber(to),
      template: 'payment_received',
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: amount },
          ],
        },
      ],
    });
  }

  private getTemplateForStatus(status: string): string {
    const templates: Record<string, string> = {
      open: 'campaign_published',
      in_progress: 'campaign_started',
      completed: 'campaign_completed',
    };
    return templates[status] || 'campaign_update';
  }

  async verifyWebhook(token: string): Promise<boolean> {
    return token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  }

  async processWebhook(payload: any): Promise<void> {
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value?.messages) {
      for (const message of value.messages) {
        console.log('Received WhatsApp message:', {
          from: message.from,
          type: message.type,
          text: message.text?.body,
        });
      }
    }

    if (value?.statuses) {
      for (const status of value.statuses) {
        console.log('Message status update:', {
          id: status.id,
          status: status.status,
          recipient: status.recipient_id,
        });
      }
    }
  }
}

export const whatsappService = new WhatsAppService();

if (process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN) {
  whatsappService.configure({
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  });
}
