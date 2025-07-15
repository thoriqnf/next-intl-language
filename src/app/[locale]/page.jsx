import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function PromotionalPage() {
  const tHero = useTranslations('hero');
  const tFeatures = useTranslations('features');
  const tTestimonials = useTranslations('testimonials');
  const tFooter = useTranslations('footer');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                {tFooter('company')}
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {tHero('title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {tHero('subtitle')}
            </p>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {tHero('cta')}
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {tHero('learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tFeatures('title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tFeatures('feature1.title')}
              </h3>
              <p className="text-gray-600">
                {tFeatures('feature1.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tFeatures('feature2.title')}
              </h3>
              <p className="text-gray-600">
                {tFeatures('feature2.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tFeatures('feature3.title')}
              </h3>
              <p className="text-gray-600">
                {tFeatures('feature3.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tFeatures('feature4.title')}
              </h3>
              <p className="text-gray-600">
                {tFeatures('feature4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tTestimonials('title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-gray-600 mb-6 italic">
                "{tTestimonials('testimonial1.quote')}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {tTestimonials('testimonial1.author')}
                </p>
                <p className="text-sm text-gray-600">
                  {tTestimonials('testimonial1.role')}
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⭐</div>
              <p className="text-gray-600 mb-6 italic">
                "{tTestimonials('testimonial2.quote')}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {tTestimonials('testimonial2.author')}
                </p>
                <p className="text-sm text-gray-600">
                  {tTestimonials('testimonial2.role')}
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-gray-600 mb-6 italic">
                "{tTestimonials('testimonial3.quote')}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {tTestimonials('testimonial3.author')}
                </p>
                <p className="text-sm text-gray-600">
                  {tTestimonials('testimonial3.role')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">
                {tFooter('company')}
              </h3>
              <p className="text-gray-400">
                {tFooter('copyright')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('links.about')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('links.contact')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('links.privacy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('links.terms')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Info</h4>
              <p className="text-gray-400 text-sm">
                Next.js 15+ i18n Demo<br />
                Built with next-intl
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}