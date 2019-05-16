const apisauce = require("apisauce");
const Config = require("./config");

exports.create = (baseURL = Config.baseUrl) => {
  const api = apisauce.create({ baseURL });

  //method get
  const getHashtag = () =>
    api.get(
      `/ootd/?__a=1`
    );

  return {
    getHashtag
  };
};
