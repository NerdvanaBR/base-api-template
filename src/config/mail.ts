interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'postmark';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contact@example.com',
      name: 'Contact',
    },
  },
} as IMailConfig;
