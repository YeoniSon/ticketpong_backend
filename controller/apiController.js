// controllers/apiController.js

const getOpenApiData = require('../app');


exports.getData = async (req, res) => {
  try {
    const data = await getOpenApiData('http://www.kopis.or.kr/openApi/restful/pblprfr');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
