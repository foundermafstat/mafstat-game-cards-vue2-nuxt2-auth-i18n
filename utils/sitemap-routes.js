import axios from 'axios'

let sitemapRoutes = async function(baseUrl) {
  let { data } = await axios.get(`${baseUrl}/api/games`)
  let games = data

  let { ratingData } = await axios.get(`${baseUrl}/api/ratings`);
  let ratings = ratingData

  let watchPages = games.map(v => {
    let rating;
    try {
      let ratingId = v.relationships.rating.data.id;
      rating = ratings.find(c => c.id == ratingId);
    } catch {
      rating = {attributes: {image_url: ''}}
    }

    if(!rating.attributes.image_url && rating.relationships.parent) {
      try {
        let ratingId = rating.relationships.parent.data.id;
        rating = ratings.find(c => c.id == ratingId);
      } catch {
        rating = {attributes: {image_url: ''}}
      }
    }

    return {
      url: `/watch/${v.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: v.attributes.updated_at,
      video: [{
        title: v.attributes.name,
        thumbnail_loc: v.attributes.thumbnail || rating.attributes.image_url || '',
        description: v.attributes.description || '',
        family_friendly: 'YES',
        requires_subscription: 'NO',
        duration: v.attributes.duration.toString()
      }]
    }
  })

  let mostRecentUpdate = games.map(v => v.attributes.updated_at).sort((v1, v2) => v1 < v2 ? 1 : -1)[0]

  return [{
    url: '/games',
    changefreq: 'daily',
    priority: 1,
    lastmod: mostRecentUpdate
  }, {
    url: '/ratings',
    changefreq: 'daily',
    priority: 1,
    lastmod: mostRecentUpdate
  }, {
    url: '/',
    changefreq: 'weekly',
    priority: 1,
  },
    ...watchPages
  ]
}

module.exports = sitemapRoutes
