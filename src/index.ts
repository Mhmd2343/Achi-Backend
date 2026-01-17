const escapeXml = (value: any) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const getSlug = (x: any) => x?.Slug ?? x?.slug ?? x?.SLUG ?? null;

// Detect the real relation key that points to Market (so no "Invalid key market")
const getMarketRelationKey = (strapi: any, uid: string) => {
  const model = strapi.getModel(uid);
  const attrs = model?.attributes || {};
  for (const key of Object.keys(attrs)) {
    const a = attrs[key];
    if (a?.type === 'relation' && (a?.target === 'api::market.market' || a?.target?.includes('market'))) {
      return key;
    }
  }
  return null;
};

export default {
  register({ strapi }: { strapi: any }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/sitemap.xml',
        handler: async (ctx: any) => {
          const siteBase = (process.env.PUBLIC_SITE_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

          const pageUID = 'api::page.page';
          const serviceUID = 'api::service.service';
          const projectUID = 'api::project.project';

          const pageMarketKey = getMarketRelationKey(strapi, pageUID);
          const serviceMarketKey = getMarketRelationKey(strapi, serviceUID);
          const projectMarketKey = getMarketRelationKey(strapi, projectUID);

          const [pages, services, projects] = await Promise.all([
            strapi.entityService.findMany('api::page.page', {
              filters: { publishedAt: { $notNull: true } },
              locale: 'all',
              pagination: { pageSize: 10000 },
              populate: '*',
            }),
            strapi.entityService.findMany('api::service.service', {
              filters: { publishedAt: { $notNull: true } },
              locale: 'all',
              pagination: { pageSize: 10000 },
              populate: '*',
            }),
            strapi.entityService.findMany('api::project.project', {
              filters: { publishedAt: { $notNull: true } },
              locale: 'all',
              pagination: { pageSize: 10000 },
              populate: '*',
            }),
          ]);


          const urls: string[] = [];

          const addUrl = (loc: string, lastmod: string) => {
            urls.push(
              `<url><loc>${escapeXml(loc)}</loc><lastmod>${escapeXml(lastmod)}</lastmod></url>`
            );
          };


          const findMarketCode = (item: any) => {
            const tryGet = (v: any) => v?.code ?? v?.Code ?? v?.CODE ?? null;

            if (!item || typeof item !== 'object') return null;

            if (item.market) return tryGet(item.market);
            if (item.Market) return tryGet(item.Market);

            for (const k of Object.keys(item)) {
              const v = item[k];
              const code = tryGet(v);
              if (code) return code;
            }
            return null;
          };

          const buildMarketCode = (item: any, key: string | null) => {
            if (!key) return null;
            const marketObj = item?.[key];
            return marketObj?.code ?? marketObj?.Code ?? marketObj?.CODE ?? null;
          };

          for (const p of pages) {
            const marketCode = findMarketCode(p);
            const locale = p.locale;
            const slug = getSlug(p);
            if (!marketCode || !locale || !slug) continue;

            const loc = `${siteBase}/${marketCode}/${locale}/${slug}`;
            const lastmod = new Date(p.updatedAt || p.createdAt || Date.now()).toISOString();
            addUrl(loc, lastmod);
          }

          for (const s of services) {
            const marketCode = buildMarketCode(s, serviceMarketKey);
            const locale = s.locale;
            const slug = getSlug(s);
            if (!marketCode || !locale || !slug) continue;

            const loc = `${siteBase}/${marketCode}/${locale}/services/${slug}`;
            const lastmod = new Date(s.updatedAt || s.createdAt || Date.now()).toISOString();
            addUrl(loc, lastmod);
          }

          for (const pr of projects) {
            const marketCode = buildMarketCode(pr, projectMarketKey);
            const locale = pr.locale;
            const slug = getSlug(pr);
            if (!marketCode || !locale || !slug) continue;

            const loc = `${siteBase}/${marketCode}/${locale}/projects/${slug}`;
            const lastmod = new Date(pr.updatedAt || pr.createdAt || Date.now()).toISOString();
            addUrl(loc, lastmod);
          }

          ctx.type = 'application/xml';
          ctx.body =
            `<?xml version="1.0" encoding="UTF-8"?>` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
            urls.join('') +
            `</urlset>`;
        },
        config: { auth: false },
      },

      {
        method: 'GET',
        path: '/api/robots.txt',
        handler: async (ctx: any) => {
          const apiBase = (process.env.PUBLIC_SITE_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
          ctx.type = 'text/plain';
          ctx.body = `User-agent: *\nAllow: /\nSitemap: ${apiBase}/api/sitemap.xml\n`;
        },
        config: { auth: false },
      },
    ]);
  },

  bootstrap() {},
};
