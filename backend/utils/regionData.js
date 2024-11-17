const regions = ['BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU'];

const regionMapping = {
    'NA1': 'americas',
    'BR1': 'americas',
    'LA1': 'americas',
    'LA2': 'americas',
    'OC1': 'sea',
    'KR': 'asia',
    'JP1': 'asia',
    'EUN1': 'europe',
    'EUW1': 'europe',
    'TR1': 'europe',
    'RU': 'europe'
};

module.exports = { regions, regionMapping };