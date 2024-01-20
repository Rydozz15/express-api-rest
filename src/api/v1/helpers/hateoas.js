const prepareHateoas = async (entity, data) => {
  const results = data.map((v) => {
    return {
      name: v.nombre,
      href: `/${entity}/${entity.slice(0, -1)}/${v.id}`,
    };
  });
  const totalJoyas = data.length;
  const stockTotal = data.reduce((total, v) => total + v["stock"], 0);
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

export default prepareHateoas;
