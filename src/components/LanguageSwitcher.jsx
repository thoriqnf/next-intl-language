'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const switchLanguage = (newLocale) => {
    // Replace current locale in pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Language:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'en'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={t('switchTo', { language: t('english') })}
        >
          🇺🇸 EN
        </button>
        <button
          onClick={() => switchLanguage('es')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'es'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={t('switchTo', { language: t('spanish') })}
        >
          🇪🇸 ES
        </button>
      </div>
    </div>
  );
}