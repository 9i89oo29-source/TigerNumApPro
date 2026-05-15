const { successResponse } = require('../utils/responseHelper');

exports.getCountries = (req, res) => {
  const countries = [
    { code: 'sa', name: 'السعودية', flag: '🇸🇦', dialCode: '+966' },
    { code: 'ae', name: 'الإمارات', flag: '🇦🇪', dialCode: '+971' },
    { code: 'qa', name: 'قطر', flag: '🇶🇦', dialCode: '+974' },
    { code: 'kw', name: 'الكويت', flag: '🇰🇼', dialCode: '+965' },
    { code: 'om', name: 'عُمان', flag: '🇴🇲', dialCode: '+968' },
    { code: 'bh', name: 'البحرين', flag: '🇧🇭', dialCode: '+973' },
    { code: 'eg', name: 'مصر', flag: '🇪🇬', dialCode: '+20' },
    { code: 'jo', name: 'الأردن', flag: '🇯🇴', dialCode: '+962' },
    { code: 'lb', name: 'لبنان', flag: '🇱🇧', dialCode: '+961' },
    { code: 'iq', name: 'العراق', flag: '🇮🇶', dialCode: '+964' },
    { code: 'sy', name: 'سوريا', flag: '🇸🇾', dialCode: '+963' },
    { code: 'ye', name: 'اليمن', flag: '🇾🇪', dialCode: '+967' },
    { code: 'ma', name: 'المغرب', flag: '🇲🇦', dialCode: '+212' },
    { code: 'dz', name: 'الجزائر', flag: '🇩🇿', dialCode: '+213' },
    { code: 'tn', name: 'تونس', flag: '🇹🇳', dialCode: '+216' },
    { code: 'ly', name: 'ليبيا', flag: '🇱🇾', dialCode: '+218' },
    { code: 'sd', name: 'السودان', flag: '🇸🇩', dialCode: '+249' },
    { code: 'ps', name: 'فلسطين', flag: '🇵🇸', dialCode: '+970' },
    { code: 'so', name: 'الصومال', flag: '🇸🇴', dialCode: '+252' },
    { code: 'dj', name: 'جيبوتي', flag: '🇩🇯', dialCode: '+253' },
    { code: 'km', name: 'جزر القمر', flag: '🇰🇲', dialCode: '+269' },
    { code: 'mr', name: 'موريتانيا', flag: '🇲🇷', dialCode: '+222' },
  ];
  successResponse(res, countries);
};

exports.getServices = (req, res) => {
  const services = [
    { id: 'whatsapp', name: 'واتساب' },
    { id: 'telegram', name: 'تلغرام' },
    { id: 'facebook', name: 'فيسبوك' },
    { id: 'instagram', name: 'انستغرام' },
    { id: 'twitter', name: 'تويتر' },
    { id: 'google', name: 'جوجل' },
    { id: 'snapchat', name: 'سناب شات' },
    { id: 'tiktok', name: 'تيك توك' },
    { id: 'other', name: 'أخرى' },
  ];
  successResponse(res, services);
};
