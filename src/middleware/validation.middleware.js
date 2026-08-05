function validation(schema, source = "body") {
  return function (req, res, next) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    if (source === "body") {
      req.validatedBody = result.data;
    } else if (source === "params") {
      req.validatedParams = result.data;
    } else if (source === "query") {
      req.validatedQuery = result.data;
    }

    // const map = {
    //   body: "validatedBody",
    //   params: "validatedParams",
    //   query: "validatedQuery",
    // };

    // req[map[source]] = result.data;

    next();
  };
}

module.exports = validation;
