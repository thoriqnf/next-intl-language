"use client";

import { useState } from "react";
import enMessages from "../../../../../messages/en.json";
import esMessages from "../../../../../messages/es.json";

// Simple demo without full i18n setup for initial testing
export default function Session3Page() {
  const [locale, setLocale] = useState("en");

  const messages = {
    en: enMessages,
    es: esMessages,
  };

  const t = messages[locale];

  const switchLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Demo Header */}
      <div className="bg-gray-800 border-b border-gray-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Day 7 Session 3 Demo</h1>
              <p className="text-gray-300 mt-2">
                Next.js 15+ Internationalization (i18n) Demo
              </p>
            </div>
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">Language:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => switchLanguage("en")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    locale === "en"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => switchLanguage("es")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    locale === "es"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  🇪🇸 ES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Current Locale:</span>
              <span className="px-2 py-1 bg-gray-700 text-blue-300 rounded text-sm font-medium">
                {locale.toUpperCase()}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => switchLanguage("en")}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Test English
              </button>
              <button
                onClick={() => switchLanguage("es")}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
              >
                Test Spanish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t.hero.cta}
              </button>
              <button className="border border-gray-400 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition-colors">
                {t.hero.learnMore}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.features.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.features.feature1.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {t.features.feature1.description}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.features.feature2.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {t.features.feature2.description}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.features.feature3.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {t.features.feature3.description}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.features.feature4.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {t.features.feature4.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-4">💬</div>
              <p className="text-gray-300 mb-4 italic text-sm">
                "{t.testimonials.testimonial1.quote}"
              </p>
              <div>
                <p className="font-semibold text-white text-sm">
                  {t.testimonials.testimonial1.author}
                </p>
                <p className="text-xs text-gray-400">
                  {t.testimonials.testimonial1.role}
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-4">⭐</div>
              <p className="text-gray-300 mb-4 italic text-sm">
                "{t.testimonials.testimonial2.quote}"
              </p>
              <div>
                <p className="font-semibold text-white text-sm">
                  {t.testimonials.testimonial2.author}
                </p>
                <p className="text-xs text-gray-400">
                  {t.testimonials.testimonial2.role}
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-4">🚀</div>
              <p className="text-gray-300 mb-4 italic text-sm">
                "{t.testimonials.testimonial3.quote}"
              </p>
              <div>
                <p className="font-semibold text-white text-sm">
                  {t.testimonials.testimonial3.author}
                </p>
                <p className="text-xs text-gray-400">
                  {t.testimonials.testimonial3.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{t.footer.company}</h3>
              <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                Next.js 15+ i18n Demo
                <br />
                <span className="text-blue-400">Dark Theme Edition</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
