const clientElasticsearch = require('./../../../../../../modules/db-adapters').elasticsearch;
const _ = require('lodash');


function createIndexAndMappingProtectionArea() {
    return new Promise((resolve, reject) => {
        const dataCreate = {
            index: 'protection_area',
            body: {
                mappings: {
                    area: {
                        properties: {
                            super_hero_id: {
                                type: 'integer',
                            },
                            name: {
                                type: 'text',
                            },
                            radius: {
                                type: 'float',
                            },
                            location: {
                                type: 'geo_point',
                            },
                        },
                    },
                },
            },
        };

        clientElasticsearch.indices.getMapping({
            index: 'protection_area', type: 'area',
        })
            .then(() => {
                resolve();
            })
            .catch(() => {
                clientElasticsearch.indices.create(dataCreate)
                    .then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
            });
    });
}

function insertProtectionArea(protectionAreaData) {
    return new Promise((resolve, reject) => {
        const dataInsert = {
            index: 'protection_area',
            type: 'area',
            body: {
                super_hero_id: protectionAreaData.superHeroId,
                name: protectionAreaData.name,
                radius: protectionAreaData.radius,
                location: [protectionAreaData.lng, protectionAreaData.lat],
            },
        };

        clientElasticsearch.index(dataInsert, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

function querySearchNearestSuperHeroes({ lat, lng }, paramsFilterQuery = {}) {
    console.log('ola', lat, lng);
    const queryDefault = {
        sort: [
            {
                _geo_distance: {
                    location: [parseFloat(lng), parseFloat(lat)],
                    order: 'asc',
                    unit: 'km',
                    distance_type: 'plane',
                },
            },
        ],
    };

    const query = _.merge({}, queryDefault, paramsFilterQuery);
    return query;
}

function findNearestSuperheroes({ lat, lng }) {
    return new Promise((resolve, reject) => {
        const addingDataQuery = {
            from: 0,
            size: 20,
        };

        clientElasticsearch.search({
            index: 'protection_area',
            type: 'area',
            body: querySearchNearestSuperHeroes({ lat, lng }, addingDataQuery),
        })
            .then((data) => {
                const hits = _.get(data, 'hits.hits');

                return resolve(hits);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    createIndexAndMappingProtectionArea,
    insertProtectionArea,
    findNearestSuperheroes,
};
