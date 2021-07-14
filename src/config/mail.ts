interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'postmark';
  postmarkToken: string;

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  postmarkToken: process.env.POSTMARK_TOKEN,

  defaults: {
    from: {
      email: 'contact@example.com',
      name: 'Contact',
    },
  },
} as IMailConfig;
