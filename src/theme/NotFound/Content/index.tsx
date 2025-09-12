import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function NotFoundContent({className}: Props): JSX.Element {
  const location = useLocation();
  const {i18n} = useDocusaurusContext();
  
  // Check if we're on the Ukrainian locale
  const isUkrainian = location.pathname.startsWith('/uk/') || i18n.currentLocale === 'uk';
  
  // If Ukrainian locale is detected but Translate isn't working, provide fallback
  if (isUkrainian && location.pathname.includes('/uk/')) {
    return (
      <main className={clsx('container margin-vert--xl', className)}>
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1" className="hero__title">
              Сторінку не знайдено
            </Heading>
            <p>
              На жаль, ми не змогли знайти сторінку, яку ви запитували.
            </p>
            <p>
              Будь ласка, зверніться до власника сайту, з якого ви перейшли на це посилання, щоб повідомити, що посилання не працює.
            </p>
          </div>
        </div>
      </main>
    );
  }
  
  // Default to using Translate component
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </Translate>
          </p>
        </div>
      </div>
    </main>
  );
}
