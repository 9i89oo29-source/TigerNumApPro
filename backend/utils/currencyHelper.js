// يمكن توسيعها لاحقاً لتحويل العملات
exports.getLocalCurrency = (countryCode) => {
  const map = {
    sa: 'SAR', ae: 'AED', qa: 'QAR', kw: 'KWD', om: 'OMR', bh: 'BHD',
    eg: 'EGP', jo: 'JOD', lb: 'LBP', iq: 'IQD', sy: 'SYP', ye: 'YER',
    ma: 'MAD', dz: 'DZD', tn: 'TND', ly: 'LYD', sd: 'SDG', ps: 'ILS',
    so: 'SOS', dj: 'DJF', km: 'KMF', mr: 'MRO',
  };
  return map[countryCode] || 'USD';
};
