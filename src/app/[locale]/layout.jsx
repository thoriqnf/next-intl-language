import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';

export default async function LocaleLayout({
  children,
  params: { locale }
}) {
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Generate static pages for each locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}