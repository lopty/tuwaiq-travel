import { renderToString } from 'react-dom/server';
import App from './App';
import { resolveRoute } from './data/routes';

export function render(url: string) {
  const resolved = resolveRoute(url);
  const html = renderToString(<App initialPath={url} />);
  return {
    html,
    meta: resolved.meta,
  };
}
